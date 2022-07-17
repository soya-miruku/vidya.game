import React from 'react';

import { classNames } from "@/common/helpers"

export type TextSize = "sm" | "md" | "lg" | "xl";
export type FontWeight = "thin" | "extralight" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black";
interface TextProps {
  size?: TextSize;
  spacing?: "sm" | "md" | "lg";
  weight?: FontWeight;
  maxChar?: number;
  overrideTextColor?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: any;
  style?: React.CSSProperties;
}

export const VText: React.FC<TextProps> = ({size, weight="normal", spacing, overrideTextColor, className, children, onClick, style, maxChar=69}) => {
  // if(typeof(children) === 'string') {
  //   children = children.slice(0, maxChar)
  // }
  return (
    <div onClick={onClick} className={classNames('font-saria', 
      overrideTextColor ? 'text-light-200 ' : 'dark:text-light-200 text-dark-200', 
      spacing === 'sm' ? 'tracking-cta' : spacing === 'md' ? 'tracking-cta' : 'tracking-7',
      size === 'sm' ? 'text-body-xs leading-5' : size === 'md' ? 'text-body-sm leading-cta' : size === 'lg'  ? 'text-body leading-7' : 'text-standfirst leading-[45px]', 
      weight === 'thin' ? 'font-thin' : weight === 'extralight' ? 'font-extralight' : weight === 'light' ? 'font-light' : weight === 'normal' ? 'font-normal' : weight === 'medium' ? 'font-medium' : weight === 'semibold' ? 'font-semibold' : weight === 'bold' ? 'font-bold' : weight === 'extrabold' ? 'font-extrabold' : '',
      className)} style={style}>
      {children}
    </div>
  )
}