import { classNames } from '@/common/helpers';
import { useDetectIsMobileView } from '@/hooks/useDetectIsMobileView';
import { useFetchPage } from '@/hooks/useFetchPages';
import { useRouter } from 'next/router';
import { mapCategoryToValue } from 'pages/posts';
import React, { useMemo, useState } from 'react';
import VRBText from '../../react-bricks/bricks/atoms/VRBText';
import VRBTitle from '../../react-bricks/bricks/atoms/VRBTitle';
import { Banner } from '../atoms/Banner';
import { VLabel } from '../atoms/VLabel';
import { VText } from '../atoms/VText';
import { VTitle } from '../atoms/VTitle';

export interface IBlogHeroProps {
  title?: string;
  imgSrc?: string;
  bgColor?: string;
  canEdit?: boolean;
  className?: string;
  currentPage?: string;
  backgroundFit?: 'cover' | 'contain' | 'fill' | 'none';
}

export const BlogHero: React.FC<IBlogHeroProps> = ({ title, imgSrc, currentPage, canEdit, className, backgroundFit}) => {
  const router = useRouter();
  const { slug } = router.query;
  const { data, isLoading, error } = useFetchPage({slug: slug?.toString() || currentPage});
  const { isMobileView } = useDetectIsMobileView();

  return(
    <Banner roundedSide='right' objectFit={backgroundFit} className={className} imageSrc={imgSrc ? imgSrc : data?.meta?.image?.src || ''}>
      {canEdit || typeof(title) !== 'string' ? <VRBTitle textAlign='left' type={isMobileView ? 'h4' : 'h3'} propName='title' ></VRBTitle> : <VTitle type={isMobileView ? 'h4' : 'h3'}>{data?.meta?.title}</VTitle>}
       {data?.customValues?.category && <div className='flex items-center gap-vsm'>
        <VLabel>{mapCategoryToValue(data.customValues.category)}</VLabel>
        <VText size='md'>{data.publishedAt && new Date(data.publishedAt).toLocaleTimeString("en-US", {weekday: 'short', year: 'numeric', month: 'short', day:'numeric'})}</VText>
      </div>}
    </Banner>
  )
}
