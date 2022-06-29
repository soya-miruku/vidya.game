import React from 'react'
import { types, Repeater, useAdminContext } from 'react-bricks/frontend';
import { classNames } from '@/common/helpers'
import { blockNames } from '../blockNames'
import { bgColors, DefaultColors } from '../Shared/colors';
import { LayoutProp } from '../Shared/LayoutProps';
import { IProgramHeroProps, ProgramHero } from '@/components/organisms/programHero';
import Section, { SectionProps } from '../Layout/Section';

export interface IProgramHeroUnitProps extends SectionProps, IProgramHeroProps {
}

const ProgramHeroUnit: types.Brick<IProgramHeroUnitProps> = ({ bg, enableParallax, height, parallaxSpeed, blur, rounded, bgImage, paddingX, paddingY, className, pageTitle, pageDescription, image }) => {
  const { isAdmin } = useAdminContext();
  return (
    <Section height={height} parallaxSpeed={parallaxSpeed} enableParallax={enableParallax} blur={blur} bgImage={bgImage} className={className} bg={bg} rounded={rounded} paddingX={paddingX} paddingY={paddingY}>
      <ProgramHero overrideColor={bgImage !== undefined} image={image} pageTitle={pageTitle} pageDescription={pageDescription} canEdit={isAdmin}></ProgramHero>
    </Section>
  )
}

ProgramHeroUnit.schema = {
  name: blockNames.ProgramHeroUnit,
  label: 'Program Hero Unit',
  category: 'TeamOs-Molecules',
  getDefaultProps: () => ({
    pageTitle: 'Program Hero Unit',
    pageDescription: 'Program Hero Unit',
    image: '/generator.png',
  }),
  sideEditProps: [
    LayoutProp({ colors: DefaultColors }),
  ],
}

export default ProgramHeroUnit
