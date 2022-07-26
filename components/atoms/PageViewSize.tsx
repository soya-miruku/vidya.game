import { ReactNode } from 'react';
import { classNames } from "@/common/helpers"

export interface IPageViewSizeProps {
  children: ReactNode;
  enabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const PageViewSize = ({children, enabled, className, style}: IPageViewSizeProps) => {
  return (
    <div className={classNames(enabled ? 'max-w-page w-full' : 'w-auto', 'h-full flex flex-col justify-center items-start gap-y-vmd', className)} style={style}>
      {children}
    </div>
  )
}