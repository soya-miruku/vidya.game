import Image from 'next/image';
import React from 'react';
import { VButton } from '../atoms/VButton';
import { VItemContainer } from '../atoms/VItemContainer';
import { ICardProps } from './Card';

export const ProgramCard: React.FC<ICardProps> = ({bordered, title, subtitle, image, url}) => {
  return (
    <VItemContainer showBorder={bordered} widthSize='vsm' heightSize='vlg' className='hover:cursor-pointer flex flex-col py-0 dark:bg-dark-300 bg-light-300 rounded-lgr'>
      <div className='w-full h-full flex flex-col justify-start items-center gap-y-vmd'>
        <div className='relative w-[150px] h-[150px]'>
          <Image src={image} width="100%" height="100%" objectFit='contain' layout='fill'/>
        </div>
        <div className='flex flex-col justify-start items-start px-vmd gap-y-vsm'>
          <div className='px-1 bg-accent-dark-200 justify-start items-start w-full'> 
            <h5>{title}</h5>
          </div>
          <p className='leading-4 font-roboto text-body-xs'>{subtitle}</p>
          <VButton secondary animate={false} padding={false} className='text-body-xs' onClick={() => url ? window.open(url, '_self') : null}>Go here</VButton>
        </div>
      </div>
    </VItemContainer>
  )
}