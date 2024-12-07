// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title IEthereumProxy
 * @notice Custom interface for EthereumProxy to interact (Request Network)
 */
interface IEthereumProxy {
    /**
     * @notice Event emitted when a transfer with reference is performed
     * @param to Address of the recipient
     * @param amount Amount transferred
     * @param paymentReference Reference of the payment related
     */
    event TransferWithReference(address indexed to, uint256 amount, bytes indexed paymentReference);

    /**
     * @notice Performs an Ethereum transfer with a reference
     * @param _to Address of the recipient
     * @param _paymentReference Reference of the payment related
     */
    function transferWithReference(address payable _to, bytes calldata _paymentReference) external payable;
}
