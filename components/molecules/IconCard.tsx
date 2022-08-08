import { classNames } from '@/common/helpers';
import React from 'react';
import { VImage } from '../atoms/VImage';
import { VItemContainer } from "../atoms/VItemContainer"
import { VLabel } from "../atoms/VLabel"
import { VText } from '../atoms/VText';
import { VTitle } from '../atoms/VTitle';

export interface IIconCardProps {
  label?: string;
  icon?: any;
  image?: string;
  bordered?: boolean;
}

export const IconCard: React.FC<IIconCardProps> = ({bordered=true, label, icon, image}) => {
  return (
    <VItemContainer showBorder={bordered} widthSize='vxs' heightSize='vxs'>
      <div className={classNames('w-full h-full flex flex-col justify-center items-center py-vlrg gap-y-vmd')}>
        {!image && <div className='text-primary-100 flex justify-center items-center text-[50px]'>
          {icon}
        </div>}
        {image && 
        <div className='relative'>
          <VImage src={image} alt={`icon-image-${label}`} width={80} height={80}/>
        </div>
        }
        <VLabel padding={false} secondary>{label}</VLabel>
      </div>
    </VItemContainer>
  )
}