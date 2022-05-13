import React from 'react';
import { VButton } from '../atoms/VButton';
import { VImage } from '../atoms/VImage';
import { VItemContainer } from '../atoms/VItemContainer';
import { VText } from '../atoms/VText';
import { VTitle } from '../atoms/VTitle';

export interface IFeatureCardProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  primaryBtn?: boolean;
  secondaryBtn?: boolean;
  specialBtn?: boolean;
  image?: string;
}

export const FeatureCard: React.FC<IFeatureCardProps> = ({title, buttonText, secondaryBtn, primaryBtn, specialBtn, subtitle, image}) => {
  return (
    <VItemContainer showBorder={true} widthSize="v2xl" heightSize='v2xl'>
      <div className='flex flex-wrap space-y-4 p-8 justify-start items-start'>
        <VTitle type='h4'>{title}</VTitle>
        <VText className='min-h-[52px] max-h-[52px]  overflow-y-scroll scrollbar-track-rounded-full scrollbar-thin dark:scrollbar-thumb-true-light-300 scrollbar-thumb-true-dark-200' size='lg' weight='normal'>{subtitle}</VText>
        {buttonText && <VButton special={specialBtn} secondary={secondaryBtn} primary={primaryBtn}>{buttonText}</VButton>}
        <div style={{width: '100%', height: '218px', position: 'relative'}} className="w-full h-full rounded-[10px]">
          <VImage src={image} width="100%" height="100%" objectFit='cover' layout='fill' alt='image' className='w-full h-full rounded-[10px]'/>
        </div>
      </div>
    </VItemContainer>
  )
}