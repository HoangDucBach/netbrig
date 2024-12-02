// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./interfaces/IDynamicInvoiceTokenDeployer.sol";
import "./DynamicInvoiceToken.sol";

/**
 * @title DynamicInvoiceTokenDeployer
 */
contract DynamicInvoiceTokenDeployer is IDynamicInvoiceTokenDeployer {
    struct Parameters {
        address factory;
        address ethereumProxy;
        string name;
        string symbol;
        bytes paymentReference;
        address payer;
        address payee;
        uint256 amount;
    }

    /// @inheritdoc IDynamicInvoiceTokenDeployer
    Parameters public override parameters;

    /// @dev Deploy a dynamic invoice token
    /// @param _factory The address of the factory
    /// @param _ethereumProxy The address of the EthereumProxy contract (Request Network)
    /// @param _name The name of the token
    /// @param _symbol The symbol of the token
    /// @param _paymentReference The payment reference of the invoice
    /// @param _payer The payer of the invoice
    /// @param _payee The payee of the invoice
    /// @param _amount The amount of the invoice
    function deploy(
        address _factory,
        address _ethereumProxy,
        string memory _name,
        string memory _symbol,
        bytes memory _paymentReference,
        address _payer,
        address _payee,
        uint256 _amount
        
    ) internal returns (address dynamicInvoiceToken) {
        parameters = Parameters({
            factory: _factory,
            ethereumProxy: _ethereumProxy,
            name: _name,
            symbol: _symbol,
            paymentReference: _paymentReference,
            payer: _payer,
            payee: _payee,
            amount: _amount
        });
        dynamicInvoiceToken = address(
            new DynamicInvoiceToken{salt: keccak256(abi.encode(_paymentReference))}(
                _name,
                _symbol
            )
        );
        delete parameters;
    }
}
