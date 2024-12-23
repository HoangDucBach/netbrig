/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IERC20ConversionProxy,
  IERC20ConversionProxyInterface,
} from "../../../../contracts/request-network/interfaces/IERC20ConversionProxy";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "currency",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes",
        name: "paymentReference",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "feeAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "maxRateTimespan",
        type: "uint256",
      },
    ],
    name: "TransferWithConversionAndReference",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "bytes",
        name: "paymentReference",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "feeAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "feeAddress",
        type: "address",
      },
    ],
    name: "TransferWithReferenceAndFee",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_requestAmount",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_path",
        type: "address[]",
      },
      {
        internalType: "bytes",
        name: "_paymentReference",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "_feeAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_feeAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_maxToSpend",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxRateTimespan",
        type: "uint256",
      },
    ],
    name: "transferFromWithReferenceAndFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IERC20ConversionProxy__factory {
  static readonly abi = _abi;
  static createInterface(): IERC20ConversionProxyInterface {
    return new Interface(_abi) as IERC20ConversionProxyInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IERC20ConversionProxy {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as IERC20ConversionProxy;
  }
}
