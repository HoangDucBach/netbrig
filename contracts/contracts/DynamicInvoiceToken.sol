// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

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
    string public override requestId;

    /// @inheritdoc IDynamicInvoiceTokenState
    address public override payer;

    /// @inheritdoc IDynamicInvoiceTokenState
    address public override payee;

    /// @inheritdoc IDynamicInvoiceTokenState
    uint8 public override status;

    /// @dev All child of the dynamic invoice token
    address[] private _children;

    /// @inheritdoc IDynamicInvoiceTokenImmutables
    address public override factory;

    /// @inheritdoc ERC165
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        (
            factory,
            name,
            symbol,
            payer,
            payee,
            requestId
        ) = IDynamicInvoiceTokenDeployer(msg.sender).parameters();

        _grantRole(PAYER_ROLE, payer);
        _grantRole(PAYEE_ROLE, payee);
        _grantRole(CONTRACT_ROLE, address(this));
    }

    /// @inheritdoc IDynamicInvoiceTokenState
    function children() external view override returns (address[] memory) {
        return _children;
    }

    /// @inheritdoc IDynamicInvoiceTokenActions
    function changeStatus(
        uint8 _status
    ) external override onlyRole(PAYEE_ROLE) {
        require(
            _status < uint8(InvoiceStatus.CANCELLED),
            "DynamicInvoiceToken: Invalid status"
        );
        status = _status;
    }

    /// @inheritdoc IDynamicInvoiceTokenActions
    function spawnChild(
        string memory _requestId,
        address _payer
    ) external override onlyRole(PAYER_ROLE) returns (address) {
        require(_payer != address(0), "DynamicInvoiceToken: Invalid payer");

        address childAddress = DynamicInvoiceTokenFactory(factory)
            .createDynamicInvoiceToken(
                name(),
                symbol(),
                _payer,
                address(this),
                _requestId
            );

        _children.push(childAddress);

        return childAddress;
    }
}
