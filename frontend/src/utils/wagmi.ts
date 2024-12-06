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

const wagmiAdapter = new WagmiAdapter({
    networks: [mainnet, sepolia],
    projectId,
});

export default wagmiAdapter;