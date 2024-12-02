// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./IDynamicInvoiceTokenState.sol";
import "./IDynamicInvoiceTokenEvents.sol";
import "./IDynamicInvoiceTokenActions.sol";
import "./IDynamicInvoiceTokenImmutables.sol";

/**
 * @title IDynamicInvoiceToken - Interface for Dynamic Invoice Token
 */
interface IDynamicInvoiceToken is
    IDynamicInvoiceTokenState,
    IDynamicInvoiceTokenActions,
    IDynamicInvoiceTokenEvents,
    IDynamicInvoiceTokenImmutables
{

}
