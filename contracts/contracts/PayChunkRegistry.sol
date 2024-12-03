// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IPayChunkRegistry.sol";

/**
 * @title PayChunkRegistry
 * @notice This contract is used to manage all deployed contracts
 */
contract PayChunkRegistry is IPayChunkRegistry, Ownable {
    /// @dev Name of the contract EthereumProxy
    string public constant ETHEREUM_PROXY = "ETHEREUM_PROXY";

    /// @inheritdoc IPayChunkRegistry
    mapping(string => address) public override contracts;

    constructor() Ownable(msg.sender) {}

    /// @inheritdoc IPayChunkRegistry
    function registerContract(
        string memory _contractName,
        address _contractAddress
    ) external override onlyOwner {
        require(
            keccak256(abi.encodePacked(_contractName)) ==
                keccak256(abi.encodePacked(ETHEREUM_PROXY)),
            "PayChunkRegistry: The contract name is invalid"
        );

        contracts[_contractName] = _contractAddress;

        emit ContractRegistered(_contractName, _contractAddress);
    }
}
