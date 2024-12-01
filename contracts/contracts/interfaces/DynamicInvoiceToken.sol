// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

import "./dynamic-invoice-token/IDynamicInvoiceToken.sol";
import "./tree-token/ITreeToken.sol";

import "../libraries/ErrorLibrary.sol";

/**
 * @title DynamicInvoiceToken
 * @notice This contract supports to quickly store data of an invoice including reference data,
 *         root and children.
 */
contract DynamicInvoiceToken is
    IDynamicInvoiceToken,
    ITreeToken,
    ERC721,
    AccessControl
{
    /// @notice Status of the invoice
    enum InvoiceStatus {
        PENDING,
        PARTIALLY_PAID,
        PAID,
        CANCELLED
    }

    /// @notice Role for the payer of the invoice
    bytes32 public constant PAYER_ROLE = keccak256("PAYER_ROLE");

    /// @notice Role for the payee of the invoice
    bytes32 public constant PAYEE_ROLE = keccak256("PAYEE_ROLE");

    /// @inheritdoc IDynamicInvoiceTokenState
    bytes32 public override requestId;

    /// @inheritdoc IDynamicInvoiceTokenState
    uint8 public override status;

    /// @inheritdoc ITreeTokenState
    address public override parent;

    /// @dev All child of the dynamic invoice token
    address[] private _children;

    /// @inheritdoc ERC165
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    constructor(
        string memory _name,
        string memory _symbol,
        address _payer,
        address _payee,
        address _parent
    ) ERC721(_name, _symbol) {
        if (
            _payer == address(0) ||
            _payee == address(0) ||
            _parent == address(0)
        ) {
            revert ErrorLibrary.InvalidAddress();
        }

        _grantRole(PAYER_ROLE, _payer);
        _grantRole(PAYEE_ROLE, _payee);
        parent = _parent;
    }

    /// @inheritdoc ITreeTokenState
    function children() external view override returns (address[] memory) {
        return _children;
    }

    /// @inheritdoc ITreeTokenActions
    function addChild(address _child) external override onlyRole(PAYER_ROLE) {
        if (_child == address(0)) {
            revert ErrorLibrary.InvalidAddress();
        }

        _children.push(_child);
    }

    function changeStatus(
        uint8 _status
    ) external override onlyRole(PAYEE_ROLE) {
        require(
            _status < uint8(InvoiceStatus.CANCELLED),
            "DynamicInvoiceToken: Invalid status"
        );
        status = _status;
    }
}
