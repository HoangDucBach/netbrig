// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/// @title ITreeTokenActions - Interface for Tree Token Actions
interface ITreeTokenActions {
    /// @notice Add a child to the token
    function addChild(address _child) external;
}
