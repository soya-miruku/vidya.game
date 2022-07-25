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
  overrideColor?:boolean
  canEdit?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  imageHeight?: string;
  imageWidth?: string;
}

export const ProgramHero: React.FC<IProgramHeroProps> = ({pageTitle, pageDescription, image, imageHeight='622px', imageWidth='489px', overrideColor, canEdit, objectFit}) => {
  return (
    <div className="w-full h-full prose flex flex-col justify-center items-center gap-y-vsm">
      <div className='absolute'>
        {canEdit || typeof(pageTitle) !== 'string' 
        ? <VRBTitle textAlign='center' className={classNames(overrideColor ? 'text-dark-300/80 dark:text-dark-300/80' : 'dark:text-dark-300/80 text-light-400/80')} type='title' propName='pageTitle'></VRBTitle> 
        : <VTitle className={classNames(overrideColor ? 'text-dark-300/80 dark:text-dark-300/80' : 'dark:text-dark-300/80 text-light-400/80')} type='title'>{pageTitle}</VTitle>}
      </div>
      <div className='flex justify-center items-center w-full h-full'>
        <div  style={{
          width: '63vw',
          height: '80vw',
          maxWidth: imageWidth,
          maxHeight: imageHeight,
        }} className='relative'>
          {canEdit ? <VRBImage propName='image' renderWrapper={({children}) => {
            return <div className="w-full h-full justify-center items-center flex">{children}</div>
          }} imageWidth="100%" imageHeight="100%"/> : <VImage src={image} alt={`${pageTitle} banner image`}  width="100%" height="100%" objectFit={objectFit} layout='fill' 
         className={classNames('w-full h-full flex justify-center items-center')}/>}
        </div>
      </div>
      {canEdit || typeof(pageDescription) !== 'string' 
      ? <VRBText textAlign='center' size='lg' propName='pageDescription' overrideTextColor={overrideColor}></VRBText> 
      : <VText size='lg' overrideTextColor={overrideColor}>{pageDescription}</VText>}
      <VMouseIcon className='py-2' overrideColor={overrideColor}/>
    </div>
  )
} 