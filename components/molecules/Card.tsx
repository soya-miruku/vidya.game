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
  center?: boolean;
  roundImage?: boolean;
  sameType?: boolean;
  bordered?: boolean;
}

export const Card: React.FC<ICardProps> = ({bordered=true, sameType=false, roundImage, label, center, title, subtitle, footer, image, avatar, long, wide, url}) => {
  return (
    <div className={classNames('prose', url ? 'hover:cursor-pointer' : '')} onClick={() => url ? window.open(url, '_self') : null}>
    <VItemContainer showBorder={sameType} showBorderBottom={!sameType} dropShadow={false} roundedButtom={!sameType}  widthSize={wide ? 'vxl' : 'vlg'} heightSize={sameType ? 'vhlf' : long ? 'vxl' : 'vlg'}>
      <div className='w-full h-full'>
        {label && <VLabel className='absolute z-50 text-light-300 m-[30px]'>{label}</VLabel>}
        <div className='w-full h-full flex justify-center items-center'>
          <div className={roundImage ? 'rounded-[100%] mt-8' : ''} style={{width: roundImage ? '70%' : '100%', height: roundImage ? '90%' : '100%', position: 'relative'}}>
            <VImage src={image} width="100%" height="100%" objectFit='cover' layout='fill' 
            alt='image' className={classNames('w-full h-full', roundImage ? 'rounded-[100%]' : 'rounded-t-sm')}/>
          </div>
        </div>
        {avatar && <div className='absolute -mt-8 ml-8 border-2 rounded-full dark:border-dark-300 border-light-300'>
          <VImage src={avatar} width={60} height={60} alt='icon-image' className='w-full h-full rounded-full'/>
        </div>}
      </div>
    </VItemContainer>
    <VItemContainer center={center} showBorderTop={false} roundedTop={false} showBorder={bordered} widthSize={wide ? 'vxl' : 'vlg'} heightSize={ sameType ? 'vhlf' : footer ? 'vsm' : 'vxs'}>
      <div className={classNames('w-full flex flex-col justify-center items-center', avatar ? 'mt-14' : 'mt-8','ml-2', footer ? 'space-y-4' : 'space-y-6', bordered ? '' : 'px-4 mt-0')}>
        <VTitle type='h4'>{title}</VTitle>
        <VText className={classNames(sameType ? 'min-h-[85px] max-h-[85px]' :'min-h-[52px] max-h-[52px] ', 'overflow-y-scroll scrollbar-track-rounded-full scrollbar-thin dark:scrollbar-thumb-light-300 scrollbar-thumb-dark-200')} size='md' weight='normal'>{subtitle}</VText>
        {footer && typeof(footer) === 'string' ? <VText size='sm'>{footer}</VText> : footer}
      </div>
    </VItemContainer>
    </div>
  )
}