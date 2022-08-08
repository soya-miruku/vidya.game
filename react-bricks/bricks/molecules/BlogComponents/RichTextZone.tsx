import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { blockNames } from '../../blockNames'
import { DefaultColors } from '../../Shared/colors';
import { DefaultLayoutProps, LayoutProp } from '../../Shared/LayoutProps';
import Section, { SectionProps } from '../../Layout/Section';
import { PageViewSize } from '@/components/atoms/PageViewSize';
import VRBText from '../../atoms/VRBText';

interface IRichTextZoneProps extends SectionProps {
  html?: string
}

const RichTextZone: types.Brick<IRichTextZoneProps> = ({...sectionProps}) => {
  return (
    <Section {...sectionProps} className="prose px-vsm">
      <PageViewSize enabled={!sectionProps.bgImage} className="!max-w-blog">
        <VRBText size='lg' propName='html'></VRBText>
      </PageViewSize>
    </Section>
  )
}

RichTextZone.schema = {
  name: blockNames.RichTextZone,
  label: 'Rich Text Zone',
  category: 'TeamOs-Blog-elements',

  getDefaultProps: () => ({
    ...DefaultLayoutProps,
  }),
  sideEditProps: [
    LayoutProp({ colors: DefaultColors }),
  ],
}

export default RichTextZone
