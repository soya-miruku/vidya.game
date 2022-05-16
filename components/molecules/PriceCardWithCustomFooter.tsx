import { classNames } from '@/common/helpers';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { VText } from '../atoms/VText';
import { BasicCard } from './BasicCard';
import { IPriceCardProps } from './PriceCard';

export interface IPriceCustomProps extends IPriceCardProps {
  footer?: any;
}

export const PriceCardWithCustomFooter: React.FC<IPriceCustomProps> = ({length='sm', bordered=true, price, footer, label}) => {
  return (
    <BasicCard length={length} bordered={bordered} title={price} label={label} footer={<div className='flex space-x-2 justify-center items-center'>
     {typeof(footer) === 'string' ? <VText size='sm'>{footer}</VText> : footer}
    </div>}></BasicCard>
  )
}