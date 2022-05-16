import { classNames } from '@/common/helpers';
import React, { useState } from 'react';
import { VText } from './VText';

export interface ITabsProps {
  items: Array<{label?:string, value?:string}>;
  className?: string;
  onChange?: (value?: any) => void;
}

export interface ITabProps {
  label?: string;
  active?: boolean;
  onClick?: () => void;
}

export const VTab: React.FC<ITabProps> = ({ label, active, onClick }) => {
  return (
    <VText onClick={onClick} size='sm' weight={active ? 'bold' : 'light'} overrideTextColor className={classNames(active ? 'text-accent-dark-200' : 'hover:text-accent-dark-100 hover:cursor-pointer dark:text-true-light-200 text-true-dark-200')}>{label}</VText>
  )
}

export const VTabs: React.FC<ITabsProps> = ({ items, onChange }) => {
  const [selected, setSelected] = useState(0);

  return (
    <div className='flex gap-x-2'>
      {items.map((item, index) => (
        <VTab key={index} label={item.label} active={selected === index} onClick={() => {
          setSelected(index);
          if(onChange) {
            onChange(item.value);
          }
        }} />
      ))}
    </div>
  )
}