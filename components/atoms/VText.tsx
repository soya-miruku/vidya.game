import React from 'react';

import { classNames } from "@/common/helpers"

export type TextSize = "sm" | "md" | "lg" | "xl";
export type FontWeight = "thin" | "extralight" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black";
interface TextProps {
  size?: TextSize;
  weight?: FontWeight;
  overrideTextColor?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: any;
}

export const VText: React.FC<TextProps> = ({size, weight="normal", overrideTextColor, className, children, onClick}) => {
  return (
    <div onClick={onClick} className={classNames('font-saria', 
      overrideTextColor ? 'text-light-200 ' : 'dark:text-light-200 text-dark-200', 
      size === 'sm' ? 'text-[12px] leading-5' : size === 'md' ? 'text-[14px] leading-5' : size === 'lg'  ? 'text-[18px] leading-7' : 'text-[30px] leading-8', 
      weight === 'thin' ? 'font-thin' : weight === 'extralight' ? 'font-extralight' : weight === 'light' ? 'font-light' : weight === 'normal' ? 'font-normal' : weight === 'medium' ? 'font-medium' : weight === 'semibold' ? 'font-semibold' : weight === 'bold' ? 'font-bold' : weight === 'extrabold' ? 'font-extrabold' : '',
      className)}>
      {children}
    </div>
  )
}