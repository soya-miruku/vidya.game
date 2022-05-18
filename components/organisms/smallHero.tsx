import { classNames } from '@/common/helpers';
import React, { useState } from 'react';
import VRBText from '../../react-bricks/bricks/atoms/VRBText';
import VRBTitle from '../../react-bricks/bricks/atoms/VRBTitle';
import { VText } from '../atoms/VText';
import { VTitle } from '../atoms/VTitle';

export interface ISmallHeroProps {
  title?: string;
  desc?: string;
  imgSrc?: string;
  bgColor?: string;
  canEdit?: boolean;
  className?: string;
}

export const SmallHero: React.FC<ISmallHeroProps> = ({ title, desc, imgSrc, canEdit, className}) => {
  return(
    <div className={classNames('w-full h-full min-h-[500px] bg-gradient-to-b from-black/80 to-primary-100 bg-blend-multiply prose flex flex-col justify-end items-start', className)}>
      <div className='flex flex-col relative mx-auto items-start w-full h-full space-y-4'>
        <div className='w-full h-full top-0 left-0 right-0 bottom-0 mx-auto'>
          <div className='bg-primary-100 mask' style={{width: '100%', height: '500px'}}>
            <div className='w-full h-full absolute' style={{
              zIndex: 100,
              background: `url("${imgSrc}")`,
              backgroundColor: 'rgb(101 26 183)',
              backgroundPosition: 'center center',
              objectFit: 'cover',
              backgroundBlendMode: 'multiply'
            }}></div>
            {/* <VImage src={imgSrc} width="100%" height="100%" objectFit='cover' layout='fill' alt='image' className='bg-primary-100 bg-blend-multiply'/> */}
          </div>
        </div>
        <div className='absolute mx-auto w-full h-full sm:px-16 px-2 sm:py-14 py-14'>
          <div className='flex flex-col h-full space-y-5 justify-end items-start'>
          {canEdit || typeof(title) !== 'string' ? <VRBTitle overrideTextColor type='h2' propName='title' ></VRBTitle> : <VTitle overrideTextColor={true} type='h2'>{title}</VTitle>}
          {canEdit || typeof(desc !== 'string') ? <VRBText overrideTextColor size='lg' propName='dec'></VRBText> :<VText overrideTextColor={true} size='lg'>{desc}</VText>}
       
          </div>
        </div>
      </div>
    </div>
  )
}
