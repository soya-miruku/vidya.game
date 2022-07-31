import React from 'react'
import { types, Repeater, useAdminContext } from 'react-bricks/frontend';
import { classNames } from '@/common/helpers'
import { blockNames } from '../blockNames'
import { bgColors, DefaultColors } from '../Shared/colors';
import { LayoutProp } from '../Shared/LayoutProps';
import { IProgramHeroProps, ProgramHero } from '@/components/organisms/programHero';
import Section, { SectionProps } from '../Layout/Section';

export interface IProgramHeroNoImageUnitProps extends SectionProps, IProgramHeroProps {
}

const ProgramHeroNoImageUnit: types.Brick<IProgramHeroNoImageUnitProps> = ({ className, pageTitle, height, pageDescription, objectFit, ...sectionProps }) => {
  const { isAdmin } = useAdminContext();
  const hasBg = (!!sectionProps.bgImage || sectionProps.bg?.color !== 'transparent');
  return (
    <Section className={className} height={height || '80vh'} {...sectionProps}>
      <ProgramHero withImage={false} overrideColor={ hasBg } objectFit={objectFit} pageTitle={pageTitle} pageDescription={pageDescription} canEdit={isAdmin}></ProgramHero>
    </Section>
  )
}

ProgramHeroNoImageUnit.schema = {
  name: blockNames.ProgramHeroUnitNoImage,
  label: 'Program Hero With no image Unit',
  category: 'TeamOs-Molecules',
  getDefaultProps: () => ({
    pageTitle: 'Program Hero Unit',
    pageDescription: 'Program Hero Unit',
  }),
  sideEditProps: [
    LayoutProp({ colors: DefaultColors }),
  ],
}

export default ProgramHeroNoImageUnit
