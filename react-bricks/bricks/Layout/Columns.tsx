import * as React from 'react'
import classNames from 'classnames'
import { Gap, NumColumns, Padding } from '../Shared/additional';

export interface ColumnsProps {
  cols?: NumColumns
  gap?: Gap
  padding?: Padding
  className?: string
}

const Columns: React.FC<ColumnsProps> = ({
  cols = 1,
  gap= 'sm',
  padding = 'x-large',
  className = '',
  children,
}) => {
  return (
    <div className={classNames(className, 
      'w-full h-full',
      `grid`,
      cols > 1 ? cols == 2 ?  'md:grid-cols-2 grid-cols-1' : cols == 3 ? 'xs:grid-cols-3 xs:grid-rows-1 md:grid-cols-2 grid-cols-1 grid-rows-2' : cols == 4 ? 'xs:grid-cols-4 xs:grid-rows-1 md:grid-cols-2 grid-cols-1 grid-rows-2' : '' : 'grid-cols-1',
      'gap-x-8 overflow-hidden',
      gap === 'sm' ? 'gap-x-4' : gap === 'md' ? 'gap-x-8' : gap === 'lg' ? 'gap-x-16' : 'gap-x-16',
      'prose',
      padding === 'x-large' ? 'sm:py-8 py-3 xs:px-40 md:px-24 px-8' : padding === 'big' ? 'sm:py-2 py-1 sm:px-4 px-1' : 'sm:py-1 sm:px-2 px-1',
      )}
      >
        {children}
    </div>
  )
}

export default Columns