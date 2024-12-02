// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./request-network/interfaces/IEthereumProxy.sol";

import "./interfaces/dynamic-invoice-token/IDynamicInvoiceToken.sol";
import "./interfaces/IDynamicInvoiceTokenDeployer.sol";

import "./libraries/ErrorLibrary.sol";
import "./DynamicInvoiceTokenFactory.sol";

/**
 * @title DynamicInvoiceToken
 * @notice This contract supports to quickly store data of an invoice including reference data,
 *         root and children.
 */
contract DynamicInvoiceToken is IDynamicInvoiceToken, ERC721, AccessControl {
    /// @notice Status of the invoice
    enum InvoiceStatus {
        PENDING,
        PARTIALLY_PAID,
        PAID,
        CANCELLED
    }

    /// @notice Role for the contract
    bytes32 public constant CONTRACT_ROLE = keccak256("CONTRACT_ROLE");

    /// @notice Role for the payer of the invoice
    bytes32 public constant PAYER_ROLE = keccak256("PAYER_ROLE");

    /// @notice Role for the payee of the invoice
    bytes32 public constant PAYEE_ROLE = keccak256("PAYEE_ROLE");

    /// @inheritdoc IDynamicInvoiceTokenState
    bytes public override paymentReference;

    /// @inheritdoc IDynamicInvoiceTokenState
    address public override payer;

    /// @inheritdoc IDynamicInvoiceTokenState
    address public override payee;

    /// @inheritdoc IDynamicInvoiceTokenState
    uint256 public override amount;

    /// @dev Status of the invoice
    uint8 private _status;

    /// @dev Progress of the invoice
    uint8 private _progress;

    /// @dev All child of the dynamic invoice token
    address[] private _children;

    /// @inheritdoc IDynamicInvoiceTokenImmutables
    address public override factory;

    /// @inheritdoc IDynamicInvoiceTokenImmutables
    address public override ethereumProxy;

    /// @inheritdoc ERC165
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        (
            factory,
            ethereumProxy,
            name,
            symbol,
            paymentReference,
            payer,
            payee,
            amount
        ) = IDynamicInvoiceTokenDeployer(msg.sender).parameters();

        _grantRole(PAYER_ROLE, payer);
        _grantRole(PAYEE_ROLE, payee);
        _grantRole(CONTRACT_ROLE, address(this));
    }

    /// @inheritdoc IDynamicInvoiceTokenState
    function children() external view override returns (address[] memory) {
        return _children;
    }

    /// @inheritdoc IDynamicInvoiceTokenState
    function status() external view override returns (uint8) {
        if (_children.length == 0) {
            return _status;
        }

        if (DynamicInvoiceToken(address(this)).progress() > 0) {
            return uint8(InvoiceStatus.PARTIALLY_PAID);
        }

        if (DynamicInvoiceToken(address(this)).progress() == 100) {
            return uint8(InvoiceStatus.PAID);
        }

        if (DynamicInvoiceToken(address(this)).progress() == 0) {
            return uint8(InvoiceStatus.PENDING);
        }

        return uint8(InvoiceStatus.CANCELLED);
    }

    /// @inheritdoc IDynamicInvoiceTokenState
    function progress() external view override returns (uint8) {
        if (_children.length == 0) {
            return _progress;
        }

        uint8 totalProgress = 0;
        uint8 totalChildren = 0;

        for (uint256 i = 0; i < _children.length; i++) {
            if (
                IDynamicInvoiceToken(_children[i]).status() ==
                uint8(InvoiceStatus.PAID)
            ) {
                totalProgress += IDynamicInvoiceToken(_children[i]).progress();
                totalChildren++;
            }
        }

        return totalProgress / totalChildren;
    }

    /// @inheritdoc IDynamicInvoiceTokenActions
    function spawnChild(
        bytes calldata _paymentReference,
        address _payer
    ) external override onlyRole(PAYER_ROLE) returns (address) {
        require(_payer != address(0), "DynamicInvoiceToken: Invalid payer");

        address childAddress = DynamicInvoiceTokenFactory(factory)
            .createDynamicInvoiceToken(
                name(),
                symbol(),
                _paymentReference,
                _payer,
                address(this),
                amount
            );

        _children.push(childAddress);

        return childAddress;
    }

    /// @inheritdoc IDynamicInvoiceTokenActions
    function pay() external payable override onlyRole(PAYER_ROLE) {
        if (_status == uint8(InvoiceStatus.PAID)) {
            (bool refundSuccess, ) = msg.sender.call{value: msg.value}("");
            require(refundSuccess, "DynamicInvoiceToken: Refund failed");
            revert("DynamicInvoiceToken: Invoice already paid");
        }

        require(
            _status == uint8(InvoiceStatus.PENDING),
            "DynamicInvoiceToken: The invoice is not pending"
        );

        require(
            msg.value == amount,
            "DynamicInvoiceToken: The amount is not correct"
        );

        try
            IEthereumProxy(payable(ethereumProxy)).transferWithReference{
                value: amount
            }(payable(payee), paymentReference)
        {
            _status = uint8(InvoiceStatus.PAID);
        } catch {
            revert("DynamicInvoiceToken: Payment failed");
        }

        _status = uint8(InvoiceStatus.PAID);

        emit DynamicInvoiceTokenPaid(address(this));
    }
}
