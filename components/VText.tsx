import React from 'react';

import { classNames } from "../common/helpers"

type TextSize = "sm" | "md" | "lg" | "xl";

interface TextProps {
  size?: TextSize;
  className?: string;
  children: React.ReactNode;
}

export const VText: React.FC<TextProps> = ({size, className, children}) => {
  return (
    <p className={classNames('dark:text-true-light-200 text-true-dark-200', size === 'sm' ? 'text-[12px] leading-5' : size === 'md' ? 'text-[14px] leading-5' : size === 'lg'  ? 'text-[18px] leading-7' : 'text-[30px] leading-8', className)}>
      {children}
    </p>
  )
}