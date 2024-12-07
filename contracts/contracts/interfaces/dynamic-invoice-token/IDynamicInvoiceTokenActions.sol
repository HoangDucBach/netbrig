// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/**
 * @title IDynamicInvoiceTokenActions - Interface for Dynamic Invoice Token Actions
 */
interface IDynamicInvoiceTokenActions {
    /// @notice Spawn a new child dynamic invoice token
    /// @param _requestId Request ID of child invoice that be assigned
    /// @param _paymentReference Payment reference of child invoice that be assigned
    /// @param _payer Payer of child invoice that be assigned
    /// @param _amount Amount of child invoice that be assigned
    function spawnChild(
        string calldata _requestId,
        bytes calldata _paymentReference,
        address _payer,
        uint256 _amount
    ) external returns (address);

    /// @notice Pay the invoice, using EthereumProxy of Request Network
    function pay() external payable;
}
