import { getPageUrlByType } from '@/common/helpers';
import { IFetchPagesProps, useFetchPages } from 'hooks/useFetchPages';
import React from 'react';
import { GameCard } from '../molecules/GameCard';

export const GamesListSection: React.FC<IFetchPagesProps> = ({limit=3}) => {
  const {data, isLoading, error} = useFetchPages({type: 'game', limit});
  
  if(isLoading) {
    return <div>Loading...</div>
  }

  if(error) {
    return <div>Error...</div>
  }
  return (
    <div className='flex gap-vlrg flex-wrap justify-center items-center py-vxl'>
      {(data || []).map((post, index) => {
        return (
          <GameCard key={`${post.slug}_${index}`} label={post.customValues?.label} url={getPageUrlByType(post.type, post.slug)} placeholderSrc={post.meta?.image?.placeholderSrc} image={post.meta?.image?.src} title={post.meta.title} subtitle={post.meta.description} />
        )
      })}
    </div>
  )
}