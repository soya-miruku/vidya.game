import React from 'react';

import styles from '@/css/mouseIcon.module.scss';
import { classNames } from '@/common/helpers';

export const VMouseIcon: React.FC<{className?:string, overrideColor?: boolean}> = ({className, overrideColor}) => {

  return (
    <div className={classNames('w-full h-full flex justify-center p-2', className)}>
      <div className={classNames(overrideColor ? "shadow-[0_0_0_3px_rgb(255,255,255)] flex justify-center items-start before:mt-2 w-[30px] h-[50px] rounded-lgr before:content-[ H ] before:w-[5px] before:rounded-full before:h-[5px] before:bg-light-200 before:animate-scroll" :  "dark:shadow-[0_0_0_3px_rgb(255,255,255)] shadow-[0_0_0_3px_rgb(0,0,0)] flex justify-center items-start before:mt-2 w-[30px] h-[50px] rounded-lgr before:content-[ H ] before:w-[5px] before:rounded-full before:h-[5px] dark:before:bg-light-200 before:bg-dark-200 before:animate-scroll")}>

      </div>
    </div>
  )
}