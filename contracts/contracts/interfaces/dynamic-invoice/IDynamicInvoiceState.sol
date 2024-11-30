// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/// @title IDynamicInvoiceState - Interface for Dynamic Invoice State
interface IDynamicInvoiceState {
    /// @notice Status of the invoice
    enum InvoiceStatus {
        PENDING,
        PARTIALLY_PAID,
        PAID,
        CANCELLED
    }

    /// @notice Get the payer of the invoice
    function payer() external view returns (address);

    /// @notice Get the payee of the invoice
    function payee() external view returns (address);

    /// @notice Get the amount of the invoice
    function amount() external view returns (uint256);

    /// @notice Get the due date of the invoice
    function dueDate() external view returns (uint256);

    /// @notice Get the status of the invoice
    function status() external view returns (InvoiceStatus);
}
