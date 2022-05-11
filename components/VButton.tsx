import React from 'react';
import { classNames } from "../common/helpers"

export interface ButtonProps {
  primary?: boolean;
  special?: boolean;
  secondary?: boolean;
  onClick?: () => void;
  rounded?: boolean;
  className?: string;
  children?: any;
  role?: string;
}

export const VButton: React.FC<ButtonProps> = ({children, rounded=true, special=false, primary=false, secondary=false, className, onClick=undefined, role, ...props}) => {
  return (
    <button 
      className={classNames('text-white py-3 px-6 font-normal shadow-md uppercase',
      special ? 'bg-gradient-to-r from-accent-dark-200 to-accent-light-100' : '',
      primary ? 'bg-primary-100' : '',
      secondary ? 'px-0' : '',
      rounded ? 'rounded-[10px]' : '',
      className)}
      onClick={onClick} 
      {...props}> <div className={secondary ? 'border-b-2 border-b-accent-dark-200' : ''}> {children} </div></button>
  )
}