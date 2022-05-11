import React from 'react';

import { classNames } from "../common/helpers"

interface LabelProps {
  secondary?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const VLabel: React.FC<LabelProps> = ({secondary, className, children}) => {
  return (
    <div className={classNames('py-2 px-4 rounded-xl dark:text-true-light-200 text-true-dark-200', secondary ? '' : 'border-2 border-[#651AB7]', className)}>
      {children}
    </div>
  )
}