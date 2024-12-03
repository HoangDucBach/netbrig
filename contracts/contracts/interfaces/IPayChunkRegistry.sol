// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/**
 * @title IPayChunkRegistry
 * @notice Interface for the PayChunkRegistry contract, to manage all deployed contracts
 */
interface IPayChunkRegistry {
    /// @notice Emit when a contract is registered
    event ContractRegistered(string contractName, address contractAddress);

    /// @notice This event is emitted when a contract is registered
    function contracts(
        string memory _contractName
    ) external view returns (address);

    /// @notice Register a contract
    function registerContract(
        string memory _contractName,
        address _contractAddress
    ) external;
}
