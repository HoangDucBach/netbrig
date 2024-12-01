// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/**
 * @title IDynamicInvoiceTokenState - Interface for Dynamic Invoice Token State
 */
interface IDynamicInvoiceTokenState {
    /// @notice Request ID of the invoice
    function requestId() external view returns (bytes32);

    /// @notice Get the status of the invoice, e.g. "PENDING", "PARTIALLY_PAID", "PAID", "CANCELLED"
    function status() external view returns (uint8);
}
