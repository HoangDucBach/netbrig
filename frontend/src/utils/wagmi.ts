
import { mainnet, sepolia } from 'wagmi/chains';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import constants from './constants';

export const projectId = constants.APP_API_KEY.walletConnect;

const wagmiAdapter = new WagmiAdapter({
    networks: [mainnet, sepolia],
    projectId,
});

export default wagmiAdapter;