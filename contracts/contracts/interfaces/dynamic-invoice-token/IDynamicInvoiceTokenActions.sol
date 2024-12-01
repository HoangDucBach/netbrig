// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/**
 * @title IDynamicInvoiceTokenActions - Interface for Dynamic Invoice Token Actions
 */
interface IDynamicInvoiceTokenActions {
    /// @notice Change status of the token
    function changeStatus(uint8 __status) external;
}
