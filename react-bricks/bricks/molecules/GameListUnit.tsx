import React from 'react'
import { types } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'
import { bgColors, DefaultColors } from '../Shared/colors';
import Section, { SectionProps } from '../Layout/Section';
import { DefaultLayoutProps, LayoutProp } from '../Shared/LayoutProps';
import { GamesListSection } from '@/components/organisms/gamesListSection';

interface IGameListProps extends SectionProps {
  maxItems?: number
}

const GameListUnit: types.Brick<IGameListProps> = ({ bg, bgImage, height, rounded, maxItems, paddingX, paddingTop, paddingBottom, parallaxSpeed, enableParallax, blur }) => {
  return (
    <Section parallaxSpeed={parallaxSpeed} enableParallax={enableParallax} blur={blur} bg={bg} bgImage={bgImage} rounded={rounded} height={height} paddingX={paddingX} paddingTop={paddingTop} paddingBottom={paddingBottom}>
      <GamesListSection limit={maxItems}/>
    </Section>
  )
}

GameListUnit.schema = {
  name: blockNames.GameListUnit,
  label: 'Game List Unit',
  category: 'TeamOs-Molecules',

  getDefaultProps: () => ({
    ...DefaultLayoutProps,
    maxItems: 3,
  }),
  sideEditProps: [
    LayoutProp({ colors: DefaultColors }),
    {
      name: 'maxItems',
      label: 'Max Items',
      type: types.SideEditPropType.Number,
    }
  ],
}

export default GameListUnit
