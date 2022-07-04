import React from 'react'
import { types } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'
import { bgColors, DefaultColors } from '../Shared/colors';
import Section, { SectionProps } from '../Layout/Section';
import { LayoutProp } from '../Shared/LayoutProps';
import { Padding } from '../Shared/additional';
import { ProgramListSection } from '@/components/organisms/programListSection';

interface IProgramListUnit extends SectionProps {
  maxItems?: number
}

const ProgramListUnit: types.Brick<IProgramListUnit> = ({ maxItems, ...sectionProps }) => {
  return (
    <Section {...sectionProps}>
      <ProgramListSection limit={maxItems}/>
    </Section>
  )
}

ProgramListUnit.schema = {
  name: blockNames.ProgramListUnit,
  label: 'Program List Unit',
  category: 'TeamOs-Molecules',

  getDefaultProps: () => ({
    bg: {
      color: '#',
      className: 'bg-gray-100 dark:bg-dark-200 bg-light-200',
    },
    borderTop: 'none',
    borderBottom: 'none',
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

export default ProgramListUnit
