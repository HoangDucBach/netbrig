import { useMemo } from 'react';

import {
    payRequest as pay,
} from '@requestnetwork/payment-processor';
import { validateRequest } from '@requestnetwork/payment-processor/dist/payment/utils';
import { PaymentReferenceCalculator, Request, RequestNetwork, Types } from '@requestnetwork/request-client.js';
import {
    type ClientTypes,
    ExtensionTypes,
    type PaymentTypes,
} from '@requestnetwork/types';
import { Web3SignatureProvider } from '@requestnetwork/web3-signature';
import { BigNumber } from 'ethers';
import { useAccount, useWalletClient } from 'wagmi';
import { Invoice } from '@/types';
import { useEthers } from './useEthers';

type RequestNetworkHook = {
    createRequest: (
        requestData: ClientTypes.IRequestInfo,
        paymentNetwork: PaymentTypes.PaymentNetworkCreateParameters,
        invoice: Invoice,
    ) => Promise<Request>;
    getRequest: (requestId: string) => Promise<Request>;
    payRequest: (requestId: string, amount: BigNumber) => Promise<void>;
    requestNetwork: RequestNetwork;
    calulatePaymentReference: (requestId: string) => Promise<string>;
};

export const useRequestNetwork = (): RequestNetworkHook => {
    const { data: walletClient } = useWalletClient();
    const { address } = useAccount();
    const { signer } = useEthers();

    const requestNetwork = useMemo<RequestNetwork>(() => {
        const signatureProvider = walletClient ? new Web3SignatureProvider(walletClient) : undefined;

        return new RequestNetwork({
            nodeConnectionConfig: {
                baseURL: 'https://sepolia.gateway.request.network/',
            },
            signatureProvider,
        });
    }, [walletClient]);

    const createRequest = async (
        requestData: ClientTypes.IRequestInfo,
        paymentNetwork: PaymentTypes.PaymentNetworkCreateParameters,
        invoice: Invoice,
    ): Promise<Request> => {
        if (!requestData.payee) throw new Error('Create Request: Payee is required');
        if (!requestData.payer) throw new Error('Create Request: Payer is required');
        if (!address) throw new Error('Create Request: Address is required');

        try {
            const request = await requestNetwork?.createRequest({
                requestInfo: requestData,
                signer: {
                    type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
                    value: address as string,
                },
                paymentNetwork: paymentNetwork,
                contentData: invoice,
            });

            await request?.waitForConfirmation();

            return request;
        } catch (error) {
            console.error('Create Request Error', error);
            throw new Error('Create Request Error');
        }
    };

    const getRequest = async (requestId: string): Promise<Request> => {
        if (!requestId) throw new Error('Get Request: Request ID is required');

        try {
            const request = await requestNetwork?.fromRequestId(requestId);
            return request;
        } catch (error) {
            console.error('Get Request Error', error);
            throw new Error('Get Request Error');
        }
    };

    const payRequest = async (requestId: string, amount: BigNumber): Promise<void> => {
        if (!requestId) throw new Error('Pay Request: Request ID is required');
        if (!amount) throw new Error('Pay Request: Amount is required');

        try {
            const request = await requestNetwork.fromRequestId(requestId);
            const requestData = request.getData();

            const res = await pay(
                requestData,
                signer,
                amount,
                {
                    gasLimit: 1000000,
                }
            )

            const receipt = await res.wait();
        } catch (error) {
            console.error('Pay Request Error', error);
            throw new Error('Pay Request Error');
        }
    };

    const calulatePaymentReference = async (requestId: string): Promise<string> => {
        if (!requestId) throw new Error('Calculate Payment Reference: Request ID is required');

        try {
            const request = await requestNetwork.fromRequestId(requestId);
            const salt = request.getData().extensions[Types.Extension.PAYMENT_NETWORK_ID.ETH_FEE_PROXY_CONTRACT].values.salt
            const paymentAddress = request.getData().extensions[Types.Extension.PAYMENT_NETWORK_ID.ETH_FEE_PROXY_CONTRACT].values.paymentAddress

            return PaymentReferenceCalculator.calculate(
                requestId,
                salt,
                paymentAddress,
            );
        } catch (error) {
            console.error('Calculate Payment Reference Error', error);
            throw new Error('Calculate Payment Reference Error');
        }
    }
    return {
        createRequest,
        getRequest,
        payRequest,
        requestNetwork,
        calulatePaymentReference,
    };
};