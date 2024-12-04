export default {
    APP_NAME: 'PayChunk',
    APP_DESCRIPTION: 'Invoicing payment sharing platform on Request network technology',
    APP_URL: 'http://localhost:3000',
    APP_ICONS: ['/logo.svg'],
    APP_VERIONS: {
        mainnet: '1.0.0',
        sepolia: '1.0.0',
    },
    APP_NETWORKS: {
        mainnet: 'Mainnet',
        sepolia: 'Sepolia',
    },
    APP_API_KEY: {
        walletConnect: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
    }
}