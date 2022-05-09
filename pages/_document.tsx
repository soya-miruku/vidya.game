import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className='dark'>
      <Head />
      <body className='dark:bg-true-dark-100 bg-true-light-100'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}