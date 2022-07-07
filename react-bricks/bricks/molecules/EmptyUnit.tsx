import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'
import { DefaultColors } from '../Shared/colors';
import { DefaultLayoutProps, LayoutProp } from '../Shared/LayoutProps';
import Section, { SectionProps } from '../Layout/Section';
import { PageViewSize } from '@/components/atoms/PageViewSize';

interface IEmptySectionProps extends SectionProps {
}

const EmptySection: types.Brick<IEmptySectionProps> = ({...sectionProps}) => {
  return (
    <Section {...sectionProps}>
      <PageViewSize enabled={!sectionProps.bgImage}>
      </PageViewSize>
    </Section>
  )
}

EmptySection.schema = {
  name: blockNames.EmptySection,
  label: 'Empty Section Unit',
  category: 'TeamOs-Basics',

  getDefaultProps: () => ({
    ...DefaultLayoutProps,
  }),
  sideEditProps: [
    LayoutProp({ colors: DefaultColors }),
  ],
}

export default EmptySection
