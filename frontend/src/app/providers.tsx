"use client";

import utils from "@/utils";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

interface Props extends React.PropsWithChildren<{}> { }

export default function Providers({ children }: Props) {
    return (
        <ChakraProvider value={defaultSystem}>
            <WagmiProvider config={utils.wagmi}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </WagmiProvider>
        </ChakraProvider>
    );
}