import React from 'react'
import { types } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'
import { DefaultColors } from '../Shared/colors';
import { DefaultLayoutProps, LayoutProp } from '../Shared/LayoutProps';
import Section, { SectionProps } from '../Layout/Section';
import { PageViewSize } from '@/components/atoms/PageViewSize';
import { MultiPassStats } from '@/components/organisms/MultipassStats';

interface IMultiPassStatsUnitProps extends SectionProps {
}

const MultiPassStatsUnit: types.Brick<IMultiPassStatsUnitProps> = ({...sectionProps}) => {
  return (
    <Section {...sectionProps}>
      <PageViewSize enabled={!sectionProps.bgImage}>
        <MultiPassStats/>
      </PageViewSize>
    </Section>
  )
}

MultiPassStatsUnit.schema = {
  name: blockNames.MultiPassStatsUnit,
  label: 'Generator Stats Unit',
  category: 'TeamOs-Molecules-MultiPass',

  getDefaultProps: () => ({
    ...DefaultLayoutProps,
  }),
  sideEditProps: [
    LayoutProp({ colors: DefaultColors }),
  ],
}

export default MultiPassStatsUnit
