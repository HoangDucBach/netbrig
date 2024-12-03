// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./interfaces/IDynamicInvoiceTokenDeployer.sol";
import "./DynamicInvoiceToken.sol";

/**
 * @title DynamicInvoiceTokenDeployer
 */
contract DynamicInvoiceTokenDeployer is IDynamicInvoiceTokenDeployer {
    struct Parameters {
        address registry;
        address factory;
        string name;
        string symbol;
        string requestId;
        bytes paymentReference;
        address payer;
        address payee;
        uint256 amount;
    }

    /// @inheritdoc IDynamicInvoiceTokenDeployer
    Parameters public override parameters;

    /// @dev Deploy a dynamic invoice token
    /// @param _registry The address of the registry
    /// @param _factory The address of the factory
    /// @param _name The name of the token
    /// @param _symbol The symbol of the token
    /// @param _paymentReference The payment reference of the invoice
    /// @param _payer The payer of the invoice
    /// @param _payee The payee of the invoice
    /// @param _amount The amount of the invoice
    function deploy(
        address _registry,
        address _factory,
        string memory _name,
        string memory _symbol,
        string memory _requestId,
        bytes memory _paymentReference,
        address _payer,
        address _payee,
        uint256 _amount
        
    ) internal returns (address dynamicInvoiceToken) {
        parameters = Parameters({
            registry: _registry,
            factory: _factory,
            name: _name,
            symbol: _symbol,
            requestId: _requestId,
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
