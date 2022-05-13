import { classNames } from '@/common/helpers';
import React from 'react';
import { VImage } from '../atoms/VImage';
import { VItemContainer } from '../atoms/VItemContainer';
import { VLabel } from '../atoms/VLabel';
import { VText } from '../atoms/VText';
import { VTitle } from '../atoms/VTitle';

export interface ICardProps {
  label?: string;
  title?: string;
  subtitle?: string;
  footer?: any;
  image?: string;
  url?: string;
  avatar?: string;
  long?: boolean;
  wide?: boolean;
}

export const Card: React.FC<ICardProps> = ({label, title, subtitle, footer, image, avatar, long, wide}) => {
  return (
    <div className='prose'>
    <VItemContainer dropShadow={false} roundedButtom={false} widthSize={wide ? 'vxl' : 'vlg'} heightSize={long ? 'vxl' : 'vlg'}>
      <div className='w-full h-full'>
        {label && <VLabel className='absolute z-50 text-true-light-300 m-[30px]'>{label}</VLabel>}
        <div style={{width: '100%', height: '100%', position: 'relative'}}>
          <VImage src={image} width="100%" height="100%" objectFit='cover' layout='fill' alt='image' className='w-full h-full rounded-t-[10px]'/>
        </div>
        {avatar && <div className='absolute -mt-8 ml-8 border-2 rounded-full dark:border-true-dark-300 border-true-light-300'>
          <VImage src={avatar} width={60} height={60} alt='icon-image' className='w-full h-full rounded-full'/>
        </div>}
      </div>
    </VItemContainer>
    <VItemContainer showBorderTop={false} roundedTop={false} showBorder widthSize={wide ? 'vxl' : 'vlg'} heightSize={footer ? 'vsm' : 'vxs'}>
      <div className={classNames(avatar ? 'mt-14' : 'mt-8','ml-2', footer ? 'space-y-4' : 'space-y-6')}>
        <VTitle type='h4'>{title}</VTitle>
        <VText className='min-h-[52px] max-h-[52px]  overflow-y-scroll scrollbar-track-rounded-full scrollbar-thin dark:scrollbar-thumb-true-light-300 scrollbar-thumb-true-dark-200' size='md' weight='normal'>{subtitle}</VText>
        {footer && typeof(footer) === 'string' ? <VText size='sm'>{footer}</VText> : footer}
      </div>
    </VItemContainer>
    </div>
  )
}