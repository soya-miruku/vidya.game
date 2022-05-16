import React from 'react';
import { classNames } from "@/common/helpers"

export interface ButtonProps {
  primary?: boolean;
  special?: boolean;
  secondary?: boolean;
  padding?: boolean;
  onClick?: any;
  rounded?: boolean;
  className?: string;
  children?: any;
  role?: string;
}

export const VButton: React.FC<ButtonProps> = ({children, padding=true, rounded=true, special, primary, secondary, className, onClick=undefined, role, ...props}) => {
  return (
    <button 
      className={classNames(secondary ? 'dark:text-true-light-200 text-true-dark-200' : 'text-true-light-200', ' py-3 px-6 font-normal shadow-md uppercase',
      special ? 'bg-gradient-to-r from-accent-dark-200 to-accent-light-100 text-true-light-200' : '',
      secondary ? 'px-0' : '',
      rounded ? 'rounded-sm' : '',
      !padding ? 'px-0' : '', 
      className,
      primary ? 'bg-primary-100 text-true-light-200' : '',
      )}
      onClick={onClick} 
      {...props}> <div className={secondary ? 'border-b-2 border-b-accent-dark-200' : ''}> {children} </div></button>
  )
}