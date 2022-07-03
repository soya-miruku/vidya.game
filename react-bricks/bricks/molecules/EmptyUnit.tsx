import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'
import { DefaultColors } from '../Shared/colors';
import { DefaultLayoutProps, LayoutProp } from '../Shared/LayoutProps';
import Section, { SectionProps } from '../Layout/Section';

interface IEmptySectionProps extends SectionProps {
}

const EmptySection: types.Brick<IEmptySectionProps> = ({bg, bgImage, height, paddingX, paddingTop, paddingBottom, rounded, enableParallax, parallaxSpeed=500, blur}) => {
  return (
    <Section bg={bg} bgImage={bgImage} height={height} paddingX={paddingX} paddingTop={paddingTop} paddingBottom={paddingBottom} rounded={rounded} enableParallax={enableParallax} parallaxSpeed={parallaxSpeed} blur={blur}>
      <div></div>
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
