import React from 'react';

import styles from '@/css/mouseIcon.module.scss';
import { classNames } from '@/common/helpers';

export const VMouseIcon: React.FC<{className?:string}> = ({className}) => {

  return (
    <div className={classNames('w-full h-full flex justify-center p-2', className)}>
      <div className="dark:shadow-[0_0_0_3px_rgb(255,255,255)] shadow-[0_0_0_3px_rgb(0,0,0)] flex justify-center items-start before:mt-2 w-[30px] h-[50px] rounded-[25px] before:content-[ H ] before:w-[5px] before:rounded-full before:h-[5px] dark:before:bg-true-light-200 before:bg-true-dark-200 before:animate-scroll">

      </div>
    </div>
  )
}