import { getPageUrlByType } from '@/common/helpers';
import { IFetchPropPages, useFetchPages } from 'hooks/useFetchPages';
import React from 'react';
import { BlogCard } from '../molecules/BlogCard';

export const BlogListSection: React.FC<IFetchPropPages> = ({limit=3}) => {
  const {data, isLoading, error} = useFetchPages({type: 'post', limit});
  
  if(isLoading) {
    return <div>Loading...</div>
  }

  if(error) {
    return <div>Error...</div>
  }

  return (
    // <div className='w-full flex flex-col justify-center items-center'>
      <div className='flex gap-vlrg flex-wrap justify-center items-center py-vlrg'>
        {(data || []).map((post, index) => {
          return (
            <BlogCard url={getPageUrlByType(post.type, post.slug)} 
            avatar={post.author.avatarUrl} 
            key={index} 
            image={post.meta?.featuredImage} 
            title={post.meta.title} 
            label={post.customValues?.label} 
            subtitle={post.meta.description} 
            footer={post.publishedAt ? `${post.author.firstName} - ${new Date(post.publishedAt).toLocaleTimeString("en-US", {weekday: 'long', year: 'numeric', month: 'long', day:'numeric'})}` : ''} />
          )
        })}
      </div>
    // </div>
  )
}