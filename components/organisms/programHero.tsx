import { classNames } from '@/common/helpers';
import React from 'react';
import VRBImage from '../../react-bricks/bricks/atoms/VRBImage';
import VRBText from '../../react-bricks/bricks/atoms/VRBText';
import VRBTitle from '../../react-bricks/bricks/atoms/VRBTitle';
import { VImage } from '../atoms/VImage';
import { VMouseIcon } from '../atoms/VMouseIcon';
import { VText } from '../atoms/VText';
import { VTitle } from '../atoms/VTitle';

export interface IProgramHeroProps {
  pageTitle?: string;
  pageDescription?: string;
  image?: string;
  canEdit?: boolean;
}

export const ProgramHero: React.FC<IProgramHeroProps> = ({pageTitle, pageDescription, image, canEdit}) => {
  return (
    <div className="w-full h-full prose flex flex-col justify-center items-center space-y-4 py-12">
      <div className='absolute'>
        {canEdit || typeof(pageTitle) !== 'string' ? <VRBTitle className='dark:text-dark-300 text-light-300' type='title' propName='pageTitle' ></VRBTitle> : <VTitle className='dark:text-dark-300 text-light-300' type='title'>{pageTitle}</VTitle>}
      </div>
      <div className='flex justify-center items-center w-fullh h-full'>
        <div className='sm:w-[244.5px] sm:h-[300px] w-[123px] h-[180px] relative'>
          {canEdit ? <VRBImage propName='image' containerClassName='w-full h-full' imageWidth="100%" imageHeight="100%"/> : <VImage src={image} width="100%" height="100%" objectFit='cover' layout='fill' 
          alt='image' className={classNames('w-full h-full')}/>}
        </div>
      </div>
      {canEdit || typeof(pageDescription) !== 'string' ? <VRBText size='lg' propName='pageDescription' ></VRBText> : <VText size='lg'>{pageDescription}</VText>}
      <VMouseIcon className='py-2'/>
    </div>
  )
} 