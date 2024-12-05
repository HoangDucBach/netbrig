import { useMemo } from 'react';

import {
    payRequest as pay,
} from '@requestnetwork/payment-processor';
import { validateRequest } from '@requestnetwork/payment-processor/dist/payment/utils';
import { Request, RequestNetwork, Types } from '@requestnetwork/request-client.js';
import {
    type ClientTypes,
    ExtensionTypes,
    type PaymentTypes,
} from '@requestnetwork/types';
import { Web3SignatureProvider } from '@requestnetwork/web3-signature';
import { BigNumber } from 'ethers';
import { useAccount, useWalletClient } from 'wagmi';
import { InvoiceType } from '@/types';
import { useEthers } from './useEthers';

type RequestNetworkHook = {
    createRequest: (
        requestData: ClientTypes.IRequestInfo,
        paymentNetwork: PaymentTypes.PaymentNetworkCreateParameters,
        invoice: InvoiceType | any,
    ) => Promise<Request>;
    getRequest: (requestId: string) => Promise<Request>;
    payRequest: (requestId: string, amount: BigNumber) => Promise<void>;
    requestNetwork: RequestNetwork;
};

export const useRequestNetwork = (): RequestNetworkHook => {
    const { data: walletClient } = useWalletClient();
    const { address } = useAccount();
    const { signer, provider } = useEthers();

    const requestNetwork = useMemo<RequestNetwork>(() => {
        if (!walletClient) {
            throw new Error('Wallet client is required');
        }
        
        const signatureProvider = new Web3SignatureProvider(walletClient);

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
        invoice: InvoiceType,
    ): Promise<Request> => {
        if (!requestData.payee) throw new Error('Create Request: Payee is required');
        if (!requestData.payer) throw new Error('Create Request: Payer is required');

        try {
            const request = await requestNetwork?.createRequest({
                requestInfo: requestData,
                signer: requestData.payee,
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
    
    return {
        createRequest,
        getRequest,
        payRequest,
        requestNetwork
    };
};