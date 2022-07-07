import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'
import { DefaultColors } from '../Shared/colors';
import { DefaultLayoutProps, LayoutProp } from '../Shared/LayoutProps';
import Section, { SectionProps } from '../Layout/Section';
import { PageViewSize } from '@/components/atoms/PageViewSize';
import { GeneratorStats } from '@/components/organisms/GeneratorStats';

interface IGeneratorStatsUnitProps extends SectionProps {
}

const GeneratorStatsUnit: types.Brick<IGeneratorStatsUnitProps> = ({...sectionProps}) => {
  return (
    <Section {...sectionProps}>
      <PageViewSize enabled={!sectionProps.bgImage}>
        <GeneratorStats/>
      </PageViewSize>
    </Section>
  )
}

GeneratorStatsUnit.schema = {
  name: blockNames.GeneratorStatsUnit,
  label: 'Generator Stats Unit',
  category: 'TeamOs-Molecules-Generator',

  getDefaultProps: () => ({
    ...DefaultLayoutProps,
  }),
  sideEditProps: [
    LayoutProp({ colors: DefaultColors }),
  ],
}

export default GeneratorStatsUnit
