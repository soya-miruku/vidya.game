import React from 'react'
import { types } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'
import { bgColors, DefaultColors } from '../Shared/colors';
import Section, { SectionProps } from '../Layout/Section';
import { DefaultLayoutProps, LayoutProp } from '../Shared/LayoutProps';
import { GamesListSection } from '@/components/organisms/gamesListSection';
import { PageViewSize } from '@/components/atoms/PageViewSize';
import VRBTitle from '../atoms/VRBTitle';

interface IGameListProps extends SectionProps {
  maxItems?: number,
  title?: string,
}

const GameListUnit: types.Brick<IGameListProps> = ({ maxItems, ...sectionProps }) => {
  return (
    <Section {...sectionProps} className="prose">
      <PageViewSize className='w-full flex justify-center flex-col items-center'>
        <VRBTitle className='text-center w-full opacity-60' type='h3' propName='title'></VRBTitle>
        <GamesListSection limit={maxItems}/>
      </PageViewSize>
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
    title: 'Other Games',
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
