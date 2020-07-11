pragma solidity ^0.6.0;

contract StakeV1Functionality {

    address private constant UNISWAP_V2_FACTORY = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;

    address private constant UNISWAP_V2_ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;

    address private WETH_ADDRESS = IUniswapV2Router(UNISWAP_V2_ROUTER).WETH();

    address private _tokenAddress;

    address[] private TOKENS;

    uint256[] private TIME_WINDOWS;

    uint256[] private REWARDS;

    address private _doubleProxy;

    struct StakeInfo {
        address sender;
        uint256 poolPosition;
        uint256 firstAmount;
        uint256 secondAmount;
        uint256 poolAmount;
        uint256 reward;
        uint256 endBlock;
    }

    uint256 private _startBlock;

    mapping(uint256 => mapping(uint256 => StakeInfo)) private _stakeInfo;
    mapping(uint256 => uint256) private _stakeInfoLength;

    event Staked(address indexed sender, uint256 indexed mode, uint256 indexed poolPosition, uint256 firstAmount, uint256 secondAmount, uint256 poolAmount, uint256 reward, uint256 endBlock);
    event Withdrawn(address indexed sender, uint256 indexed mode, uint256 indexed poolPosition, uint256 firstAmount, uint256 secondAmount, uint256 poolAmount, uint256 reward);

    constructor(uint256 startBlock, address doubleProxy, address[] memory tokens) public {

        _startBlock = startBlock;

        _tokenAddress = IMVDProxy(IDoubleProxy(_doubleProxy = doubleProxy).proxy()).getToken();

        for(uint256 i = 0; i < tokens.length; i++) {
            TOKENS.push(tokens[i]);
        }

        TIME_WINDOWS.push(0);
        TIME_WINDOWS.push(0);
        TIME_WINDOWS.push(0);
        TIME_WINDOWS.push(0);

        REWARDS.push(0);
        REWARDS.push(0);
        REWARDS.push(0);
        REWARDS.push(0);
    }

    function doubleProxy() public view returns(address) {
        return _doubleProxy;
    }

    function tokens() public view returns(address[] memory) {
        return TOKENS;
    }

    function timeWindows() public view returns(uint256[] memory) {
        return TIME_WINDOWS;
    }

    function rewards() public view returns(uint256[] memory) {
        return REWARDS;
    }

    function startBlock() public view returns(uint256) {
        return _startBlock;
    }

    function setDoubleProxy(address newDoubleProxy) public {
        require(IMVDFunctionalitiesManager(IMVDProxy(IDoubleProxy(_doubleProxy).proxy()).getMVDFunctionalitiesManagerAddress()).isAuthorizedFunctionality(msg.sender), "Unauthorized Action!");
        _doubleProxy = newDoubleProxy;
    }

    function flushToWallet() public {
        IMVDProxy proxy = IMVDProxy(IDoubleProxy(_doubleProxy).proxy());
        require(IMVDFunctionalitiesManager(proxy.getMVDFunctionalitiesManagerAddress()).isAuthorizedFunctionality(msg.sender), "Unauthorized Action!");
        address walletAddress = proxy.getMVDWalletAddress();
        IERC20 token = IERC20(_tokenAddress);
        token.transfer(walletAddress, token.balanceOf(address(this)));
        for(uint256 i = 0; i < TOKENS.length; i++) {
            token = IERC20(IUniswapV2Factory(UNISWAP_V2_FACTORY).getPair(_tokenAddress, TOKENS[i]));
            token.transfer(walletAddress, token.balanceOf(address(this)));
        }
    }

    function stake(uint256 mode, uint256 poolPosition, uint256 originalFirstAmount, uint256 value) public payable {
        require(block.number >= _startBlock, "Staking is still not available");
        require(originalFirstAmount > 0, "First amount must be greater than 0");
        require(poolPosition < TOKENS.length, "Unknown Pool");
        require(mode < TIME_WINDOWS.length, "Unknown Pool");

        uint256 originalSecondAmount = TOKENS[poolPosition] == WETH_ADDRESS ? msg.value : value;
        require(originalSecondAmount > 0, "Second amount must be greater than 0");

        _transferTokensAndCheckAllowance(_tokenAddress, originalFirstAmount);
        _transferTokensAndCheckAllowance(TOKENS[poolPosition], originalSecondAmount);

        (uint256 firstAmount, uint256 secondAmount, uint256 poolAmount) = _createPoolToken(originalFirstAmount, originalSecondAmount, TOKENS[poolPosition]);
        (uint256 minCap,, uint256 remainingToStake) = getStakeInfo(mode);
        require(firstAmount >= minCap, "Amount to stake is less than the current min cap");
        require(firstAmount >= remainingToStake, "Amount to stake is less than the current remaining one");

        (uint256 reward, uint256 endBlock) = _add(mode, StakeInfo(msg.sender, poolPosition, firstAmount, secondAmount, poolAmount, REWARDS[mode], block.number + TIME_WINDOWS[mode]));
        emit Staked(msg.sender, mode, poolPosition, firstAmount, secondAmount, poolAmount, reward, endBlock);
    }

    function _transferTokensAndCheckAllowance(address tokenAddress, uint256 value) private {
        if(tokenAddress == WETH_ADDRESS) {
            return;
        }
        IERC20 token = IERC20(tokenAddress);
        token.transferFrom(msg.sender, address(this), value);
        if(token.allowance(address(this), UNISWAP_V2_FACTORY) <= value) {
            token.approve(UNISWAP_V2_ROUTER, 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
        }
    }

    function _createPoolToken(uint256 originalFirstAmount, uint256 originalSecondAmount, address secondToken) private returns(uint256 firstAmount, uint256 secondAmount, uint256 poolAmount) {
        if(secondToken == WETH_ADDRESS) {
            (firstAmount, secondAmount, poolAmount) = IUniswapV2Router(UNISWAP_V2_ROUTER).addLiquidityETH.value(originalSecondAmount)(
                _tokenAddress,
                originalFirstAmount,
                originalFirstAmount,
                originalSecondAmount,
                address(this),
                block.timestamp + 1000
            );
        } else {
            (firstAmount, secondAmount, poolAmount) = IUniswapV2Router(UNISWAP_V2_ROUTER).addLiquidity(
                _tokenAddress,
                secondToken,
                originalFirstAmount,
                originalSecondAmount,
                originalFirstAmount,
                originalSecondAmount,
                address(this),
                block.timestamp + 1000
            );
        }
        if(firstAmount < originalSecondAmount) {
            IERC20(_tokenAddress).transfer(msg.sender, originalSecondAmount - secondAmount);
        }
        if(secondAmount < originalSecondAmount) {
            if(secondToken == WETH_ADDRESS) {
                payable(msg.sender).transfer(originalSecondAmount - secondAmount);
            } else {
                IERC20(secondToken).transfer(msg.sender, originalSecondAmount - secondAmount);
            }
        }
    }

    function getStakeInfo(uint256 mode) public view returns(uint256 minCap, uint256 hardCap, uint256 remainingToStake) {
        (minCap, hardCap) = getStakingCap(mode);
        remainingToStake = hardCap;
        uint256 length = _stakeInfoLength[mode];
        for(uint256 i = 0; i < length; i++) {
            if(_stakeInfo[mode][i].endBlock < block.number) {
                remainingToStake -= _stakeInfo[mode][i].firstAmount;
            }
        }
    }

    function _add(uint256 mode, StakeInfo memory element) private returns(uint256, uint256) {
        _stakeInfo[mode][_stakeInfoLength[mode]] = element;
        _stakeInfoLength[mode] = _stakeInfoLength[mode] + 1;
        return (element.reward, element.endBlock);
    }

    function _remove(uint256 mode, uint256 i) private {
        if(_stakeInfoLength[mode] <= i) {
            return;
        }
        _stakeInfoLength[mode] = _stakeInfoLength[mode] - 1;
        if(_stakeInfoLength[mode] > i) {
            _stakeInfo[mode][i] = _stakeInfo[mode][_stakeInfoLength[mode]];
        }
        delete _stakeInfo[mode][_stakeInfoLength[mode]];
    }

    function withdraw(uint256 mode, uint256 position) public {
        StakeInfo memory stakeInfo = _stakeInfo[mode][position];
        require(block.number >= stakeInfo.endBlock, "Cannot actually withdraw this position");
        IERC20 token = IERC20(_tokenAddress);
        token.transfer(stakeInfo.sender, stakeInfo.reward);
        token = IERC20(IUniswapV2Factory(UNISWAP_V2_FACTORY).getPair(_tokenAddress, TOKENS[stakeInfo.poolPosition]));
        token.transfer(stakeInfo.sender, stakeInfo.poolAmount);
        emit Withdrawn(stakeInfo.sender, mode, stakeInfo.poolPosition, stakeInfo.firstAmount, stakeInfo.secondAmount, stakeInfo.poolAmount, stakeInfo.reward);
        _remove(mode, position);
    }

    function getStakingCap(uint256 mode) public view returns(uint256, uint256) {
        IStateHolder stateHolder = IStateHolder(IMVDProxy(IDoubleProxy(_doubleProxy).proxy()).getStateHolderAddress());
        string memory modeString = _toString(mode);
        return (
            stateHolder.getUint256(string(abi.encodePacked("staking_v1_minCap", modeString))),
            stateHolder.getUint256(string(abi.encodePacked("staking_v1_hardCap", modeString)))
        );
    }

    function _toString(uint _i) private pure returns(string memory) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len - 1;
        while (_i != 0) {
            bstr[k--] = byte(uint8(48 + _i % 10));
            _i /= 10;
        }
        return string(bstr);
    }
}

interface IMVDProxy {
    function getToken() external view returns(address);
    function getStateHolderAddress() external view returns(address);
    function getMVDWalletAddress() external view returns(address);
    function getMVDFunctionalitiesManagerAddress() external view returns(address);
}

interface IStateHolder {
    function setUint256(string calldata name, uint256 value) external returns(uint256);
    function getUint256(string calldata name) external view returns(uint256);
    function clear(string calldata varName) external returns(string memory oldDataType, bytes memory oldVal);
}

interface IMVDFunctionalitiesManager {
    function isAuthorizedFunctionality(address functionality) external view returns(bool);
}

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

interface IUniswapV2Router {

    function WETH() external pure returns (address);

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB, uint liquidity);

    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external payable returns (uint amountToken, uint amountETH, uint liquidity);
}

interface IUniswapV2Factory {
    function getPair(address tokenA, address tokenB) external view returns (address pair);
}

interface IDoubleProxy {
    function proxy() external view returns(address);
}