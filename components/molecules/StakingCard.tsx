import React from 'react';
import { VButton } from '../atoms/VButton';
import { VImage } from '../atoms/VImage';
import { VItemContainer } from '../atoms/VItemContainer';
import { VLabel } from '../atoms/VLabel';
import { VText } from '../atoms/VText';
import { VTitle } from '../atoms/VTitle';

export interface IStakingCardProps {
  image?: string;
  label1?: string;
  label2?: string;
  title1?: string;
  title2?: string;
}

export const StakingCard: React.FC<IStakingCardProps> = ({ label1, label2, title1, title2, image}) => {
  return (
    <VItemContainer showBorder={true} widthSize="v2xl" heightSize='vxxs'>
      <div className='flex w-full flex-wrap space-x-4 justify-between items-center'>
        <div className='flex w-1/2 justify-start items-center space-x-4'>
          <VImage width={80} height={80} className="rounded-full"></VImage>
          <div className='flex flex-col space-y-4'>
            <VLabel padding={false} secondary>{label1}</VLabel>
            <VTitle type='h5'>{title1}</VTitle>
          </div>
        </div>
        <div className='flex w-1/3 flex-col items-end space-y-4 pr-3'>
          <VLabel padding={false} secondary>{label2}</VLabel>
          <VTitle type='h5'>{title2}</VTitle>
        </div>
      </div>
    </VItemContainer>
  )
}