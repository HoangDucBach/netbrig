// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/**
 * @title IDynamicInvoiceTokenActions - Interface for Dynamic Invoice Token Actions
 */
interface IDynamicInvoiceTokenActions {
    /// @notice Spawn a new child token
    /// @param _requestId Request Id of child invoice
    /// @param _payer Payer of child invoice that be assigned
    function spawnChild(
        string memory _requestId,
        address _payer
    ) external returns (address);

    /// @notice Change status of the token
    function changeStatus(uint8 __status) external;
}
