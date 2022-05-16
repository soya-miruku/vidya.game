import { classNames } from '@/common/helpers';
import React from 'react';
import { VItemContainer } from "../atoms/VItemContainer"
import { VLabel } from "../atoms/VLabel"
import { VText } from '../atoms/VText';
import { VTitle } from '../atoms/VTitle';

export interface IBasicCardProps {
  label?: string;
  title?: string | number;
  footer?: any;
  center?: boolean;
  bordered?: boolean;
  length?: 'sm' | 'md' | 'lg' | 'xl';
}

export const BasicCard: React.FC<IBasicCardProps> = ({ length, bordered, title, label, center, footer}) => {
  return (
    <VItemContainer showBorder={bordered} widthSize={length === 'xl' ? 'v2xl' : length === 'lg' ? 'vlg' : length === 'md' ? 'vmd' : 'vsm'}>
      <div className={classNames('w-full h-full flex flex-col justify-center items-start p-4 space-y-3', center ? 'items-center' : '')}>
      <VLabel padding={false} secondary>{label}</VLabel>
      <VTitle type='h4'>{title}</VTitle>
      {footer && typeof(footer) === 'string' ?  <VText size='sm'>{footer}</VText> : footer}
      </div>
    </VItemContainer>
  )
}