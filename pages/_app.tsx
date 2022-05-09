import React, { useEffect, useState } from 'react'
import { ReactBricks } from 'react-bricks/frontend'
import type { AppProps } from 'next/app'
import config from '../react-bricks/config'

import '../css/styles.css'
import { useDarkMode } from '../hooks/useDarkMode'
import { ThemeProvider } from '../common/providers/ThemeProvider'

const Init = ({Component, pageProps}) => {
  const {isDarkMode, toggleMode} = useDarkMode();

  useEffect(() => {
    const html = document.querySelector("html");
    console.log('isdarkmode', isDarkMode);
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

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <Init Component={Component} pageProps={pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
