import { useMemo } from 'react';

import {
    payRequest,
} from '@requestnetwork/payment-processor';
import { validateRequest } from '@requestnetwork/payment-processor/dist/payment/utils';
import { RequestNetwork, Types } from '@requestnetwork/request-client.js';
import {
    type ClientTypes,
    ExtensionTypes,
    type PaymentTypes,
} from '@requestnetwork/types';
import { Web3SignatureProvider } from '@requestnetwork/web3-signature';
import { BigNumber } from 'ethers';
import { useAccount, useWalletClient } from 'wagmi';

type RequestNetworkHook = {
    createRequest: (request: Types.IRequestData) => Promise<Types.IRequestData>;
    getRequest: (requestId: string) => Promise<Types.IRequestData>;
    payRequest: (requestId: string, amount: BigNumber) => Promise<void>;
    data: {
        signatureProvider: Web3SignatureProvider;
        client: RequestNetwork;
    }
};

export const useRequestNetwork = (): RequestNetworkHook => {
    const { data: walletClient } = useWalletClient();
    const { address } = useAccount();

    const signatureProvider = new Web3SignatureProvider({
        client,
        account,
    });

    const createRequest = async (request: Types.IRequestData): Promise<Types.IRequestData> => {
        const requestNetwork = new RequestNetwork({
            signatureProvider,
        });

        const requestData = await requestNetwork.createRequest({
            requestInfo: request,
            signer: account,
        });

        return requestData;
    };

    const getRequest = async (requestId: string): Promise<Types.IRequestData> => {
        const requestNetwork = new RequestNetwork({
            signatureProvider,
        });

        const requestData = await requestNetwork.getRequestFromId(requestId);

        return requestData;
    };

    const payRequest = async (requestId: string, amount: BigNumber): Promise<void> => {
        const requestNetwork = new RequestNetwork({
            signatureProvider,
        });

        await requestNetwork.payRequest({
            requestId,
            amount,
            signer: account,
        });
    };

    return {
        createRequest,
        getRequest,
        payRequest,
        data: {
            signatureProvider,
            client,
        },
    };
};