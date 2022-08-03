import React, { useState } from 'react';
import { useSprings, animated, to as interpolate } from '@react-spring/web'
import { useDrag } from 'react-use-gesture'
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

const to = i => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 })
const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
const trans = (r, s) => `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

export const DeckBase: React.FC<IDeckBaseProps> = ({ className, items, onRemove, itemClassName, itemStyle, itemRender, containerClassName, style }) => {
  const [gone] = useState(() => new Set());
  const [props, set] = useSprings(items.length, (i) => ({ ...to(i), from: from(i) }))

  const bind: any = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
    const trigger = velocity > 0.1
    const dir = xDir < 0 ? -1 : 1

    if (!down && trigger){
      gone.add(index);
      onRemove && onRemove(items[index])
    }
    
    set((i) => {
      if (index !== i) return 
      const isGone = gone.has(index)
      const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0
      const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0)
      const scale = down ? 1.1 : 1
      return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
    })

    
    if (!down && gone.size === items.length){
      setTimeout(() => {
        gone.clear();
        set((i) => to(i))
      }, 600)
    }
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
            {(itemRender && items?.[i]) && itemRender(items[i])}
          </animated.div>
        </animated.div>
      ))}
    </div>
  )
}