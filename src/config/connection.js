import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { celo, celoAlfajores, defineChain } from "@reown/appkit/networks";





const projectId =import.meta.env.VITE_APPKIT_PROJECT_ID;

// set network

// const crossFiTestnet = defineChain({});



//  Create a metadata object - optional
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com', 
  icons: ['https://avatars.mywebsite.com/']
}



// Create a AppKit instance
export const appkit = createAppKit({
  adapters: [new EthersAdapter()],
  networks: [celoAlfajores],
  chainImages: {
    [celo.id]: "https://cryptologos.cc/logos/celo-celo-logo.png?v=040",
  },
  metadata,
  projectId,
  allowUnsupportedChain: false,
  allWallets: "SHOW",
  defaultNetwork: celoAlfajores,
  enableEIP6963: true,
  themeVariables: {
    "--w3m-color-mix": "#1c1917",
    "--w3m-accent": "#00000000",
    "--w3m-color-mix-strength": 40,
    "--wcm-accent-color": "#FFFFFF",
    "--w3m-border-radius-master":"none"
  },
  themeMode: "dark",
  features: {
    analytics: true,
    allWallets: true,
    email: false,
    socials: [],
  },
});

