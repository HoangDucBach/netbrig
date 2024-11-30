// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/// @title ErrorLibrary - Error library for all contracts
library ErrorLibrary {
    error Unauthorized(); /// @dev Error msg sender is unauthorized to perform action
    error InvalidAddress(); /// @dev Error msg sender is unauthorized to perform action

    error InsufficientFunds(); /// @dev Error insufficient funds

    error InvalidValue(); /// @dev Error invalid value
    error ZeroValue(); /// @dev Error zero value
    error MathError(); /// @dev Error math error

    error AlreadyInitialized(); /// @dev Error already initialized
    error AlreadyState(); /// @dev Error already state
    error AlreadyPending(); /// @dev Error already pending
    error AlreadyPartialPaid(); /// @dev Error already partial paid
    error AlreadyPaid(); /// @dev Error already paid
    error NotInitialized(); /// @dev Error not initialized
    error NotState(); /// @dev Error not state
    error NotPending(); /// @dev Error not pending
    error NotPartialPaid(); /// @dev Error not partial paid
    error NotPaid(); /// @dev Error not paid
    error NotFound(); /// @dev Error not found any data

    error NotWhitelisted(); /// @dev Error not whitelisted
    error NotBlacklisted(); /// @dev Error not blacklisted

    error InternalError(); /// @dev Error internal error after all checks
}
