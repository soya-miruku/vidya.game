import Link from 'next/link';
import { getPageUrlByType } from '@/common/helpers';
import { IFetchPagesProps, useFetchPages } from 'hooks/useFetchPages';
import { mapCategoryToValue } from 'pages/posts';
import React from 'react';
import { BlogCard } from '../molecules/BlogCard';

export const BlogListSection: React.FC<IFetchPagesProps> = ({limit=3}) => {
  const {data, isLoading, error} = useFetchPages({type: 'post', limit});

  if(isLoading) {
    return <div>Loading...</div>
  }

  if(error) {
    return <div>Error...</div>
  }

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <div className='flex gap-vlrg flex-wrap justify-center items-center py-vxl'>
        {(data || []).map((post, index) => {
          return (
            <BlogCard url={getPageUrlByType(post.type, post.slug)} 
            avatar={post.author.avatarUrl} 
            key={index} 
            image={post.meta?.image?.src}
            placeholderSrc={post.meta?.image?.placeholderSrc} 
            title={post.meta.title} 
            label={mapCategoryToValue(post.customValues?.category)} 
            subtitle={post.meta.description} 
            footer={post.publishedAt ? `${post.author.firstName} - ${new Date(post.publishedAt).toLocaleTimeString("en-US", {weekday: 'short', year: 'numeric', month: 'short', day:'numeric'})}` : ''} />
          )
        })}
      </div>
      <Link href='/posts'>
          <a className='text-accent-dark-200 uppercase'>
            See all posts
          </a>
        </Link>
   </div>
  )
}