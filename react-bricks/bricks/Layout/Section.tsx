import * as React from 'react'
import classNames from 'classnames'
import { bgColors } from '../Shared/colors'
import { Padding, Round } from '../Shared/additional'

export type Border = 'none' | 'full' | 'boxed'

interface HRProps {
  boxed?: boolean
}

const HR: React.FC<HRProps> = ({ boxed = false }) => {
  if (boxed) {
    return (
      <div className="sm:w-11/12 xl:w-9/12 mx-auto px-6 md:px-12">
        <hr className="border-gray-900 border-opacity-10 dark:border-gray-700" />
      </div>
    )
  }
  return (
    <hr className="border-gray-900 border-opacity-10 dark:border-gray-700" />
  )
}

interface SectionProps {
  bg?: { color: string; className: string }
  borderTop?: Border
  borderBottom?: Border
  paddingX?: Padding
  paddingY?: Padding
  rounded?: Round
  className?: string
}

const Section: React.FC<SectionProps> = ({
  bg = bgColors.white.value,
  borderTop = 'none',
  borderBottom = 'none',
  className = '',
  paddingX,
  paddingY,
  rounded,
  children,
}) => {
  const bgColor = bg.className
  return (
    <section className={classNames(bgColor, className, 'overflow-hidden',
    paddingX === 'none' ? '' : paddingX === 'xxl' ? 'xs:px-96 md:px-64 px-6' : paddingX === 'xl' ? 'xs:px-40 md:px-24 px-4' : paddingX === 'lg' ? 'sm:px-4 px-2' : 'sm:px-2 px-1',
    paddingY === 'none' ? '' : paddingY === 'xxl' ? 'sm:py-12 py-4' : paddingY === 'xl' ? 'sm:py-8 py-2' : paddingY === 'lg' ? 'sm:py-2 py-1' : paddingY === 'sm' ? '' : 'sm:py-1 py-1',
    rounded === 'none' ? 'rounded-[0px]' : rounded === 'sm' ? 'rounded-sm' : rounded === 'md' ? 'rounded-lgr' : 'rounded-lxl',
    )}>
      {borderTop !== 'none' && <HR boxed={borderTop === 'boxed'} />}
      {children}
      {borderBottom !== 'none' && <HR boxed={borderBottom === 'boxed'} />}
    </section>
  )
}

export default Section