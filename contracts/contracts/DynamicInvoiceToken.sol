// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
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
contract DynamicInvoiceToken is
    IDynamicInvoiceToken,
    ERC721,
    AccessControl,
    ReentrancyGuard
{
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

    /// @inheritdoc IDynamicInvoiceTokenState
    uint256 public override amountPaid = 0;

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
    receive() external payable {
        amountPaid += msg.value;
    }

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
        if (amountPaid == 0) {
            return uint8(InvoiceStatus.PENDING);
        }
        if (amountPaid < amount) {
            return uint8(InvoiceStatus.PARTIALLY_PAID);
        }
        if (amountPaid >= amount) {
            return uint8(InvoiceStatus.PAID);
        }

        return uint8(InvoiceStatus.CANCELLED);
    }

    /// @inheritdoc IDynamicInvoiceTokenActions
    function spawnChild(
        string calldata _requestId,
        bytes calldata _paymentReference,
        address _payer,
        uint256 _amount
    ) external override onlyRole(PAYER_ROLE) returns (address) {
        require(_payer != address(0), "DynamicInvoiceToken: Invalid payer");
        require(_amount > 0, "DynamicInvoiceToken: Invalid amount");

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

        emit DynamicInvoiceTokenSpawned(address(this), childAddress);

        return childAddress;
    }

    /// @inheritdoc IDynamicInvoiceTokenActions
    function pay() external payable override onlyRole(PAYER_ROLE) nonReentrant {
        require(
            this.status() != uint8(InvoiceStatus.PAID),
            "DynamicInvoiceToken: The invoice is already paid"
        );
        require(
            this.status() != uint8(InvoiceStatus.CANCELLED),
            "DynamicInvoiceToken: The invoice is cancelled"
        );
        require(
            msg.value >= amount - amountPaid,
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
            IEthereumProxy(ethereumProxy).transferWithReference{
                value: msg.value
            }(payable(payee), paymentReference)
        {
            amountPaid += msg.value;
        } catch Error(string memory reason) {
            revert(string(abi.encodePacked("DynamicInvoiceToken: ", reason)));
        } catch {
            revert("DynamicInvoiceToken: Payment failed");
        }

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
