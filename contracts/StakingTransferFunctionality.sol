pragma solidity ^0.6.0;

contract StakingTransferFunctionality {

    function onStart(address,address) public {
    }

    function onStop(address) public {
    }

    function stakingTransfer(address sender, uint256, uint256 value, address receiver) public {
        IMVDProxy proxy = IMVDProxy(msg.sender);

        require(IStateHolder(proxy.getStateHolderAddress()).getBool(_toStateHolderKey("authorizedToTransferForStaking", _toString(sender))) || IMVDFunctionalitiesManager(proxy.getMVDFunctionalitiesManagerAddress()).isAuthorizedFunctionality(sender), "Unauthorized action!");

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
    function getBool(string calldata varName) external view returns (bool);
}

interface IERC20 {
    function mint(uint256 amount) external;
    function balanceOf(address account) external view returns (uint256);
}