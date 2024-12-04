import {
    type Config,
    cookieStorage,
    createConfig,
    createStorage,
    http,
} from 'wagmi';
import { anvil, mainnet, sepolia } from 'wagmi/chains';
import { walletConnect } from 'wagmi/connectors';

import constants from './constants';
export const projectId = constants.APP_API_KEY.walletConnect;

const metadata = {
    name: constants.APP_NAME,
    description: constants.APP_DESCRIPTION,
    url: constants.APP_URL,
    icons: constants.APP_ICONS,
};

const wagmiConfig: Config = createConfig({
    chains: [mainnet, sepolia],
    ssr: true,
    storage: createStorage({
        storage: cookieStorage,
    }),
    connectors: [walletConnect({ projectId, metadata, showQrModal: false })],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http()
    },
});

export default wagmiConfig;