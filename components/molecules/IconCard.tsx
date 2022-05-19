import { classNames } from '@/common/helpers';
import React from 'react';
import { VItemContainer } from "../atoms/VItemContainer"
import { VLabel } from "../atoms/VLabel"
import { VText } from '../atoms/VText';
import { VTitle } from '../atoms/VTitle';

export interface IIconCardProps {
  label?: string;
  icon?: any;
  bordered?: boolean;
}

export const IconCard: React.FC<IIconCardProps> = ({bordered=true, label, icon}) => {
  return (
    <VItemContainer showBorder={bordered} widthSize='vxs' heightSize='vxs'>
      <div className={classNames('w-full h-full flex flex-col justify-center items-center p-4 space-y-3')}>
      <div className='text-primary-100 flex justify-center items-center mt-4' style={{width: '60px', height: '60px'}}>
        {icon}
      </div>
      <VLabel className='pt-8' padding={false} secondary>{label}</VLabel>
      </div>
    </VItemContainer>
  )
}