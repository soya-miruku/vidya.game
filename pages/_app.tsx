import React, { useEffect } from 'react'
import { ParallaxProvider } from 'react-scroll-parallax';
import { ReactBricks } from 'react-bricks/frontend'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import config from '../react-bricks/config'

import { useDarkMode } from '../hooks/useDarkMode';
import { ThemeProvider } from '../common/providers/ThemeProvider';
import { UserProvider } from '../common/providers/UserProvider';
import { getDefaultProvider } from 'ethers'

import '../css/styles.scss';
import { DAppProvider, Mainnet, Ropsten, Rinkeby, Goerli, Kovan, Config } from '@usedapp/core'
import { TokenListProvider } from '@/common/providers/TokenListProvider'
import { GeneratorProvider } from '@/common/providers/GeneratorProvider'

const Init = ({Component, pageProps}) => {
  const {isDarkMode, toggleMode} = useDarkMode();

  useEffect(() => {
    const html = document.querySelector("html");
    if (isDarkMode) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  
  }, [isDarkMode]);

  const reactBricksConfig = {
    ...config,
    isDarkColorMode: isDarkMode,
    toggleColorMode: toggleMode,
    contentClassName: `antialiased w-full h-full font-content ${isDarkMode ? 'dark' : 'light'} ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`,
  }
  return (
    <ParallaxProvider>
      <ReactBricks {...reactBricksConfig}>
        <Component {...pageProps}/>
      </ReactBricks>
    </ParallaxProvider>
  )
}

const queryClient = new QueryClient();
const dappConfig: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: process.env.alchemyApiKey ? `https://eth-mainnet.alchemyapi.io/v2/${process.env.alchemyApiKey}` : getDefaultProvider('mainnet'),
    // [Ropsten.chainId]: process.env.infuraId ? `https://ropsten.infura.io/v3/${process.env.infuraId}` : getDefaultProvider('ropsten'),
    // [Rinkeby.chainId]: getDefaultProvider('rinkeby'),
    [Goerli.chainId]: process.env.goerliAlchemyApiKey ? `https://eth-goerli.g.alchemy.com/v2/${process.env.goerliAlchemyApiKey}`  : getDefaultProvider('goerli'),
    // [Kovan.chainId]: getDefaultProvider('kovan'),
  },
  refresh: 'everyBlock',
  fastMulticallEncoding: true
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <DAppProvider config={dappConfig}>
        <ThemeProvider>
          <TokenListProvider>
            <UserProvider>
              <GeneratorProvider>
                <Init Component={Component} pageProps={pageProps} />
              </GeneratorProvider>
            </UserProvider>
          </TokenListProvider>
        </ThemeProvider>
      </DAppProvider>
    </QueryClientProvider>
  )
}

export default MyApp
