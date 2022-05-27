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
      <div className={classNames('w-full h-full flex flex-col justify-center items-center py-vlrg gap-y-vmd')}>
        <div className='text-primary-100 flex justify-center items-center text-[50px]'>
          {icon}
        </div>
        <VLabel padding={false} secondary>{label}</VLabel>
      </div>
    </VItemContainer>
  )
}