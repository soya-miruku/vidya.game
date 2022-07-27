import { classNames } from '@/common/helpers';
import { useDetectIsMobileView } from '@/hooks/useDetectIsMobileView';
import React from 'react';
import { VButton } from '../atoms/VButton';
import { VImage } from '../atoms/VImage';
import { VItemContainer } from '../atoms/VItemContainer';
import { VLabel } from '../atoms/VLabel';
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
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  minTextHeight?: number;
  fullWidth?: boolean;
  trimText?: boolean;
  flipOrder?: boolean;
  label?: string;
  footer?: any
}

export const FeatureCard: React.FC<IFeatureCardProps> = ({bordered=true, footer, label, flipOrder, title, trimText, fullWidth, buttonText, secondaryBtn, primaryBtn, specialBtn, subtitle, image, onClick, objectFit, size, canEdit}) => {
  const {isMobileView, isTabletView} = useDetectIsMobileView();

  return (
    <VItemContainer innerClassName='!p-0' showBorder={bordered} widthSize={isMobileView || isTabletView ? 'vxl' : fullWidth ? 'v1xl' : 'v2xl'} heightSize='full'>
      <div className={classNames('flex flex-wrap gap-y-vsm p-vmd justify-start items-start h-full', flipOrder ? 'flex-col-reverse' : 'flex-col', fullWidth ? 'w-full' : ' w-auto')}>
        {!flipOrder && label && <VLabel>{label}</VLabel>}
        {!flipOrder && <VTitle type='h4'>{title.slice(0, 18)} {title?.length > 17 ? '...' : ''}</VTitle>}
        <VText className='max-h-[145px] min-h-[105px] overflow-y-scroll scrollbar-track-rounded-full scrollbar-thin dark:scrollbar-thumb-light-300 scrollbar-thumb-dark-200' size='lg' weight='normal'>
          {trimText ? subtitle.slice(0, 120) + '...' : subtitle}
          </VText>
        {flipOrder && <VTitle type='h4'>{title.slice(0, 18)} {title?.length > 17 ? '...' : ''}</VTitle>}
        {flipOrder && label && <VLabel>{label}</VLabel>}
        {buttonText && <VButton onClick={onClick} special={specialBtn} secondary={secondaryBtn} primary={primaryBtn}>{buttonText}</VButton>}
        <div style={{width: '100%', height: '218px', position: 'relative'}} className="w-full h-full rounded-vsm">
          <VImage priority src={image} width="100%" height="218px" objectFit={objectFit || 'cover'} layout='fill' alt='image' className='w-full h-full rounded-sm'/>
        </div>
      </div>
      {footer && <div className='flex px-vmd pb-vmd'>
        {footer}
      </div>}
    </VItemContainer>
  )
}