// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/**
 * @title IDynamicInvoiceTokenImmutables - Interface for Dynamic Invoice Token Immutables
 */
interface IDynamicInvoiceTokenImmutables {
    /// @notice The contract of registry
    function registry() external view returns (address);

    /// @notice The contract of factory that deployed the token
    function factory() external view returns (address);
}
