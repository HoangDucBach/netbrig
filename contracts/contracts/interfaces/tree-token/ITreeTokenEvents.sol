// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/// @title ITreeTokenEvents - Interface for Tree Token Events
interface ITreeTokenEvents {
    /// @notice Event emitted when the parent of the token is changed
    event ParentChanged(address indexed oldParent, address indexed newParent);
}
