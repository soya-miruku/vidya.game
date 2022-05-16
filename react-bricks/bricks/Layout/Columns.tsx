import * as React from 'react'
import classNames from 'classnames'
import { Gap, NumColumns, Padding } from '../Shared/additional';

export interface ColumnsProps {
  cols?: NumColumns
  gap?: Gap
  paddingX?: Padding
  paddingY?: Padding
  className?: string
}

const Columns: React.FC<ColumnsProps> = ({
  cols = 1,
  gap= 'sm',
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
      'prose')}
      >
        {children}
    </div>
  )
}

export default Columns