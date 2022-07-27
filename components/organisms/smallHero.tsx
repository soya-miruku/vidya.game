import { classNames } from '@/common/helpers';
import { useDetectIsMobileView } from '@/hooks/useDetectIsMobileView';
import { useFetchPage } from '@/hooks/useFetchPages';
import { useRouter } from 'next/router';
import { mapCategoryToValue } from 'pages/blog';
import React, { useMemo, useState } from 'react';
import VRBText from '../../react-bricks/bricks/atoms/VRBText';
import VRBTitle from '../../react-bricks/bricks/atoms/VRBTitle';
import { VLabel } from '../atoms/VLabel';
import { VText } from '../atoms/VText';
import { VTitle } from '../atoms/VTitle';

export interface ISmallHeroProps {
  title?: string;
  imgSrc?: string;
  bgColor?: string;
  canEdit?: boolean;
  className?: string;
  currentPage?: string;
  backgroundFit?: 'cover' | 'contain' | 'fill' | 'none';
}

export const SmallHero: React.FC<ISmallHeroProps> = ({ title, imgSrc, currentPage, canEdit, className, backgroundFit}) => {
  const router = useRouter();
  const { slug } = router.query;
  const { data, isLoading, error } = useFetchPage({slug: slug?.toString() || currentPage});
  const { isMobileView } = useDetectIsMobileView();

  if(isLoading || error) return null;

  // const post = useMemo(() => {

  // }, [])

  return(
    <div className='w-full h-full mt-[130px] py-vlrg flex flex-col gap-vmd'>
      <div className={
        classNames('w-[95%] dark:shadow-btn-dark shadow-btn-light rounded-tr-2xl rounded-br-2xl h-full sm:min-h-[500px] min-h-[225px] bg-gradient-to-b from-black/80 to-primary-100 bg-blend-multiply prose flex flex-col justify-end items-start',
         className)}
         style={{
          background: `url("${imgSrc ? imgSrc : data.meta.image.src}")`,
          // backgroundColor: 'rgb(101 26 183)',
          backgroundPosition: 'center center',
          backgroundSize: backgroundFit,
          backgroundRepeat: 'no-repeat',
         }}
         >
      </div>
      <div className='flex flex-col sm:w-1/2 w-full space-y-5 justify-start items-start sm:p-vmd p-vsm'>
        {canEdit || typeof(title) !== 'string' ? <VRBTitle textAlign='left' type={isMobileView ? 'h4' : 'h3'} propName='title' ></VRBTitle> : <VTitle type={isMobileView ? 'h4' : 'h3'}>{data.meta.title}</VTitle>}
        <div className='flex items-center gap-vsm'>
          <VLabel>{mapCategoryToValue(data.customValues.category)}</VLabel>
          <VText size='md'>{data.publishedAt && new Date(data.publishedAt).toLocaleTimeString("en-US", {weekday: 'short', year: 'numeric', month: 'short', day:'numeric'})}</VText>
        </div>
      </div>
    </div>
  )
}
