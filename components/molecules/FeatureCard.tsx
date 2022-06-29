import { useDetectIsMobileView } from '@/hooks/useDetectIsMobileView';
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
  bordered?: boolean;
  size?: 'sm' | 'lg'
  canEdit?: boolean;
  onClick?: () => void;
}

export const FeatureCard: React.FC<IFeatureCardProps> = ({bordered=true, title, buttonText, secondaryBtn, primaryBtn, specialBtn, subtitle, image, onClick, size, canEdit}) => {
  const {isMobileView, isTabletView} = useDetectIsMobileView();

  return (
    <VItemContainer showBorder={bordered} widthSize={isMobileView || isTabletView ? 'vxl' : 'v2xl'} heightSize='v2xl'>
      <div className='flex flex-col flex-wrap gap-y-vsm p-vlrg justify-start items-start w-auto h-full'>
        <VTitle type='h4'>{title}</VTitle>
        <VText className='max-h-[60px] overflow-y-scroll scrollbar-track-rounded-full scrollbar-thin dark:scrollbar-thumb-light-300 scrollbar-thumb-dark-200' size='lg' weight='normal'>{subtitle}</VText>
        {buttonText && <VButton onClick={onClick} special={specialBtn} secondary={secondaryBtn} primary={primaryBtn}>{buttonText}</VButton>}
        <div style={{width: '100%', height: '218px', position: 'relative'}} className="w-full h-full rounded-vsm">
          <VImage src={image} width="100%" height="218px" objectFit='cover' layout='fill' alt='image' className='w-full h-full rounded-sm'/>
        </div>
      </div>
    </VItemContainer>
  )
}