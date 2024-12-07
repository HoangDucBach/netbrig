// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/**
 * @title IDynamicInvoiceTokenEvents - Interface for Dynamic Invoice Token Events
 */
interface IDynamicInvoiceTokenEvents {
    /// @notice Event emitted when the invoice is paid
    /// @param invoice Address of the invoice
    event DynamicInvoiceTokenPaid(address indexed invoice);

    /// @notice Event emitted when the invoice is canceled
    /// @param invoice Address of the invoice
    event DynamicInvoiceTokenCanceled(address indexed invoice);

    /// @notice Event emitted when the invoice is spawned
    /// @param invoice Address of the invoice
    /// @param childInvoice Address of the child invoice
    event DynamicInvoiceTokenSpawned(address indexed invoice, address indexed childInvoice);

    /// @notice Event emitted when the invoice update progresses
    /// @param invoice Address of the invoice
    /// @param progress Progress of the update
    event DynamicInvoiceTokenUpdateProgress(address indexed invoice, uint8 progress);
    
}
