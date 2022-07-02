import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { classNames } from '@/common/helpers'
import { blockNames } from '../blockNames'
import { bgColors, DefaultColors } from '../Shared/colors';
import { DefaultLayoutProps, LayoutProp } from '../Shared/LayoutProps';

interface IEmptyProps {
}

const EmptyHero: types.Brick<IEmptyProps> = ({ }) => {
  return (
    <div></div>
  )
}

EmptyHero.schema = {
  name: blockNames.VideoHero,
  label: 'Video Hero Unit',
  category: 'TeamOs-Molecules',

  getDefaultProps: () => ({
    ...DefaultLayoutProps,
  }),
  sideEditProps: [
    LayoutProp({ colors: DefaultColors }),
  ],
}

export default EmptyHero
