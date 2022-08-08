import React from 'react';
import { classNames } from '@/common/helpers';

export type VItemContainerSize = 'none' | 'vxxs' | 'vxs' |'vsm' | 'vmd' | 'vhlf' | 'vlg' | 'vxl' | 'vhxl' | 'v1xl' | 'v2xl' | 'full';

export interface ItemContainerProps {
  children?: React.ReactNode;
  widthSize?: VItemContainerSize;
  heightSize?: VItemContainerSize;
  dropShadow?: boolean;
  className?: string;
  innerClassName?: string;
  showBorder?: boolean;
  showBorderBottom?: boolean;
  showBorderTop?: boolean;
  showBorderLeft?: boolean;
  showBorderRight?: boolean;
  roundedButtom?: boolean;
  roundedTop?: boolean;
  roundedLeft?: boolean;
  roundedRight?: boolean;
  center?: boolean;
}

export const VItemContainer: React.FC<ItemContainerProps> = ({ center=false, dropShadow=true, roundedLeft=true, roundedRight=true, roundedTop=true, roundedButtom=true, showBorderBottom=true, showBorderLeft=true, showBorderRight=true, showBorderTop=true, showBorder, children, className, innerClassName, widthSize, heightSize }) => {
  const getSizeClass:any = (size, isHeight) => {
    switch(size) {
      case 'vhlf':
        return {class: isHeight ? 'h-vhlf min-h-vhlf max-h-vhlf' : 'w-vhlf min-w-vhlf max-w-vhlf'};
      case 'vxxs':
        return {class: isHeight ? 'h-vxxs min-h-vxxs max-h-vxxs' : 'w-vxxs min-w-vxxs max-w-vxxs'};
      case 'vxs':
        return {class: isHeight ? 'h-vxs min-h-vxs max-h-vxs' : 'w-vxs min-w-vxs max-w-vxs'};
      case 'vsm':
        return {class: isHeight ? 'h-vsm min-h-vsm max-h-vsm' : 'max-w-vsm w-vsm min-w-vsm '};
      case 'vmd':
        return {class: isHeight ? 'h-vmd min-h-vmd max-h-vmd' : 'mobile:max-w-vlg tablet:max-w-vlg min-w-vxs max-w-vmd'};
      case 'vlg':
        return {class: isHeight ? 'h-vlg min-h-vlg max-h-vlg' : 'min-w-xs max-w-vlg'};
      case 'vxl':
        return {class: isHeight ? 'min-h-vxl h-vxl max-h-vxl' : 'max-w-vxl'};
      case 'vhxl':
        return {class: isHeight ? 'min-h-vhxl' : 'w-vhxl min-w-vhxl max-w-vhxl'};
      case 'v2xl':
        return {class: isHeight ? 'min-h-vxl max-h-v2xl' : 'max-w-v2xl'};
      case 'v1xl':
        return {class: isHeight ? 'min-h-vxl max-h-v1xl' : 'max-w-v1xl'};
      case 'full':
        return {class: isHeight ? 'h-full min-h-full' : 'w-full min-w-full'};
      default:
        return {class: isHeight ? 'h-auto min-h-auto max-h-auto' : 'w-vsm min-w-vsm max-w-vsm'};
    }
  }
  
  const DivContainer: React.FC<{children?:any, className?:string}> = ({children, className}) => {
    return (
      <div className={classNames(className)}>
        {children}
      </div>
    )
  }

  const borderComponent = ({children}) => 
  (
    <DivContainer className={
      classNames('flex flex-col gap-vsm justify-start items-start w-full h-full rounded-sm mt-0',
      roundedButtom ? '' : 'rounded-b-[0px]',
      roundedTop ? '' : 'rounded-t-[0px]',
      roundedLeft ? '' : 'rounded-l-[0px]',
      roundedRight ? '' : 'rounded-r-[0px]',
      showBorder ? 'border-[1px] dark:border-dark-300 border-light-300' : '',
      showBorderBottom ? '' : 'border-b-[0px]',
      showBorderLeft ? '' : 'border-l-[0px]',
      showBorderRight ? '' : 'border-r-[0px]',
      showBorderTop ? '' : 'border-t-[0px]')}>
      {children}
    </DivContainer>
  );

  return (
    <div className={classNames('prose w-full flex flex-col justify-center items-center rounded-lgr', dropShadow ? 'dark:shadow-dark shadow-light' : '',
      getSizeClass(widthSize).class,
      getSizeClass(heightSize, true).class, className)}>
      <div className={classNames('flex justify-center items-center rounded-lgr w-full h-full', center ?'text-center' : '', 
      roundedButtom ? '' : 'rounded-b-[0px]',
      roundedTop ? '' : 'rounded-t-[0px]',
      roundedLeft ? '' : 'rounded-l-[0px]',
      roundedRight ? '' : 'rounded-r-[0px]',
      showBorder ? 'border-[2px] dark:border-dark-300 border-light-300 px-vsm' : 'dark:bg-dark-300 bg-light-250 text-dark-200 dark:text-light-100 backdrop-blur-lg',
      showBorderBottom ? 'pb-vsm' : 'border-b-[0px]',
      showBorderLeft ? '' : 'border-l-[0px]',
      showBorderRight ? '' : 'border-r-[0px]',
      showBorderTop ? 'pt-vsm' : 'border-t-[0px]',
      innerClassName
        )}>
        {showBorder ? borderComponent({children}): <div className='flex flex-col gap-vsm justify-center items-start w-full h-full rounded-sm'>{children}</div>}
        
      </div>
    </div>
  )
}