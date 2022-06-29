import { classNames } from '@/common/helpers';
import React from 'react';

export interface IBackdropProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export const Backdrop = ({children, className, style}: IBackdropProps) => {
  return (
    <div className={classNames('bg-zinc-900/90 backdrop-blur-sm overflow-x-hidden fixed right-0 left-0 top-0 w-full inset-0 h-full', className)} style={style}>
      {children}
    </div>
  )
}