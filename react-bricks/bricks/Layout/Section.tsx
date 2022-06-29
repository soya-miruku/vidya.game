import * as React from 'react'
import { Parallax, Background } from "react-parallax";
import classNames from 'classnames'
import { bgColors } from '../Shared/colors'
import { Padding, Round } from '../Shared/additional'
export interface IImageSource {
  src: string
  placeholderSrc?: string
  srcSet?: string
  alt?: string
  seoName?: string
}
export interface SectionProps {
  bg?: { color: string; className: string }
  bgImage?: IImageSource
  height?: string
  paddingX?: Padding
  paddingY?: Padding
  rounded?: Round
  className?: string
  enableParallax?: boolean
  parallaxSpeed?: number
  blur?: boolean
}

const ParallaxV2 = Parallax as any;

const Section: React.FC<SectionProps> = ({
  bg = bgColors.none.value,
  bgImage,
  height,
  className = '',
  paddingX,
  paddingY,
  rounded,
  children,
  enableParallax,
  parallaxSpeed=500,
  blur,
}) => {
  const bgColor = bg.color;
  return (
    <ParallaxV2 
      disabled={!enableParallax}
      blur={blur ? { min: -15, max: 10 }: false}
      bgImage={bgImage?.src} strength={parallaxSpeed}
      style={{
        height: height ? height : 'auto',
        backgroundColor: bgColor,
      }}
      bgImageStyle={{
        objectFit: 'cover',
        objectPosition: 'center',  
      }}
    
      contentClassName={
        classNames( 
        'flex flex-col gap-x-2 gap-y-3 flex-wrap justify-center items-center',
        className, 'overflow-hidden', 'w-full',
        paddingX === 'none' ? 'py-0' : paddingX === 'xxl' ? 'xs:px-96 md:px-64 px-6' : paddingX === 'xl' ? 'xs:px-40 md:px-24 px-4' : paddingX === 'lg' ? 'sm:px-4 px-2' : 'sm:px-2 px-3',
        paddingY === 'none' ? 'px-0' : paddingY === 'xxl' ? 'sm:py-12 py-4' : paddingY === 'xl' ? 'sm:py-8 py-2' : paddingY === 'lg' ? 'sm:py-2 py-1' : paddingY === 'sm' ? '' : 'sm:py-1 py-1',
        rounded === 'none' ? 'rounded-[0px]' : rounded === 'sm' ? 'rounded-sm' : rounded === 'md' ? 'rounded-lgr' : 'rounded-lxl',
        )}
      
      className={classNames( 
          // 'before:conttent-[""] before:rounded-tl-full before:rounded-tr-[50%] before:block before:absolute before:translate-x-[5%] before:translate-y-[450px] before:bg-dark-200 before:right-0 before:w-[55%] before:h-[550px]',
        'flex flex-col gap-x-2 gap-y-3 flex-wrap justify-center items-center',
        className, 'overflow-hidden', 'w-full',
        // paddingX === 'none' ? 'py-0' : paddingX === 'xxl' ? 'xs:px-96 md:px-64 px-6' : paddingX === 'xl' ? 'xs:px-40 md:px-24 px-4' : paddingX === 'lg' ? 'sm:px-4 px-2' : 'sm:px-2 px-3',
        paddingY === 'none' ? 'px-0' : paddingY === 'xxl' ? 'sm:py-12 py-4' : paddingY === 'xl' ? 'sm:py-8 py-2' : paddingY === 'lg' ? 'sm:py-2 py-1' : paddingY === 'sm' ? '' : 'sm:py-1 py-1',
        rounded === 'none' ? 'rounded-[0px]' : rounded === 'sm' ? 'rounded-sm w-[99%] m-auto' : rounded === 'md' ? 'rounded-lgr w-[99%] m-auto' : 'rounded-lxl w-[99%] m-auto',
        )}
        >
        {children}
    </ParallaxV2>
  )
}

export default Section