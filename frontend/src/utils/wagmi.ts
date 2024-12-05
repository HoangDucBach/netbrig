import {
    type Config,
    cookieStorage,
    createConfig,
    createStorage,
    http,
} from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { walletConnect } from 'wagmi/connectors';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

import constants from './constants';
export const projectId = constants.APP_API_KEY.walletConnect;

const metadata = {
    name: constants.APP_NAME,
    description: constants.APP_DESCRIPTION,
    url: constants.APP_URL,
    icons: constants.APP_ICONS,
};

const wagmiAdapter = new WagmiAdapter({
    networks: [anvil, mainnet, sepolia],
});

export default wagmiConfig;