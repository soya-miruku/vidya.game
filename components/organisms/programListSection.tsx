import dynamic from 'next/dynamic';
import { config } from "react-spring";

import { getPageUrlByType } from '@/common/helpers';
import SIZES from '@/common/static';
import { IFetchPropPages, useFetchPages } from 'hooks/useFetchPages';
import React, { useState } from 'react';
import { ProgramCard } from '../molecules/ProgramCard';
const Carousel = dynamic(() => import('react-spring-3d-carousel'), { ssr: false })

const CarouselV2 = Carousel as any;
export interface IProgramListSectionProps extends IFetchPropPages {
  displayNumber?: number;
}

export const ProgramListSection: React.FC<IProgramListSectionProps> = ({limit=10, displayNumber=3}) => {
  const {data, isLoading, error} = useFetchPages({type: 'program', limit});
  const [goToSlide, setGoToSlide] = useState(0);
  const totalWidth = (SIZES.vsm * (displayNumber +1)) * .8;
  if(isLoading) {
    return <div>Loading...</div>
  }

  if(error) {
    return <div>Error...</div>
  }

  let cards = (data && data.map((post, index) => {
    return {
      key: index,
      content: <ProgramCard key={`${post.slug}_${index}`} url={getPageUrlByType(post.type, post.slug)} image={post.meta?.featuredImage} title={post.meta.title} subtitle={post.meta.description} />
    }
  }) || []).map((slide, index) => {
    return { ...slide, onClick: () => setGoToSlide(index) };
  });
  
  
  return (
    <div className='w-full h-[380px] py-vmd px-vmd border-[1px] mx-2 rounded-lgr border-light-300/20 backdrop-blur-sm' style={{maxWidth: totalWidth}}>
      <CarouselV2 slides={cards} goToSlide={goToSlide} showNavigation={false} offsetRadius={50} animationConfig={config.gentle}/>
    </div>
    // <div className='flex gap-vlrg flex-wrap justify-center items-center py-vmd px-vmd border-2 rounded-lgr h-full' style={{
    //   maxWidth: totalWidth
    // }}>
    //   {(data || []).map((post, index) => {
    //     return (
    //       <ProgramCard key={`${post.slug}_${index}`} url={getPageUrlByType(post.type, post.slug)} image={post.meta?.featuredImage} title={post.meta.title} subtitle={post.meta.description} />
    //     )
    //   })}
    // </div>
  )
}