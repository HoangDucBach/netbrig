// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

import "./interfaces/IDynamicInvoiceTokenFactory.sol";

import "./DynamicInvoiceToken.sol";
import "./DynamicInvoiceTokenDeployer.sol";
import "./PayChunkRegistry.sol";

/**
 * @title DynamicInvoiceTokenFactory
 * @notice This contract supports to create dynamic invoice token
 */
contract DynamicInvoiceTokenFactory is
    IDynamicInvoiceTokenFactory,
    DynamicInvoiceTokenDeployer,
    AccessControl
{
    /// @notice Role for the factory
    bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE");

    /// @inheritdoc IDynamicInvoiceTokenFactory
    address public override owner;

    /// @inheritdoc IDynamicInvoiceTokenFactory
    mapping(bytes => address) public override getDynamicInvoiceToken;

    /// @dev PayChunkRegistry contract
    address public registry;

    constructor(address _registry) {
        _grantRole(OWNER_ROLE, msg.sender);

        owner = msg.sender;
        registry = _registry;

        emit OwnerChanged(address(0), msg.sender);
    }

    /// @inheritdoc IDynamicInvoiceTokenFactory
    function createDynamicInvoiceToken(
        string calldata _name,
        string calldata _symbol,
        string calldata _requestId,
        bytes calldata _paymentReference,
        address _payer,
        address _payee,
        uint256 _amount
    ) external override returns (address dynamicInvoiceToken) {
        require(
            getDynamicInvoiceToken[_paymentReference] == address(0),
            "DynamicInvoiceTokenFactory: The dynamic invoice token is already created"
        );

        require(
            _payer != address(0) && _payee != address(0),
            "DynamicInvoiceTokenFactory: Payer and payee must not be zero address"
        );

        dynamicInvoiceToken = deploy(
            registry,
            address(this),
            _name,
            _symbol,
            _requestId,
            _paymentReference,
            _payer,
            _payee,
            _amount
        );

        getDynamicInvoiceToken[_paymentReference] = dynamicInvoiceToken;

        emit DynamicInvoiceTokenCreated(dynamicInvoiceToken, _paymentReference);
    }

    /// @inheritdoc IDynamicInvoiceTokenFactory
    function setOwner(address _owner) external override onlyRole(OWNER_ROLE) {
        require(
            hasRole(OWNER_ROLE, msg.sender),
            "DynamicInvoiceTokenFactory: Must have OWNER_ROLE to set owner"
        );

        address oldOwner = owner;
        owner = _owner;

        emit OwnerChanged(oldOwner, _owner);
    }
}
