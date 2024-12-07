"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import { mainnet, sepolia } from "viem/chains";

import { ColorModeProvider } from "@/components/ui/color-mode"
import utils from "@/utils";
import wagmiAdapter, { projectId } from "@/utils/wagmi";
import system from "@/theme"

const queryClient = new QueryClient()


const metadata = {
    name: utils.constants.APP_NAME,
    description: utils.constants.APP_DESCRIPTION,
    url: utils.constants.APP_URL,
    icons: utils.constants.APP_ICONS,
};

createAppKit({
    adapters: [utils.wagmi],
    defaultNetwork: sepolia,
    networks: [mainnet, sepolia],
    metadata,
    projectId,
    features: {
        analytics: true,
        allWallets: true,
    },
})

interface Props extends React.PropsWithChildren { }
export default function Providers({ children }: Props) {
    return (
        <ChakraProvider value={system}>
            <ColorModeProvider forcedTheme="dark">
                <WagmiProvider config={wagmiAdapter.wagmiConfig}>
                    <QueryClientProvider client={queryClient}>
                        {children}
                    </QueryClientProvider>
                </WagmiProvider>
            </ColorModeProvider>
        </ChakraProvider>
    );
}