import React from 'react'
import {
  fetchPage,
  fetchPages,
} from 'react-bricks/frontend'
import { GetStaticProps, GetStaticPaths } from 'next'
import config from '../../react-bricks/config'
import { pageNames } from '@/common/pageNames'
import { PageProps } from '@/common/pageProps'
import { EntryPage } from '@/components/entryPage'


const ProgramPage: React.FC<PageProps> = ({ page, error }) => {
  return (
    <EntryPage page={page} error={error}/>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (!config.apiKey) {
    return { props: { error: 'NOKEYS' } }
  }

  const { slug } = context.params

  try {
    const page = await fetchPage(slug.toString(), config.apiKey, context.locale)
    return { props: { page } }
  } catch {
    return { props: { error: 'NOPAGE' } }
  }
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  if (!config.apiKey) {
    return { paths: [], fallback: false }
  }

  const allPages = await fetchPages(config.apiKey)
  const paths = allPages
    .filter((page) => page.type === pageNames.PROGRAM.name)
    .map((page) =>
      page.translations
        .filter(
          (translation) => context.locales.indexOf(translation.language) > -1
        )
        .map((translation) => ({
          params: { slug: translation.slug },
          locale: translation.language,
        }))
    )
    .flat()

  return { paths, fallback: false }
}

export default ProgramPage
