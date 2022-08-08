import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { blockNames } from '../../blockNames'
import { DefaultColors } from '../../Shared/colors';
import { DefaultLayoutProps, LayoutProp } from '../../Shared/LayoutProps';
import Section, { SectionProps } from '../../Layout/Section';
import { PageViewSize } from '@/components/atoms/PageViewSize';
import VRBTitle from '../../atoms/VRBTitle';
import VRBText from '../../atoms/VRBText';

export interface ITitleWithParagraphProps extends SectionProps {
  title?: string
  paragraph?: string
}

const TitleWithParagraph: types.Brick<ITitleWithParagraphProps> = ({...sectionProps}) => {
  return (
    <Section {...sectionProps} className="prose px-vsm">
      <PageViewSize enabled={!sectionProps.bgImage} className="!max-w-blog">
        <VRBTitle type='h3' propName='title'></VRBTitle>
        <VRBText size='lg' propName='paragraph'></VRBText>
      </PageViewSize>
    </Section>
  )
}

TitleWithParagraph.schema = {
  name: blockNames.TitleWithParagraph,
  label: 'Title with paragraph',
  category: 'TeamOs-Blog-elements',

  getDefaultProps: () => ({
    ...DefaultLayoutProps,
  }),
  sideEditProps: [
    LayoutProp({ colors: DefaultColors }),
  ],
}

export default TitleWithParagraph
