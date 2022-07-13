import React from 'react';

import { classNames } from "@/common/helpers"

interface LabelProps {
  secondary?: boolean;
  className?: string;
  padding?: boolean
  children?: React.ReactNode;
  overrideColors?: boolean;
}

export const VLabel: React.FC<LabelProps> = ({secondary, className, children, overrideColors, padding=true}) => {
  return (
    <div className={classNames('font-saria text-body-sm uppercase', padding ? 'py-2 px-4' : '', 'rounded-sm', overrideColors ? '!text-light-200' : 'dark:text-light-200 text-dark-200', secondary ? '' : 'border-2 border-primary-100', className)}>
      {children}
    </div>
  )
}