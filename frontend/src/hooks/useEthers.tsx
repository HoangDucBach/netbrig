import { useMemo } from 'react';

import type { Account, Chain, Client, Transport } from 'viem';
import { providers } from 'ethers';
import { useClient, useConnectorClient } from 'wagmi';

type EthersHook = {
    provider: providers.JsonRpcProvider | undefined;
    signer: providers.JsonRpcSigner | undefined;
}

export const clientToProvider = (client: Client<Transport, Chain>): providers.JsonRpcProvider => {
    const { chain, transport } = client;
    const network = {
        chainId: chain.id,
        name: chain.name,
    };

    if (transport.type !== 'rpc') {
        throw new Error('Unsupported transport type');
    }

    return new providers.JsonRpcProvider(transport.url, network);
}

export const clientToSigner = (client: Client<Transport, Chain, Account>): providers.JsonRpcSigner => {
    const { account, chain, transport } = client;
    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
    };

    if (transport.type !== 'rpc') {
        throw new Error('Unsupported transport type');
    }

    return new providers.JsonRpcProvider(transport.url, network).getSigner(account.address);
}

export const useEthers = ({ chainId }: { chainId?: number } = {}): EthersHook => {
    const client = useClient({ chainId });
    const { data: signerClient } = useConnectorClient({ chainId });

    const provider = useMemo(() => client && clientToProvider(client), [client]);
    const signer = useMemo(() => signerClient && clientToSigner(signerClient), [signerClient]);

    return { provider, signer };
};