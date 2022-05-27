import React from 'react';

import { classNames } from "@/common/helpers"

export type TitleType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "title";

interface TitleProps {
  type?: TitleType;
  overrideTextColor?: boolean;
  className?: string;
  maxChar?:number;
  children?: React.ReactNode;
  onChange?: any
}

export const VTitle: React.FC<TitleProps> = ({type, overrideTextColor, className, children, onChange, maxChar=15}) => {
  if(typeof(children) === 'string') {
    children.slice(0, maxChar)
  }
  switch(type) {
    case "title":
      return (
        <h1 onChange={onChange} className={classNames('font-saria sm:text-title text-h2', overrideTextColor ? 'text-light-200' : 'dark:text-light-200 text-dark-200', className)}>
          {children}
        </h1>
      )
    case "h1":
      return (
        <h1 onChange={onChange} className={classNames('font-saria', overrideTextColor ? 'text-light-200' : 'dark:text-light-200 text-dark-200', className)}>
          {children}
        </h1>
      )
    case "h2":
      return (
        <h2 onChange={onChange} className={classNames('font-saria', overrideTextColor ? 'text-light-200' : 'dark:text-light-200 text-dark-200', className)}>
          {children}
        </h2>
      )
    case "h3":
      return (
        <h3 onChange={onChange} className={classNames('font-saria', overrideTextColor ? 'text-light-200' : 'dark:text-light-200 text-dark-200', className)}>
          {children}
        </h3>
      )
    case "h4":
      return (
        <h4 onChange={onChange} className={classNames('font-saria', overrideTextColor ? 'text-light-200' : 'dark:text-light-200 text-dark-200', className)}>
          {children}
        </h4>
      )
    case "h5":
      return (
        <h5 onChange={onChange} className={classNames('font-saria', overrideTextColor ? 'text-light-200' : 'dark:text-light-200 text-dark-200', className)}>
          {children}
        </h5>
      )
    case "h6":
      return (

        <h6 onChange={onChange} className={classNames('font-saria', overrideTextColor ? 'text-light-200' : 'dark:text-light-200 text-dark-200', className)}>
          {children}
        </h6>
      )
    default:
      return (
        <h1 onChange={onChange} className={classNames('font-saria', overrideTextColor ? 'text-light-200' : 'dark:text-light-200 text-dark-200', className)}>
          {children}
        </h1>
      )
  }
}