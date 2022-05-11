import React, { useContext, useEffect } from 'react'
import {
  ReactBricksContext,
  PageViewer,
  fetchPage,
  cleanPage,
  types,
} from 'react-bricks/frontend'
import Head from 'next/head'
import { GetStaticProps } from 'next'

import config from '../react-bricks/config'
import Layout from '../components/layout'
import ErrorNoKeys from '../components/errorNoKeys'
import ErrorNoHomePage from '../components/errorNoHomePage'
import { useDarkMode } from '../hooks/useDarkMode'

interface PageProps {
  slug: string,
  name: string,
  active: boolean,
  url: string,
}

interface HomeProps {
  page: types.Page
  pages: Array<PageProps>
  error: string
}

const Home: React.FC<HomeProps> = ({ page, error }) => {
  const { pageTypes, bricks } = useContext(ReactBricksContext)
  const {isDarkMode, toggleMode} = useDarkMode();
  
  const pageOk = page ? cleanPage(page, pageTypes, bricks) : null

  return (
    <Layout displayCallout={true}>
      <div className='w-full h-full'>

      </div>
      {pageOk && (
        <>
          <Head>
            <title>{page.meta.title}</title>
            <meta name="description" content={page.meta.description} />
          </Head>
          <PageViewer page={pageOk} />
        </>
      )}
      {error === 'NOKEYS' && <ErrorNoKeys />}
      {error === 'NOPAGE' && <ErrorNoHomePage />}
    </Layout>
  )
}



export const getStaticProps: GetStaticProps = async (context) => {
  if (!config.apiKey) {
    return { props: { error: 'NOKEYS' } }
  }
  try {
    // const pagesResult = await fetchPages(config.apiKey, {types: ['program', 'about', 'game']});
    // const groupedPages = groupByKey(pagesResult, 'type', {omitKey: false});
    // const pages = Object.keys(groupedPages).map(type => {
    //   return {
    //     type,
    //     pages:  groupedPages[type].map(pl => {
    //       return {
    //         slug: pl.slug,
    //         name: pl.name,
    //         url: '/' + pl.slug,
    //         type: pl.type
    //       }
    //     })
    //   };
    // });

    const page = await fetchPage('home', config.apiKey, context.locale)
    return { props: { page } }
  } catch {
    return { props: { error: 'NOPAGE' } }
  }
}

export default Home
