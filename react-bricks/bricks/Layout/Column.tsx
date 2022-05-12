import * as React from 'react'
import classNames from 'classnames'
import { Padding } from '../Shared/additional';

export interface ColumnProps {
  span?: number
  padding?: Padding
  className?: string
}

const Column: React.FC<ColumnProps> = ({
  span = 1,
  className = '',
  children,
}) => {
  return (
    <div className={classNames(className, 
      'w-full h-full z-50',
      // `grid sm:grid-span-${span}`,
      )}>
      {children}
    </div>
  )
}

export default Column