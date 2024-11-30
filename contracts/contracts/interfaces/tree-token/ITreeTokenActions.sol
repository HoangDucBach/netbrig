// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/// @title ITreeTokenActions - Interface for Tree Token Actions
interface ITreeTokenActions {
    /// @notice Change the parent of the token
    function changeParent(address newParent) external;
}
