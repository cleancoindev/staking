pragma solidity ^0.6.0;

contract StakeV1Functionality {

    address private constant UNISWAP_V2_FACTORY = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;

    address private constant UNISWAP_V2_ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;

    address private _tokenAddress;

    address[] private TOKENS;

    uint256[] private TIME_WINDOWS;

    uint256[] private REWARDS;

    address private _doubleProxy;

    struct StakeInfo {
        address sender;
        uint256 firstAmount;
        uint256 secondAmount;
        uint256 poolPosition;
        uint256 poolAmount;
        uint256 reward;
        uint256 endBlock;
    }

    mapping(uint256 => mapping(uint256 => StakeInfo)) private _stakeInfo;
    mapping(uint256 => uint256) private _stakeInfoLength;

    constructor(address doubleProxy) public {

        _tokenAddress = IMVDProxy(IDoubleProxy(_doubleProxy = doubleProxy).proxy()).getToken();

        TOKENS.push(address(0));//This should be 0, means ether
        TOKENS.push(address(0));

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

    function setDoubleProxy(address newDoubleProxy) public {
        require(IMVDFunctionalitiesManager(IMVDProxy(IDoubleProxy(_doubleProxy).proxy()).getMVDFunctionalitiesManagerAddress()).isAuthorizedFunctionality(msg.sender), "Unauthorized Action!");
        _doubleProxy = newDoubleProxy;
    }

    function flushToWallet() public {
        IMVDProxy proxy = IMVDProxy(IDoubleProxy(_doubleProxy).proxy());
        require(IMVDFunctionalitiesManager(proxy.getMVDFunctionalitiesManagerAddress()).isAuthorizedFunctionality(msg.sender), "Unauthorized Action!");
        IERC20 token = IERC20(proxy.getToken());
        token.transfer(proxy.getMVDWalletAddress(), token.balanceOf(address(this)));
    }

    function stake(uint256 firstAmount, uint256 pool, uint256 mode, uint256 value) public payable {
        require(firstAmount > 0, "First amount must be greater than 0");
        require(pool < TOKENS.length, "Unknown Pool");
        require(mode < TIME_WINDOWS.length, "Unknown Pool");
        uint256 secondAmount = TOKENS[pool] == address(0) ? msg.value : value;
        require(secondAmount > 0, "Second amount must be greater than 0");
        (uint256 minCap,, uint256 remainingToStake) = getStakeInfo(mode);
        require(firstAmount >= minCap, "Amount to stake is less than the current min cap");
        require(firstAmount >= remainingToStake, "Amount to stake is less than the current remaining one");
        
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

    function _add(uint256 mode, StakeInfo memory element) private {
        _stakeInfo[mode][_stakeInfoLength[mode]] = element;
        _stakeInfoLength[mode] = _stakeInfoLength[mode] + 1;
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
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

interface IUniswapV2Router {
    function WETH() external pure returns (address);
    function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts);
    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts);
    function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts);
}

interface IDoubleProxy {
    function proxy() external view returns(address);
}