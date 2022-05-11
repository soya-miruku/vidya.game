import React from 'react';

import { classNames } from "../common/helpers"

type TitleType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface TitleProps {
  type?: TitleType;
  className?: string;
  children: React.ReactNode;
}

export const VTitle: React.FC<TitleProps> = ({type, className, children}) => {
  switch(type) {
    case "h1":
      return (
        <h1 className={classNames('dark:text-true-light-200 text-true-dark-200', className)}>
          {children}
        </h1>
      )
    case "h2":
      return (
        <h2 className={classNames('dark:text-true-light-200 text-true-dark-200', className)}>
          {children}
        </h2>
      )
    case "h3":
      return (
        <h3 className={classNames('dark:text-true-light-200 text-true-dark-200', className)}>
          {children}
        </h3>
      )
    case "h4":
      return (
        <h4 className={classNames('dark:text-true-light-200 text-true-dark-200', className)}>
          {children}
        </h4>
      )
    case "h5":
      return (
        <h5 className={classNames('dark:text-true-light-200 text-true-dark-200', className)}>
          {children}
        </h5>
      )
    case "h6":
      return (

        <h6 className={classNames('dark:text-true-light-200 text-true-dark-200', className)}>
          {children}
        </h6>
      )
    default:
      return (
        <h1 className={classNames('dark:text-true-light-200 text-true-dark-200', className)}>
          {children}
        </h1>
      )
  }
}