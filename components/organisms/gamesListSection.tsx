import { getPageUrlByType } from '@/common/helpers';
import { IFetchPropPages, useFetchPages } from 'hooks/useFetchPages';
import React from 'react';
import { GameCard } from '../molecules/GameCard';
import { ProgramCard } from '../molecules/ProgramCard';

export const GamesListSection: React.FC<IFetchPropPages> = ({limit=3}) => {
  const {data, isLoading, error} = useFetchPages({type: 'game', limit});
  
  if(isLoading) {
    return <div>Loading...</div>
  }

  if(error) {
    return <div>Error...</div>
  }

  return (
    <div className='flex gap-4 flex-wrap justify-center items-center py-[30px]'>
      {(data || []).map((post, index) => {
        return (
          <GameCard key={`${post.slug}_${index}`} label={post.customValues?.label} url={getPageUrlByType(post.type, post.slug)} image={post.meta?.featuredImage} title={post.meta.title} subtitle={post.meta.description} />
        )
      })}
    </div>
  )
}