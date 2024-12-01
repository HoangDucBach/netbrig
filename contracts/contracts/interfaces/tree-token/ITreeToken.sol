// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./ITreeTokenState.sol";
import "./ITreeTokenActions.sol";
import "./ITreeTokenEvents.sol";

/**
 * @title ITreeToken - Interface for Tree Token
 * @notice Interface for contract tokens with Tree structure
 */
interface ITreeToken is ITreeTokenState, ITreeTokenActions, ITreeTokenEvents {

}
