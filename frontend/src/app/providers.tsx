"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { cookieToInitialState, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import { headers } from "next/headers";
import utils from "@/utils";


const queryClient = new QueryClient()

interface Props extends React.PropsWithChildren<{}> { }
const initialState = cookieToInitialState(
    utils.wagmi,
    headers().get('cookie')
);

export default function Providers({ children }: Props) {
    return (
        <ChakraProvider value={defaultSystem}>
            <WagmiProvider config={utils.wagmi} initialState={initialState}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </WagmiProvider>
        </ChakraProvider>
    );
}