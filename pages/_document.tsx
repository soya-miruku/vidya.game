import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html id='root_html' lang="en" className='dark'>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital@0;1&display=swap" rel="stylesheet"/>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Saira+Semi+Condensed:ital,wght@0,400;0,600;0,700;0,900;1,400&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,600;0,700;0,900;1,400&display=swap" rel="stylesheet"/>
      </Head>
      <body className='bg-light-200 dark:bg-dark-200 transition-colors duration-500'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}