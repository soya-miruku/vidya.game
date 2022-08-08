import dynamic from 'next/dynamic';
import { config } from "react-spring";
import { getPageUrlByType } from '@/common/helpers';
import SIZES from '@/common/static';
import { IFetchPagesProps, useFetchPages } from 'hooks/useFetchPages';
import React, { useState } from 'react';
import { ProgramCard } from '../molecules/ProgramCard';
import { useDrag } from 'react-use-gesture';
const Carousel = dynamic(() => import('react-spring-3d-carousel'), { ssr: false })

const CarouselV2 = Carousel as any;
export interface IProgramListSectionProps extends IFetchPagesProps {
  displayNumber?: number;
}

export const ProgramListSection: React.FC<IProgramListSectionProps> = ({limit=10, displayNumber=3}) => {
  const {data, isLoading, error} = useFetchPages({type: 'program', limit});
  const [goToSlide, setGoToSlide] = useState(0);
  
  const bind:any = useDrag(({ args: [index], active, movement: [mx], direction: [xDir], velocity }) => {
    const trigger = velocity > 0.1 // If you flick hard enough it should trigger the card to fly out
    const max = data?.length || 0;
    if (!active && trigger) {
      if(xDir === 1)  { //left
        if(goToSlide > 1) {
          setGoToSlide(goToSlide - 1);
        }
        else {
          setGoToSlide(max - 1);
        }
      }
      if(xDir === -1) { //right
        if(goToSlide < max) {
          setGoToSlide(goToSlide + 1);
        }
        else {
          setGoToSlide(0);
        }
      }
    } // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
  });
  
  const totalWidth = (SIZES.vsm * (displayNumber +1)) * .8;

  if(error) {
    return <div>Error...</div>
  }

  const placeholders = Array(5).fill(0).map((_, index) => {
    return {
      key: index,
      content: <ProgramCard key={`placeholder-${index}`} title={`Loading: ${index}`} subtitle="program loading..." image="/placeholders/img.png" />
    }
  });
  
  const slides = data && !isLoading ? data.map((post, index) => {
    return {
      key: index,
      content: <ProgramCard key={`${post.slug}_${index}`} url={getPageUrlByType(post.type, post.slug)} image={post.meta?.image?.src} placeholderSrc={post.meta?.image?.placeholderSrc} title={post.meta.title} subtitle={post.meta.description} />
    }
  }) : placeholders;

  const cards = slides.map((slide, index) => {
    return { ...slide, onClick: () => setGoToSlide(index) };
  });
  
  return (
    <div className='w-full h-[380px] py-vmd px-vmd border-[1px] mx-2 rounded-lgr border-light-300/20 backdrop-blur-sm' style={{maxWidth: totalWidth}} {...bind()}>
      <CarouselV2 slides={cards} goToSlide={goToSlide} showNavigation={false} offsetRadius={50} animationConfig={config.gentle}/>
    </div>
  )
}