import React from 'react';
import { classNames } from "@/common/helpers";

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
  animate?: boolean;
}

export const VButton: React.FC<ButtonProps> = ({children, padding=true, rounded=true, special, primary, secondary, className, animate=true, onClick=undefined, role, ...props}) => {
  return (
    <button 
      className={classNames('group font-saria text-light-200 tracking-cta uppercase',
      'px-[30px] py-[19px] b-0 transition-all duration-500 overflow-hidden relative',
      'hover:pr-[40px] hover:pl-[20px]',
      special ? 'bg-gradient-to-r from-accent-dark-200 to-secondary-100 dark:shadow-btn-dark shadow-btn-light' : '',
      primary ? 'bg-primary-100' : '',
      secondary ? 'text-dark-200 pl-0 hover:pl-0 bg-transparent' : '',
      rounded ? 'rounded-sm' : '',
      className,
      )}
      onClick={onClick} 
      {...props}> 
        <div className={classNames('flex', secondary ? 'border-b-2 border-b-accent-dark-200' : '')}>
          {children}
          {primary && animate && <i aria-hidden="true" className='group-hover:before:opacity-100 group-hover:before:visible fas group-hover:before:right-[20px] before:invisible before:content-["\f054"] before:absolute before:opacity-0 before:top-[38%] before:-right-[20px] before:duration-500'/>}
          {special && animate && <i aria-hidden="true" className='group-hover:before:opacity-100 group-hover:before:visible fas group-hover:before:right-[20px] before:invisible before:content-["\f04b"] before:absolute before:opacity-0 before:top-[38%] before:-right-[20px] before:duration-500'/>}
          {secondary && animate && <i aria-hidden="true" className='dark:text-light-200 group-hover:before:opacity-100 group-hover:before:visible fas group-hover:before:right-[20px] before:invisible before:content-["\f103"] before:absolute before:opacity-0 before:top-[38%] before:-right-[20px] before:duration-500'/>}
        </div>
      </button>
  )
}