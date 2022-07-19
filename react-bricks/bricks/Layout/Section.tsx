import React, { useEffect, useRef, useState } from 'react'
import { ParallaxBanner } from 'react-scroll-parallax';

import classNames from 'classnames'
import { bgColors } from '../Shared/colors'
import { BlurAmount, Round } from '../Shared/additional'
import { useInView } from 'react-intersection-observer';
import { useAdminContext } from 'react-bricks';
import { isMobile } from 'react-device-detect';
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
  bgSize?: 'cover' | 'contain'
  height?: string
  paddingX?: number
  paddingTop?: number
  paddingBottom?: number
  rounded?: Round
  className?: string
  enableParallax?: boolean
  parallaxMoveTo?: ParallaxMoveTo
  parallaxSpeed?: number
  blur?: BlurAmount,
  style?: React.CSSProperties
}

const Section: React.FC<SectionProps> = ({
  bg = bgColors.none.value,
  bgImage,
  bgSize='cover',
  height,
  className = '',
  paddingX,
  paddingTop,
  paddingBottom='bottom',
  rounded,
  children,
  enableParallax,
  parallaxSpeed=0.5,
  parallaxMoveTo,
  blur,
  style
}) => {
  const { isAdmin } = useAdminContext();
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '150px'
  });
  const [percentage, setPercentage] = useState(0);
  const [targetElement, setElement] = useState();
  const targetRef = useRef<HTMLDivElement>();

  useEffect(() => {
    setElement(targetRef.current as any);
  }, []);

  const bgColor = bg.color;
  const initialAmount = blur === 'none' ? 0 : blur === 'lg' ? 5 : blur === 'md' ? 3 : 2;
  const isY = parallaxMoveTo === 'top' || parallaxMoveTo === 'bottom';
  const isX = parallaxMoveTo === 'left' || parallaxMoveTo === 'right';
  if(isAdmin) { //there is a bug currently with rb, that's why i am doing this...
    return (<div ref={targetRef} style={{
      ...style,
      zIndex:0,
      minHeight: height ? height : 'auto',
      backgroundColor: bgColor,
      paddingLeft: `${paddingX}px`,
      paddingRight: `${paddingX}px`,
      paddingTop: `${paddingTop}px`,
      paddingBottom: `${paddingBottom}px`,
      backdropFilter:`blur(${(percentage+1) * (initialAmount * 1.5)}px)`,
      backgroundImage: `url(${bgImage?.src})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',

    }} className={classNames(
        'flex flex-col gap-x-2 gap-y-3 flex-wrap justify-center items-center',
        className, 'overflow-hidden', 'w-full',
        rounded === 'none' ? 'rounded-[0px]' : rounded === 'sm' ? 'rounded-sm w-[99%] m-auto' : rounded === 'md' ? 'rounded-lgr w-[99%] m-auto' : 'rounded-lxl w-[99%] m-auto',
      )}>
        {children}
      </div>)
  }
  return (
    <div style={{width: '100%', height:'100%', backgroundColor: bgColor}}>
      <ParallaxBanner disabled={!enableParallax || isMobile} layers={ bgImage?.src && [
        {
          translateY: isY ? [0, parallaxMoveTo === 'top' ? -(70 * parallaxSpeed) : (70 * parallaxSpeed)] : [0, 0],
          translateX: isX ? [-10, parallaxMoveTo === 'left' ? -(70 * parallaxSpeed) : (70 * parallaxSpeed)] : [0, 0],
          image: bgImage?.src,
          scale: [1, 1.2, 'easeInOutCubic'],
          shouldAlwaysCompleteAnimation: true,
          style: {
            backgroundSize: bgSize,
            backgroundRepeat: 'no-repeat',
          },
          expanded: false,
          targetElement:targetElement,
          onProgressChange: (progress) => {
            setPercentage(progress);
          }
        }
      ] || []} className={classNames()}>
        <div ref={targetRef} style={{
        ...style,
        zIndex:0,
        minHeight: height ? height : 'auto',
        width: '100%',
        paddingLeft: `${paddingX}px`,
        paddingRight: `${paddingX}px`,
        paddingTop: `${paddingTop}px`,
        paddingBottom: `${paddingBottom}px`,
        backdropFilter:`blur(${(percentage+1) * (initialAmount * 1.5)}px)`,
      }}>
          <div ref={ref} className={
            classNames(
              'flex flex-col gap-x-2 gap-y-3 flex-wrap justify-center items-center',
              'transition-opacity duration-[800ms]', inView? 'opacity-1' : 'opacity-0',
              className, 'overflow-hidden', 'w-full',
              rounded === 'none' ? 'rounded-[0px]' : rounded === 'sm' ? 'rounded-sm w-[99%] m-auto' : rounded === 'md' ? 'rounded-lgr w-[99%] m-auto' : 'rounded-lxl w-[99%] m-auto',
            )
          }>
            {children}
          </div>
        </div>
      </ParallaxBanner>
    </div>
  )
}

export default Section