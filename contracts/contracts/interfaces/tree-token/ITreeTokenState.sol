// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

/// @title ITreeTokenState - Interface for Tree Token State
interface ITreeTokenState {
    /// @notice Get the parent of the token
    function parent() external view returns (address);
}
