// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/**
 * @title IDynamicInvoiceTokenEvents - Interface for Dynamic Invoice Token Events
 */
interface IDynamicInvoiceTokenEvents {
    /// @notice Event emitted when the invoice is paid
    /// @param invoice Address of the invoice
    event DynamicInvoiceTokenPaid(address indexed invoice);

    /// @notice Event emitted when the invoice is spawned
    /// @param invoice Address of the invoice
    event DynamicInvoiceTokenSpawned(address indexed invoice);
}
