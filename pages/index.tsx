import React, { useContext, useRef } from 'react'
import {
  ReactBricksContext,
  PageViewer,
  fetchPage,
  fetchPages,
  cleanPage,
  types,
} from 'react-bricks/frontend'
import Head from 'next/head'
import { GetStaticProps } from 'next'

import config from '../react-bricks/config'
import Layout from '../components/layout'
import ErrorNoKeys from '../components/errorNoKeys'
import ErrorNoHomePage from '../components/errorNoHomePage'
import { groupByKey } from '@/common/helpers';

interface PageProps {
  slug: string,
  name: string,
  active: boolean,
  url: string,
}

interface HomeProps {
  page: types.Page
  pages: Array<PageProps>
  pageCategories?: any
  error: string
}

const Home: React.FC<HomeProps> = ({ page, pageCategories, error }) => {
  const { pageTypes, bricks } = useContext(ReactBricksContext)  
  const pageOk = page ? cleanPage(page, pageTypes, bricks) : null
  console.log(pageCategories);
  
  return (
    <Layout displayCallout={false} pageCategories={pageCategories}>
      {pageOk && (
        <div className='w-full h-full'>
          <Head>
            <title>{page.meta.title}</title>
            <meta name="description" content={page.meta.description} />
          </Head>
            <PageViewer page={pageOk}/>
        </div>
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
    // const pageCategories = Object.keys(groupedPages).map(type => {
    //   return {
    //     [type]: 
    //       groupedPages[type].map(p => {
    //         return {
    //           slug: p.slug,
    //           displayName: p.name,
    //           url: '/' + p.slug,
    //           type: p.type,
    //           active: p.status === 'PUBLISHED' || !p.tags.includes('inactive'),
    //         }
    //       })
    //   };
    // }).reduce((acc, curr) => {
    //   return {
    //     ...acc,
    //     ...curr
    //   }
    // });

    const page = await fetchPage('home', config.apiKey, context.locale)
    return { props: { page, pageCategories:{} } }
  } catch {
    return { props: { error: 'NOPAGE' } }
  }
}

export default Home
