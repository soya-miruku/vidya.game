import React, { useEffect, useState } from 'react'
import { ReactBricks } from 'react-bricks/frontend'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import config from '../react-bricks/config'

import { useDarkMode } from '../hooks/useDarkMode';
import { ThemeProvider } from '../common/providers/ThemeProvider';
import { UserProvider } from '../common/providers/UserProvider';

import '../css/styles.scss';

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
    contentClassName: `antialiased font-content ${isDarkMode ? 'dark' : 'light'} ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`,
  }

  return (
    <ReactBricks {...reactBricksConfig}>
      <Component {...pageProps} />
    </ReactBricks>
  )
}

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <UserProvider>
          <Init Component={Component} pageProps={pageProps} />
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default MyApp
