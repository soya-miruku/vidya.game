import { getPageUrlByType } from '@/common/helpers';
import { IFetchPropPages, useFetchPages } from 'hooks/useFetchPages';
import React from 'react';
import { ProgramCard } from '../molecules/ProgramCard';

export const ProgramListSection: React.FC<IFetchPropPages> = ({limit=3}) => {
  const {data, isLoading, error} = useFetchPages({type: 'program', limit});
  
  if(isLoading) {
    return <div>Loading...</div>
  }

  if(error) {
    return <div>Error...</div>
  }

  return (
    <div className='flex  gap-4 flex-wrap justify-center items-center py-[30px]'>
      {(data || []).map((post, index) => {
        return (
          <ProgramCard key={`${post.slug}_${index}`} url={getPageUrlByType(post.type, post.slug)} image={post.meta?.featuredImage} title={post.meta.title} subtitle={post.meta.description} />
        )
      })}
    </div>
  )
}