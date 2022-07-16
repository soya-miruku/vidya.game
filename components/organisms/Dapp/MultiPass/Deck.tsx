import React, { useState } from 'react';
import { useSprings, animated, to as interpolate } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'

import styles from '@/css/deck.module.scss';
import { classNames } from '@/common/helpers';
import { INFT } from './types';
import { SmallCard } from './MultiPassesListView';
import { mapRankToColors } from './helpers';

export interface IDeckProps {
  className?: string;
  items: INFT[]
  onRemove ?: (item: INFT) => void;
}

const to = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 10,
})

const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
const trans = (r: number, s: number) => `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

export const Deck: React.FC<IDeckProps> = ({ className, items, onRemove }) => {
  const [gone] = useState(() => new Set());
  const [props, api] = useSprings(items.length, i => ({
    ...to(i),
    from: from(i)
  }));

  const bind: any = useDrag(({ args: [index], active, movement: [mx], direction: [xDir], velocity: [vx] }) => {
    const trigger = vx > 0.2 // If you flick hard enough it should trigger the card to fly out
    if (!active && trigger){
      gone.add(index)
      onRemove && onRemove(items[index])
    } 
    api.start(i => {
      if (index !== i) return // We're only interested in changing spring-data for the current spring
      const isGone = gone.has(index)
      const x = isGone ? 10 * xDir : active ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
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
    <div className={classNames('flex w-full h-full justify-center items-center relative animate-spin', className)}>
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div className={styles.deck} key={i} style={{ x, y }}>
          {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
          <animated.div
            className=" animate-brightGlow"
            {...bind(i)}
            style={{
              transform: interpolate([rot, scale], trans),
              borderColor: mapRankToColors(items[i].tokenRank).bgColor
            }}
          >
            <SmallCard token={items[i]} padding displayImage></SmallCard>
          </animated.div>
        </animated.div>
      ))}
    </div>
  )
}