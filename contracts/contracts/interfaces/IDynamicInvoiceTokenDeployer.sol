// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/**
 * @title IDynamicInvoiceTokenDeployer
 * @notice A contract that constructs the parameters for the deployment of the Dynamic Invoice Token
 */
interface IDynamicInvoiceTokenDeployer {
    /// @notice Get the parameters to be used for the deployment of the dynamic invoice token
    /// @return registry The address of the registry
    /// @return factory The address of the factory
    /// @return name The name of the token
    /// @return symbol The symbol of the token
    /// @return requestId The request ID of the invoice
    /// @return paymentReference The payment reference of the invoice
    /// @return payer The payer of the invoice
    /// @return payee The payee of the invoice
    /// @return amount The amount of the invoice
    function parameters()
        external
        view
        returns (
            address registry,
            address factory,
            string memory name,
            string memory symbol,
            string memory requestId,
            bytes calldata paymentReference,
            address payer,
            address payee,
            uint256 amount
        );
}
