import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import {
  fetchPages,
  types,
} from 'react-bricks/frontend'
import { GetStaticProps } from 'next'
import config from '../react-bricks/config'
import Layout from '@/components/layout'
import { VTitle } from '@/components/atoms/VTitle'
import { PageViewSize } from '@/components/atoms/PageViewSize'
import { classNames, getPageUrlByType } from '@/common/helpers'
import { VText } from '@/components/atoms/VText'
import { VImage } from '@/components/atoms/VImage'
import { VLabel } from '@/components/atoms/VLabel'
import { FeatureCard } from '@/components/molecules/FeatureCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpRightFromSquare } from '@fortawesome/pro-light-svg-icons'


export interface IBlogProps {
  posts: types.Page[]
}

const Blog: React.FC<IBlogProps> = ({ posts }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const rawCategories = (posts || []).reduce((acc, post) => {
      if (post.customValues.category && !acc.includes(post.customValues.category)) {
        acc.push(post.customValues.category)
      }
      return acc
    }, [])

    setCategories(['all', ...rawCategories])

  }, [JSON.stringify(posts)]);

  return (
    <Layout displayCallout={false} useDarkFonts={true}>
      <div className='w-full h-full prose'>
        <Head>
          <title>{'blog'}</title>
          <meta name="description" content={'read all our posts here!'} />
        </Head>
          <div className='flex justify-center items-start h-full'>
            <PageViewSize enabled className='flex flex-col w-full !justify-start items-start mt-[120px] h-auto sm:p-vmd p-[5px] !max-w-[1290px]'>
              <div className='w-full h-56 relative'>
                <div className='bg-accent-dark-100 w-full h-52 sm:rounded-3xl rounded-0 flex justify-center items-center dark:shadow-btn-dark shadow-btn-light' style={{
                  backgroundImage: 'url(/aimbots/armoursets.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: '0% 10%',
                  backgroundRepeat: 'no-repeat',
                  backgroundBlendMode: 'multiply',
                  
                }}>
                  <div className='flex flex-col justify-center w-full items-center '>
                    <VTitle className='font-roboto' type='h2' overrideTextColor>Blog</VTitle>
                    <div className='absolute bottom-0 sm:w-1/2 w-[80%]'>
                      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                      </div>
                      <input type="search" id="default-search" className="block font-saria uppercase text-dark-200 text-body outline-none rounded-xl px-vsm py-vmd pl-10 bottom-0 w-full dark:shadow-btn-dark shadow-btn-light border-[1px] border-gray-100" placeholder="Search..." required/>
                      {/* <input placeholder='search...' className='font-saria uppercase text-dark-200 text-body outline-none rounded-xl px-vsm py-vmd absolute bottom-0 w-1/3 shadow-btn-light border-[1px] border-gray-100'></input> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-full flex gap-vsm justify-center pt-vmd flex-wrap'>
                {categories.map((category, index) => {
                  return (
                    <button 
                      onClick={() => setSelectedCategoryIndex(index)}
                      className={classNames('p-vsm px-vmd min-w-[100px] uppercase rounded-3xl transition-all duration-200', selectedCategoryIndex === index ? 'bg-accent-dark-200 dark:shadow-btn-dark shadow-btn-light' : 'hover:bg-accent-dark-700')} 
                      key={category}>
                        <VText size='md' overrideTextColor={selectedCategoryIndex === index}>{category}</VText>
                    </button>
                  )
                })}
              </div>
              <div className='w-full flex flex-col gap-[120px] pt-vxl justify-center items-center'>
                {selectedCategoryIndex === 0 && 
                  <div className='w-full h-auto flex sm:flex-row flex-col gap-vxl justify-center items-center'>
                    <div className='relative sm:w-1/2 w-full sm:h-[500px] h-[250px] rounded-2xl'>
                      <VImage className='rounded-2xl' src={posts?.[0].meta?.image?.src} layout='fill' objectFit='cover'></VImage>
                    </div>
                    <div className='flex h-full justify-between sm:w-1/2 w-full flex-col gap-vmd'>
                      <div className='flex flex-col pt-vsm items-start gap-vsm'>
                        <VLabel className='uppercase' >{posts?.[0]?.customValues?.category}</VLabel>
                        <VTitle type='h3'>{posts?.[0]?.meta?.title}</VTitle>
                        <VText size='lg'>{posts?.[0]?.meta?.description?.slice(0, 250)}...</VText>
                      </div>
                      <div className='flex justify-start items-center gap-vsm'>
                        <VImage className='rounded-full' src={posts?.[0]?.author?.avatarUrl} width={50} height={50}></VImage>
                        <div className='flex flex-col justify-start items-start'>
                          <VText size='md'>{posts?.[0]?.author.firstName}</VText>
                          <VText  className='opacity-80' size='sm'>{posts?.[0]?.publishedAt && new Date(posts?.[0]?.publishedAt).toLocaleDateString()}</VText>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                <div className='flex justify-center items-center w-full h-full gap-vsm flex-wrap'>
                  {posts.map((post, index) => {
                    
                    if (selectedCategoryIndex === 0 || post.customValues.category === categories[selectedCategoryIndex]) {
                      if(selectedCategoryIndex === 0 && index === 0) return null;
                      return (
                        <div className='group w-auto flex flex-col justify-center items-center hover:brightness-150 relative' key={index}>
                          <button onClick={() => window.open(getPageUrlByType(post.type, post.slug), '_self')} className='hidden hover:cursor-pointer group-hover:flex rounded-full shadow-btn-dark bg-accent-dark-200/80 w-24 h-24 absolute z-[10] top-0 bottom-0 m-auto justify-center items-center'>
                            <FontAwesomeIcon width={42} height={42} icon={faUpRightFromSquare}></FontAwesomeIcon>
                          </button>
                          <FeatureCard flipOrder trimText fullWidth bordered={false} label={post.customValues.category} title={post.meta.title} subtitle={post.meta.description} image={post.meta.image.src} objectFit='cover'></FeatureCard>
                        </div>)
                    }
                  }
                  )}
                </div>
              </div>
              <div className='h-52'>

              </div>
            </PageViewSize>
          </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (!config.apiKey) {
    return { props: { error: 'NOKEYS' } }
  }

  try {
    const posts = await fetchPages(config.apiKey, {type: 'post'})
    return { props: { posts } }
  } catch {
    return { props: { error: 'fetch failed' } }
  }
}

export default Blog