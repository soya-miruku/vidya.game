import { classNames } from '@/common/helpers';
import { useDetectIsMobileView } from '@/hooks/useDetectIsMobileView';
import { useFetchPage } from '@/hooks/useFetchPages';
import { useRouter } from 'next/router';
import { mapCategoryToValue } from 'pages/posts';
import React, { useEffect, useMemo, useState } from 'react';
import VRBText from '../../react-bricks/bricks/atoms/VRBText';
import VRBTitle from '../../react-bricks/bricks/atoms/VRBTitle';
import { Banner } from '../atoms/Banner';
import { VText } from '../atoms/VText';
import { VTitle } from '../atoms/VTitle';

export interface ISmallHeroProps {
  title?: string;
  description?: string;
  imgSrc?: string;
  canEdit?: boolean;
  className?: string;
  backgroundFit?: 'cover' | 'contain' | 'fill' | 'none';
  roundedSide?: 'left' | 'right' | 'none';
}

export const SmallHero: React.FC<ISmallHeroProps> = ({ roundedSide, title, description, imgSrc, canEdit, className, backgroundFit}) => {
  const { isMobileView } = useDetectIsMobileView();

  return(
    <Banner roundedSide={roundedSide} objectFit={backgroundFit} className={className} imageSrc={imgSrc}>
      <div className={classNames((!title || !description) ? 'w-full' : 'w-auto', 'flex flex-col', 'justify-end items-end text-right')}>
        <VRBTitle textAlign='left' type={isMobileView ? 'h4' : 'h3'} propName='small-hero-title'></VRBTitle>
        <VRBText textAlign='left' propName='small-hero-desc' size='md'/>
      </div>
    </Banner>
  )
}
