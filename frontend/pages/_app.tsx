import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { configureChains, createClient, WagmiConfig } from "wagmi";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import {
  localhost,
  mainnet,
  polygon,
  optimism,
  arbitrum,
  goerli,
  polygonMumbai,
  optimismGoerli,
  arbitrumGoerli,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { type ReactElement } from "react";
import { type AppProps } from "next/app";
import { Layout } from "@/components/common/layout";

const { chains, provider } = configureChains(
  [
    localhost,
    mainnet,
    goerli,
    polygon,
    polygonMumbai,
    optimism,
    optimismGoerli,
    arbitrum,
    arbitrumGoerli,
  ],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "upfront",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export { WagmiConfig, RainbowKitProvider };
function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        modalSize="compact"
        initialChain={goerli}
        chains={chains}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
