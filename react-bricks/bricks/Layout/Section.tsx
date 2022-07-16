import * as React from 'react'
import { Parallax, ParallaxProps } from "react-parallax";
import classNames from 'classnames'
import { bgColors } from '../Shared/colors'
import { BlurAmount, Round } from '../Shared/additional'
import { useDetectDeviceSize } from '@/hooks/useDetectIsMobileView';
export interface IImageSource {
  src: string
  placeholderSrc?: string
  srcSet?: string
  alt?: string
  seoName?: string
}

export type ParallaxMoveTo = 'top' | 'bottom' | 'left' | 'right';
export interface SectionProps {
  bg?: { color: string; className: string }
  bgImage?: IImageSource
  bgOffsetY?: number
  height?: string
  paddingX?: number
  paddingTop?: number
  paddingBottom?: number
  rounded?: Round
  className?: string
  enableParallax?: boolean
  parallaxMoveTo?: ParallaxMoveTo
  parallaxSpeed?: number
  blur?: BlurAmount
}

const ParallaxV2 = (Parallax as any) as React.FC<ParallaxProps>;

const Section: React.FC<SectionProps> = ({
  bg = bgColors.none.value,
  bgImage,
  bgOffsetY,
  height,
  className = '',
  paddingX,
  paddingTop,
  paddingBottom='bottom',
  rounded,
  children,
  enableParallax,
  parallaxSpeed=500,
  parallaxMoveTo,
  blur,
}) => {
  const { isMobileView } = useDetectDeviceSize();
  const bgColor = bg.color;
  const initialAmount = blur === 'none' ? 0 : blur === 'lg' ? 3 : blur === 'md' ? 2 : 1;
  return (
    <ParallaxV2 
      disabled={!enableParallax || isMobileView}
      bgImage={(parallaxMoveTo === 'bottom' || parallaxMoveTo === 'top') && bgImage?.src || ''} 
      strength={parallaxMoveTo === 'bottom' ? parallaxSpeed : parallaxMoveTo === 'top' ? -parallaxSpeed : 0}
      renderLayer={percentage => {
      return (
        <div
            style={{
                position: 'absolute',
                left: '-20%',
                top: '0%',
                ...{...(parallaxMoveTo === 'left' || parallaxMoveTo === 'right') && enableParallax && {
                  backgroundImage: `url(${bgImage?.src})`,
                  backgroundSize: 'contain',
                  backgroundPositionX: `${(percentage * (parallaxSpeed/1000)) * 100}%`,
                  backgroundRepeat: 'no-repeat',
                }},
                backdropFilter: `blur(${percentage * (initialAmount * 1.5)}px)`,
                width: `${100+(percentage*20)}%`, //`${100 - (Math.abs((1 - percentage)) * 100)}%`,
                height: '100%',
            }}
        />
      )
    }}
      style={{
        zIndex:0,
        height: height ? height : 'auto',
        backgroundColor: bgColor,
        paddingLeft: `${paddingX}px`,
        paddingRight: `${paddingX}px`,
        paddingTop: `${paddingTop}px`,
        paddingBottom: `${paddingBottom}px`,
      }}
      bgStyle={{
        transform: 'filter(1.1)'
      }}
      bgImageStyle={{
        objectFit: 'cover',
        top: bgOffsetY ? `${bgOffsetY}%` : '',
      }}
      contentClassName={
        classNames(
        'flex flex-col gap-x-2 gap-y-3 flex-wrap justify-center items-center',
        className, 'overflow-hidden', 'w-full',
        rounded === 'none' ? 'rounded-[0px]' : rounded === 'sm' ? 'rounded-sm' : rounded === 'md' ? 'rounded-lgr' : 'rounded-lxl',
        )}
      
      className={classNames( 
          'flex flex-col gap-x-2 gap-y-3 flex-wrap justify-center items-center',
          className, 'overflow-hidden', 'w-full',
          rounded === 'none' ? 'rounded-[0px]' : rounded === 'sm' ? 'rounded-sm w-[99%] m-auto' : rounded === 'md' ? 'rounded-lgr w-[99%] m-auto' : 'rounded-lxl w-[99%] m-auto',
        )}
        >
        {children}
    </ParallaxV2>
  )
}

export default Section