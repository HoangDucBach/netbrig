/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../../common";

export interface IDynamicInvoiceTokenInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "amount"
      | "amountPaid"
      | "children"
      | "factory"
      | "pay"
      | "payee"
      | "payer"
      | "paymentReference"
      | "registry"
      | "requestId"
      | "spawnChild"
      | "status"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "DynamicInvoiceTokenCanceled"
      | "DynamicInvoiceTokenPaid"
      | "DynamicInvoiceTokenSpawned"
      | "DynamicInvoiceTokenUpdateProgress"
  ): EventFragment;

  encodeFunctionData(functionFragment: "amount", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "amountPaid",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "children", values?: undefined): string;
  encodeFunctionData(functionFragment: "factory", values?: undefined): string;
  encodeFunctionData(functionFragment: "pay", values?: undefined): string;
  encodeFunctionData(functionFragment: "payee", values?: undefined): string;
  encodeFunctionData(functionFragment: "payer", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "paymentReference",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "registry", values?: undefined): string;
  encodeFunctionData(functionFragment: "requestId", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "spawnChild",
    values: [string, BytesLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "status", values?: undefined): string;

  decodeFunctionResult(functionFragment: "amount", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "amountPaid", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "children", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "factory", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pay", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "payee", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "payer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "paymentReference",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "registry", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "requestId", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "spawnChild", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "status", data: BytesLike): Result;
}

