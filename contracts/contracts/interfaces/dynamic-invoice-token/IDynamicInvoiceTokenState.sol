// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/**
 * @title IDynamicInvoiceTokenState - Interface for Dynamic Invoice Token State
 */
interface IDynamicInvoiceTokenState {
    /// @notice Request ID of the invoice
    function requestId() external view returns (string memory);

    /// @notice Reference to the request payment, for handle the payment (Request Network)
    function paymentReference() external view returns (bytes memory);

    /// @notice Get the payee of the invoice
    function payee() external view returns (address);

    /// @notice Get the payer of the invoice
    function payer() external view returns (address);

    /// @notice Get the amount of the invoice
    function amount() external view returns (uint256);

    /// @notice Get the paid amount of the invoice
    function amountPaid() external view returns (uint256);

    /// @notice All chilldren of the invoice
    function children() external view returns (address[] memory);

    /// @notice Get the status of the invoice, must be in ["PENDING", "PARTIALLY_PAID", "PAID", "CANCELLED"]
    function status() external view returns (uint8);
}
