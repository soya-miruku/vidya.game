import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { classNames } from '@/common/helpers'
import { blockNames } from '../blockNames'
import { bgColors } from '../Shared/colors';
import { LayoutProp } from '../Shared/LayoutProps';

interface EmptyProps {
}

const EmptyHero: types.Brick<EmptyProps> = ({ }) => {
  return (
    <div></div>
  )
}

EmptyHero.schema = {
  name: blockNames.VideoHero,
  label: 'Video Hero Unit',
  category: 'TeamOs-Molecules',

  getDefaultProps: () => ({
  }),
  sideEditProps: [
    LayoutProp({ colors: [bgColors.none, bgColors.dark, bgColors.light, bgColors.gray] }),
  ],
}

export default EmptyHero
