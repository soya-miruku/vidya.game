import { classNames } from '@/common/helpers';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faDash } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useMemo } from 'react';
import { VText } from '../atoms/VText';
import { BasicCard, IBasicCardProps } from './BasicCard';

export interface IPriceCardProps extends IBasicCardProps {
  price: string | number;
  perctChange?: string | number;
  increase?: boolean | string;
}

export const PriceCard: React.FC<IPriceCardProps> = ({increase, length='sm', height='sm', bordered=true, price, perctChange, label}) => {
  const hasIncreased = useMemo(() => {
    if(typeof(increase) === 'boolean') {
      return increase;
    }
    const val = parseFloat(perctChange.toString() || '0');
    return val > 0;
  }, [increase]);

  return (
    <BasicCard height={height} length={length} bordered={bordered} title={price} label={label} footer={<div className='flex space-x-2 justify-center items-center'>
      <FontAwesomeIcon className={classNames(hasIncreased ? 'text-secondary-100' : perctChange === 0 ? 'text-primary-100' : 'text-accent-dark-200')} icon={hasIncreased ? faArrowUp : perctChange === 0 ? faDash : faArrowDown}></FontAwesomeIcon>
      <VText size='sm'>
        {perctChange === 0 ? '' : `${perctChange}%`}
      </VText>
    </div>}></BasicCard>
  )
}