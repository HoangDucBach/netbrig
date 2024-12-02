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
        string name;
        string symbol;
        address payer;
        address payee;
        string requestId;
    }

    /// @inheritdoc IDynamicInvoiceTokenDeployer
    Parameters public override parameters;

    /// @dev Deploy a dynamic invoice token
    /// @param _factory The address of the factory
    /// @param _name The name of the token
    /// @param _symbol The symbol of the token
    /// @param _payer The payer of the invoice
    /// @param _payee The payee of the invoice
    /// @param _requestId The request ID of the invoice
    function deploy(
        address _factory,
        string memory _name,
        string memory _symbol,
        address _payer,
        address _payee,
        string memory _requestId
    ) internal returns (address dynamicInvoiceToken) {
        parameters = Parameters({
            factory: _factory,
            name: _name,
            symbol: _symbol,
            payer: _payer,
            payee: _payee,
            requestId: _requestId
        });
        dynamicInvoiceToken = address(
            new DynamicInvoiceToken{salt: keccak256(abi.encode(_requestId))}(
                _name,
                _symbol
            )
        );
        delete parameters;
    }
}
