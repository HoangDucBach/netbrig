// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/**
 * @title IDynamicInvoiceTokenFactory
 * @notice A contract that creates dynamic invoice tokens
 */
interface IDynamicInvoiceTokenFactory {
    /// @notice This event is emitted when a dynamic invoice token is created
    /// @param dynamicInvoiceToken The address of the dynamic invoice token
    /// @param paymentReference The payment reference of the invoice
    event DynamicInvoiceTokenCreated(
        address indexed dynamicInvoiceToken,
        bytes paymentReference
    );

    /// @notice Emitted when the owner of the factory is changed
    /// @param oldOwner The owner before the owner was changed
    /// @param newOwner The owner after the owner was changed
    event OwnerChanged(address indexed oldOwner, address indexed newOwner);

    /// @notice Returns the current owner of the factory
    /// @dev Can be changed by the current owner via setOwner
    /// @return The address of the factory owner
    function owner() external view returns (address);

    /// @notice This function creates a dynamic invoice token
    /// @param _name The name of the token
    /// @param _symbol The symbol of the token
    /// @param _requestId The request ID of the invoice
    /// @param _paymentReference The payment reference of the invoice
    /// @param _payer The payer of the invoice
    /// @param _payee The payee of the invoice
    /// @param _amount The amount of the invoice
    /// @return The address of the dynamic invoice token
    function createDynamicInvoiceToken(
        string memory _name,
        string memory _symbol,
        string calldata _requestId,
        bytes calldata _paymentReference,
        address _payer,
        address _payee,
        uint256 _amount
    ) external returns (address);

    /// @notice Get the address of the dynamic invoice token
    /// @param _paymentReference The payment reference of the invoice
    /// @return The address of the dynamic invoice token
    function getDynamicInvoiceToken(
        bytes calldata _paymentReference
    ) external view returns (address);

    /// @notice Updates the owner of the factory
    /// @dev Must be called by the current owner
    /// @param _owner The new owner of the factory
    function setOwner(address _owner) external;
}