export namespace DynamicInvoiceTokenCanceledEvent {
  export type InputTuple = [invoice: AddressLike];
  export type OutputTuple = [invoice: string];
  export interface OutputObject {
    invoice: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DynamicInvoiceTokenPaidEvent {
  export type InputTuple = [invoice: AddressLike];
  export type OutputTuple = [invoice: string];
  export interface OutputObject {
    invoice: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DynamicInvoiceTokenSpawnedEvent {
  export type InputTuple = [invoice: AddressLike, childInvoice: AddressLike];
  export type OutputTuple = [invoice: string, childInvoice: string];
  export interface OutputObject {
    invoice: string;
    childInvoice: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace DynamicInvoiceTokenUpdateProgressEvent {
  export type InputTuple = [invoice: AddressLike, progress: BigNumberish];
  export type OutputTuple = [invoice: string, progress: bigint];
  export interface OutputObject {
    invoice: string;
    progress: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IDynamicInvoiceToken extends BaseContract {
  connect(runner?: ContractRunner | null): IDynamicInvoiceToken;
  waitForDeployment(): Promise<this>;

  interface: IDynamicInvoiceTokenInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  amount: TypedContractMethod<[], [bigint], "view">;

  amountPaid: TypedContractMethod<[], [bigint], "view">;

  children: TypedContractMethod<[], [string[]], "view">;

  factory: TypedContractMethod<[], [string], "view">;

  pay: TypedContractMethod<[], [void], "payable">;

  payee: TypedContractMethod<[], [string], "view">;

  payer: TypedContractMethod<[], [string], "view">;

  paymentReference: TypedContractMethod<[], [string], "view">;

  registry: TypedContractMethod<[], [string], "view">;

  requestId: TypedContractMethod<[], [string], "view">;

  spawnChild: TypedContractMethod<
    [
      _requestId: string,
      _paymentReference: BytesLike,
      _payer: AddressLike,
      _amount: BigNumberish
    ],
    [string],
    "nonpayable"
  >;

  status: TypedContractMethod<[], [bigint], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "amount"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "amountPaid"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "children"
  ): TypedContractMethod<[], [string[]], "view">;
  getFunction(
    nameOrSignature: "factory"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "pay"
  ): TypedContractMethod<[], [void], "payable">;
  getFunction(
    nameOrSignature: "payee"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "payer"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "paymentReference"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "registry"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "requestId"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "spawnChild"
  ): TypedContractMethod<
    [
      _requestId: string,
      _paymentReference: BytesLike,
      _payer: AddressLike,
      _amount: BigNumberish
    ],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "status"
  ): TypedContractMethod<[], [bigint], "view">;

  getEvent(
    key: "DynamicInvoiceTokenCanceled"
  ): TypedContractEvent<
    DynamicInvoiceTokenCanceledEvent.InputTuple,
    DynamicInvoiceTokenCanceledEvent.OutputTuple,
    DynamicInvoiceTokenCanceledEvent.OutputObject
  >;
  getEvent(
    key: "DynamicInvoiceTokenPaid"
  ): TypedContractEvent<
    DynamicInvoiceTokenPaidEvent.InputTuple,
    DynamicInvoiceTokenPaidEvent.OutputTuple,
    DynamicInvoiceTokenPaidEvent.OutputObject
  >;
  getEvent(
    key: "DynamicInvoiceTokenSpawned"
  ): TypedContractEvent<
    DynamicInvoiceTokenSpawnedEvent.InputTuple,
    DynamicInvoiceTokenSpawnedEvent.OutputTuple,
    DynamicInvoiceTokenSpawnedEvent.OutputObject
  >;
  getEvent(
    key: "DynamicInvoiceTokenUpdateProgress"
  ): TypedContractEvent<
    DynamicInvoiceTokenUpdateProgressEvent.InputTuple,
    DynamicInvoiceTokenUpdateProgressEvent.OutputTuple,
    DynamicInvoiceTokenUpdateProgressEvent.OutputObject
  >;

  filters: {
    "DynamicInvoiceTokenCanceled(address)": TypedContractEvent<
      DynamicInvoiceTokenCanceledEvent.InputTuple,
      DynamicInvoiceTokenCanceledEvent.OutputTuple,
      DynamicInvoiceTokenCanceledEvent.OutputObject
    >;
    DynamicInvoiceTokenCanceled: TypedContractEvent<
      DynamicInvoiceTokenCanceledEvent.InputTuple,
      DynamicInvoiceTokenCanceledEvent.OutputTuple,
      DynamicInvoiceTokenCanceledEvent.OutputObject
    >;

    "DynamicInvoiceTokenPaid(address)": TypedContractEvent<
      DynamicInvoiceTokenPaidEvent.InputTuple,
      DynamicInvoiceTokenPaidEvent.OutputTuple,
      DynamicInvoiceTokenPaidEvent.OutputObject
    >;
    DynamicInvoiceTokenPaid: TypedContractEvent<
      DynamicInvoiceTokenPaidEvent.InputTuple,
      DynamicInvoiceTokenPaidEvent.OutputTuple,
      DynamicInvoiceTokenPaidEvent.OutputObject
    >;

    "DynamicInvoiceTokenSpawned(address,address)": TypedContractEvent<
      DynamicInvoiceTokenSpawnedEvent.InputTuple,
      DynamicInvoiceTokenSpawnedEvent.OutputTuple,
      DynamicInvoiceTokenSpawnedEvent.OutputObject
    >;
    DynamicInvoiceTokenSpawned: TypedContractEvent<
      DynamicInvoiceTokenSpawnedEvent.InputTuple,
      DynamicInvoiceTokenSpawnedEvent.OutputTuple,
      DynamicInvoiceTokenSpawnedEvent.OutputObject
    >;

    "DynamicInvoiceTokenUpdateProgress(address,uint8)": TypedContractEvent<
      DynamicInvoiceTokenUpdateProgressEvent.InputTuple,
      DynamicInvoiceTokenUpdateProgressEvent.OutputTuple,
      DynamicInvoiceTokenUpdateProgressEvent.OutputObject
    >;
    DynamicInvoiceTokenUpdateProgress: TypedContractEvent<
      DynamicInvoiceTokenUpdateProgressEvent.InputTuple,
      DynamicInvoiceTokenUpdateProgressEvent.OutputTuple,
      DynamicInvoiceTokenUpdateProgressEvent.OutputObject
    >;
  };
}
