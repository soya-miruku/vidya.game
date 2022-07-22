import React from 'react'
import {
  fetchPage,
  types,
} from 'react-bricks/frontend'
import { GetStaticProps } from 'next'
import config from '../react-bricks/config'
import { EntryPage } from '@/components/entryPage'

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
  return (
    <EntryPage page={page} error={error}/>
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
