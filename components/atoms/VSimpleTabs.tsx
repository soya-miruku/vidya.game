import { classNames } from '@/common/helpers';
import React, { useEffect, useState } from 'react';
import { VText } from './VText';

export interface ITabsProps {
  items: Array<ITabProps>;
  className?: string;
  defaultActiveIndex?: number;
  disabled?: boolean;
  onChange?: (value: any, index: number) => void;
}

export interface ITabProps {
  label?: any;
  active?: boolean;
  value?: any;
  size?: 'sm' | 'md' | 'lg';
  bordered?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const VSimpleTab: React.FC<ITabProps> = ({ value, label, active, onClick, size, disabled, bordered }) => {
  return (
    <VText id={value} onClick={onClick} size={size || 'sm'} weight={active ? 'bold' : 'light'}  
    className={classNames('uppercase', bordered ? 'border-b-[2px] px-[3px]' : '', active ? 
    disabled ? '!text-accent-dark-700 border-b-accent-dark-700' : '!text-accent-dark-200 border-b-accent-dark-200' : 
    disabled ? '' :  'hover:!text-accent-dark-100 hover:border-accent-dark-100 hover:cursor-pointer dark:text-light-200 text-dark-200')}
    >
      {label}
    </VText>
  )
}

export const VSimpleTabs: React.FC<ITabsProps> = ({ items, onChange, className, disabled, defaultActiveIndex }) => {
  const [selected, setSelected] = useState(defaultActiveIndex);
  return (
    <div className={classNames('flex gap-x-vmd gap-y-vsm', className)}>
      {items.map(({size, value, label, bordered}, index) => (
        <VSimpleTab size={size} bordered={bordered} disabled={disabled} value={value} key={index} label={label} active={selected === index} onClick={() => {
          if(onChange && !disabled) {
            onChange(value, index);
            setSelected(() => index);
          }
        }} />
      ))}
    </div>
  )
}