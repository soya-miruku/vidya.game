import React from 'react';
import { classNames } from "@/common/helpers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/pro-regular-svg-icons';

export interface ButtonProps {
  primary?: boolean;
  special?: boolean;
  secondary?: boolean;
  disabled?: boolean;
  padding?: boolean;
  onClick?: any;
  rounded?: boolean;
  className?: string;
  children?: any;
  role?: string;
  animate?: boolean;
  isLoading?: boolean;
  style?: any;
  customColor?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  name?: string;
}

export const VButton: React.FC<ButtonProps> = ({name, ariaLabel, type, children, style, isLoading, padding=true, rounded=true, customColor, special, primary, secondary, className, disabled, animate=true, onClick=undefined, role, ...props}) => {
  return (
    <button 
      name={name}
      type={type}
      aria-label={ariaLabel}
      className={classNames('group font-saria text-body-sm tracking-cta uppercase',
      'px-[30px]  b-0 transition-all duration-500 overflow-hidden relative',
      padding ? 'py-[19px]' :'py-[7px]',
      special ? 'text-light-200 bg-gradient-to-r from-accent-dark-200 to-secondary-100 dark:shadow-btn-dark shadow-btn-light' : '',
      primary ? 'text-light-200 bg-primary-100' : '',
      secondary ? 'text-dark-200 dark:text-light-200 pl-0 pr-0 hover:pl-0 bg-transparent' : '',
      rounded ? 'rounded-sm' : '',
      disabled ? 'opacity-50 cursor-not-allowed' : animate ? 'hover:pr-[40px] hover:pl-[20px]' : '',
      className,
      )}
      style={{
        ...style,
        ...(disabled ? {cursor: 'not-allowed'} : {}),
        ...(isLoading ? {'pointerEvents': 'none'} : {}),
        backgroundColor: customColor ? customColor : '',
      }}
      onClick={() => {
        if(onClick && !disabled) onClick();
      }} 
      {...props}> 
        <div className={classNames('flex justify-center', secondary ? 'border-b-2 border-b-accent-dark-200' : '')}>
          <div className='flex justify-center items-center gap-x-vsm'>
            {children}
            {isLoading && <FontAwesomeIcon className='w-5 h-5 animate-spin dark:!text-light-300 !text-dark-300' icon={faSpinner}></FontAwesomeIcon>}
          </div>
          {primary && animate && !disabled && <i aria-hidden="true" className='group-hover:before:opacity-100 group-hover:before:visible fas group-hover:before:right-[20px] before:invisible before:content-["\f054"] before:absolute before:opacity-0 before:top-[38%] before:-right-[20px] before:duration-500'/>}
          {special && animate && !disabled && <i aria-hidden="true" className='group-hover:before:opacity-100 group-hover:before:visible fas group-hover:before:right-[20px] before:invisible before:content-["\f04b"] before:absolute before:opacity-0 before:top-[38%] before:-right-[20px] before:duration-500'/>}
          {secondary && animate && !disabled && <i aria-hidden="true" className='dark:text-light-200 group-hover:before:opacity-100 group-hover:before:visible fas group-hover:before:right-[20px] before:invisible before:content-["\f103"] before:absolute before:opacity-0 before:top-[38%] before:-right-[20px] before:duration-500'/>}
        </div>
      </button>
  )
}