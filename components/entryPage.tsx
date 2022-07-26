import Head from 'next/head'

import { useDarkMode } from "@/hooks/useDarkMode";
import { useContext } from "react";
import { cleanPage, PageViewer, ReactBricksContext } from "react-bricks";
import ErrorNoKeys from './errorNoKeys';
import ErrorNoHomePage from './errorNoHomePage';
import Layout from './layout';

export const EntryPage = ({page, error}) => {
  const { pageTypes, bricks } = useContext(ReactBricksContext)  
  const pageOk = page ? cleanPage(page, pageTypes, bricks) : null
  const { isDarkMode } = useDarkMode();

  const firstElBgColorProp = pageOk?.content?.[0]?.props?.['bg']?.['color'];
  const firstElBgImageProp = pageOk?.content?.[0]?.props?.['bgImage'];
  
  const hasNoColorOrBg = (firstElBgImageProp && (firstElBgColorProp === 'transparent' || firstElBgColorProp === '#fff'));
  return (
    <Layout displayCallout={false} useDarkFonts={!isDarkMode && hasNoColorOrBg}>
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