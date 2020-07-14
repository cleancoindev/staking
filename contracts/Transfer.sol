pragma solidity ^0.6.0;

contract TransferFunctionality {

    function onStart(address,address) public {
        IStateHolder stateHolder = IStateHolder(IMVDProxy(msg.sender).getStateHolderAddress());
        address tokenSwitchAddress = 0x1CadA985a180f5e054b547376EB98cfF5C4591EB;
        stateHolder.setBool(_toStateHolderKey("authorizedToTransfer", _toString(tokenSwitchAddress)), true);
    }

    function onStop(address) public {
        IStateHolder stateHolder = IStateHolder(IMVDProxy(msg.sender).getStateHolderAddress());
        address tokenSwitchAddress = 0x1CadA985a180f5e054b547376EB98cfF5C4591EB;
        stateHolder.clear(_toStateHolderKey("authorizedToTransfer", _toString(tokenSwitchAddress)));
    }

    function transfer(address sender, uint256, uint256 value, address receiver) public {
        IMVDProxy proxy = IMVDProxy(msg.sender);

        require(IStateHolder(proxy.getStateHolderAddress()).getBool(_toStateHolderKey("authorizedToTransfer", _toString(sender))) || IMVDFunctionalitiesManager(proxy.getMVDFunctionalitiesManagerAddress()).isAuthorizedFunctionality(sender), "Unauthorized action!");

        proxy.transfer(receiver, value, proxy.getToken());
    }

    function _toStateHolderKey(string memory a, string memory b) private pure returns(string memory) {
        return _toLowerCase(string(abi.encodePacked(a, "_", b)));
    }

    function _toString(address _addr) private pure returns(string memory) {
        bytes32 value = bytes32(uint256(_addr));
        bytes memory alphabet = "0123456789abcdef";

        bytes memory str = new bytes(42);
        str[0] = '0';
        str[1] = 'x';
        for (uint i = 0; i < 20; i++) {
            str[2+i*2] = alphabet[uint(uint8(value[i + 12] >> 4))];
            str[3+i*2] = alphabet[uint(uint8(value[i + 12] & 0x0f))];
        }
        return string(str);
    }

    function _toLowerCase(string memory str) private pure returns(string memory) {
        bytes memory bStr = bytes(str);
        for (uint i = 0; i < bStr.length; i++) {
            bStr[i] = bStr[i] >= 0x41 && bStr[i] <= 0x5A ? bytes1(uint8(bStr[i]) + 0x20) : bStr[i];
        }
        return string(bStr);
    }
}

interface IMVDProxy {
    function getToken() external view returns(address);
    function getStateHolderAddress() external view returns(address);
    function getMVDFunctionalitiesManagerAddress() external view returns(address);
    function transfer(address receiver, uint256 value, address token) external;
    function flushToWallet(address tokenAddress, bool is721, uint256 tokenId) external;
}

interface IMVDFunctionalitiesManager {
    function isAuthorizedFunctionality(address functionality) external view returns(bool);
}

interface IStateHolder {
    function clear(string calldata varName) external returns(string memory oldDataType, bytes memory oldVal);
    function setBool(string calldata varName, bool val) external returns(bool);
    function getBool(string calldata varName) external view returns (bool);
}

interface IERC20 {
    function mint(uint256 amount) external;
    function balanceOf(address account) external view returns (uint256);
}