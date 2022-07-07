import { classNames } from '@/common/helpers';
import React from 'react';
import { VItemContainer } from "../atoms/VItemContainer"
import { VLabel } from "../atoms/VLabel"
import { VText } from '../atoms/VText';
import { VTitle } from '../atoms/VTitle';

export interface IBasicCardProps {
  label?: string;
  title?: string | number | React.ReactNode;
  footer?: any;
  center?: boolean;
  bordered?: boolean;
  length?: 'xs'| 'sm' | 'md' | 'lg' | 'xl';
  height?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}


export const BasicCard: React.FC<IBasicCardProps> = ({ length, height, bordered, title, label, center, footer}) => {
  return (
    <VItemContainer showBorderBottom showBorderTop showBorder={bordered} widthSize={length === 'xl' ? 'v2xl' : length === 'lg' ? 'vlg' : length === 'md' ? 'vmd' : length === 'sm' ? 'vsm' : 'vxs'} heightSize={height === 'xl' ? 'v2xl' : height === 'lg' ? 'vlg' : height === 'md' ? 'vmd' : height === 'sm' ? 'vsm' : 'vxs'}>
      <div className={classNames('w-full h-full flex flex-col justify-center items-start p-vmd gap-y-vsm', center ? 'items-center' : '')}>
      <VLabel padding={false} secondary>{label}</VLabel>
      {(typeof(title) === 'string' || typeof(title) ==='number') && <VTitle type={'h4'}>{title}</VTitle>}
      {typeof(title) === 'object' && title}
      {footer && typeof(footer) === 'string' ?  <VText size='sm'>{footer}</VText> : footer}
      </div>
    </VItemContainer>
  )
}