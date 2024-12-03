// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./request-network/interfaces/IEthereumProxy.sol";

import "./interfaces/dynamic-invoice-token/IDynamicInvoiceToken.sol";
import "./interfaces/IDynamicInvoiceTokenDeployer.sol";
import "./interfaces/IPayChunkRegistry.sol";

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
    address public override registry;

    /// @inheritdoc ERC165
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    /// @dev Receive function
    receive() external payable {}

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        (
            registry,
            factory,
            name,
            symbol,
            requestId,
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

        if (this.progress() > 0) {
            return uint8(InvoiceStatus.PARTIALLY_PAID);
        }

        if (this.progress() == 100) {
            return uint8(InvoiceStatus.PAID);
        }

        if (this.progress() == 0) {
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
        uint256 totalChildren = _children.length;

        for (uint256 i = 0; i < _children.length; i++) {
            if (
                IDynamicInvoiceToken(_children[i]).status() ==
                uint8(InvoiceStatus.PAID)
            ) {
                totalProgress++;
            }
        }

        return uint8((totalProgress * 100) / totalChildren);
    }

    /// @inheritdoc IDynamicInvoiceTokenActions
    function spawnChild(
        string calldata _requestId,
        bytes calldata _paymentReference,
        address _payer,
        uint256 _amount
    ) external override onlyRole(PAYER_ROLE) returns (address) {
        require(_payer != address(0), "DynamicInvoiceToken: Invalid payer");

        address childAddress = DynamicInvoiceTokenFactory(factory)
            .createDynamicInvoiceToken(
                name(),
                symbol(),
                _requestId,
                _paymentReference,
                _payer,
                address(this),
                _amount
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
            msg.value >= amount,
            "DynamicInvoiceToken: The amount is not enough"
        );

        address ethereumProxy = IPayChunkRegistry(registry).contracts(
            "ETHEREUM_PROXY"
        );
        require(
            isContract(ethereumProxy),
            "DynamicInvoiceToken: ethereumProxy is not a contract"
        );

        /// @notice Transfer the amount to invoice before delegate call to EthereumProxy
        // payable(address(this)).transfer(msg.value);

        try
            IEthereumProxy(ethereumProxy).transferWithReference{value: amount}(
                payable(payee),
                paymentReference
            )
        {
            _status = uint8(InvoiceStatus.PAID);
        } catch Error(string memory reason) {
            revert(string(abi.encodePacked("DynamicInvoiceToken: ", reason)));
        } catch {
            revert("DynamicInvoiceToken: Payment failed");
        }

        _status = uint8(InvoiceStatus.PAID);
        _progress = 100;

        emit DynamicInvoiceTokenPaid(address(this));
    }

    function isContract(address _addr) internal view returns (bool) {
        uint32 size;
        assembly {
            size := extcodesize(_addr)
        }
        return (size > 0);
    }
}
