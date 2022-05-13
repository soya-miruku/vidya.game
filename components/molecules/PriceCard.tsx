import { classNames } from '@/common/helpers';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { VText } from '../atoms/VText';
import { BasicCard, IBasicCardProps } from './BasicCard';

export interface IPriceCardProps extends IBasicCardProps {
  price: string;
  perctChange: string;
  increase?: boolean;
}

export const PriceCard: React.FC<IPriceCardProps> = ({increase, length='sm', bordered=true, price, perctChange, label}) => {
  return (
    <BasicCard length={length} bordered={bordered} title={price} label={label} footer={<div className='flex space-x-2 justify-center items-center'>
      {perctChange && <FontAwesomeIcon className={classNames(increase ? 'text-secondary-100' : 'text-accent-dark-200')} icon={increase ? faArrowUp : faArrowDown}></FontAwesomeIcon>}
      <VText size='sm'>
        {perctChange}
      </VText>
    </div>}></BasicCard>
  )
}