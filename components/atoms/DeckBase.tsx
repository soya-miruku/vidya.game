import React, { useState } from 'react';
import { useSprings, animated, to as interpolate } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import styles from '@/css/deck.module.scss';
import { classNames } from '@/common/helpers';

export interface IDeckBaseProps {
  className?: string;
  style?: React.CSSProperties;
  itemClassName?: string;
  containerClassName?: string;
  itemStyle?: React.CSSProperties;
  itemRender: (item: any) => React.ReactNode;
  items: any[]
  onRemove ?: (item: any) => void;
}

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = i => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 })
const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) => `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

export const DeckBase: React.FC<IDeckBaseProps> = ({ className, items, onRemove, itemClassName, itemStyle, itemRender, containerClassName, style }) => {
  const [gone] = useState(() => new Set());
  const [props, api] = useSprings(items.length, i => ({
    ...to(i),
    from: from(i)
  }));

  const bind: any = useDrag(({ args: [index], active, delta: [xDelta], down, movement: [mx], direction: [xDir], velocity: [vx] }) => {
    const trigger = vx > 0.2 // If you flick hard enough it should trigger the card to fly out
    if (!active && trigger){
      gone.add(index)
      onRemove && onRemove(items[index])
    } 
    api.start(i => {
      if (index !== i) return // We're only interested in changing spring-data for the current spring
      const isGone = gone.has(index)
      const x = isGone ? (200 + window.innerWidth) * xDir : down ? xDelta : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
      const rot = mx / 100 + (isGone ? xDir * 10 * vx : 0) // How much the card tilts, flicking it harder makes it rotate faster
      const scale = active ? 1.1 : 1 // Active cards lift up a bit
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: active ? 800 : isGone ? 200 : 500 },
      }
    })
    if (!active && gone.size === items.length)
      setTimeout(() => {
        gone.clear()
        api.start(i => to(i))
      }, 600)
  })
  return (
    <div className={classNames('flex w-full h-full justify-center items-center relative', containerClassName)}>
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div className={classNames(styles.deck, className)} key={i} style={{
          ...style,
          x,
          y 
        }}>
          <animated.div className={itemClassName} {...bind(i)} style={{
              transform: interpolate([rot, scale], trans),
              ...itemStyle
            }}>
            {itemRender && itemRender(items[i])}
          </animated.div>
        </animated.div>
      ))}
    </div>
  )
}