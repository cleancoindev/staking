pragma solidity ^0.6.0;

contract StakingConfig {

    address private constant STAKING_CONTRACT = 0xb81DDC1BCB11FC722d6F362F4357787E6F958ce0;

    function callOneTime(address) public {
        IStateHolder stateHolder = IStateHolder(IMVDProxy(msg.sender).getStateHolderAddress());
        stateHolder.setBool(_toStateHolderKey("authorizedToTransferForStaking", _toString(STAKING_CONTRACT)), true);
        stateHolder.setUint256("staking_minCap_0", 200000000000000000000);
        stateHolder.setUint256("staking_hardCap_0", 16200000000000000000000);
        stateHolder.setUint256("staking_minCap_1", 200000000000000000000);
        stateHolder.setUint256("staking_hardCap_1", 16200000000000000000000);
        stateHolder.setUint256("staking_minCap_2", 200000000000000000000);
        stateHolder.setUint256("staking_hardCap_2", 58320000000000000000000);
        stateHolder.setUint256("staking_minCap_3", 200000000000000000000);
        stateHolder.setUint256("staking_hardCap_3", 63504000000000000000000);
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
    function getStateHolderAddress() external view returns(address);
}

interface IStateHolder {
    function clear(string calldata varName) external returns(string memory oldDataType, bytes memory oldVal);
    function setBool(string calldata varName, bool val) external returns(bool);
    function setUint256(string calldata varName, uint256 val) external returns(uint256);
}