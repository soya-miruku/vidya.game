import React from 'react'
import { types, Repeater, useAdminContext } from 'react-bricks/frontend';
import { classNames } from '@/common/helpers'
import { blockNames } from '../blockNames'
import { bgColors } from '../Shared/colors';
import { LayoutProp } from '../Shared/LayoutProps';
import { IProgramHeroProps, ProgramHero } from '@/components/organisms/programHero';
import Section, { Border } from '../Layout/Section';

export interface IProgramHeroUnitProps extends IProgramHeroProps {
  bg?: { color: string; className: string };
  borderTop?: Border
  borderBottom?: Border
  className?: string;
}

const ProgramHeroUnit: types.Brick<IProgramHeroUnitProps> = ({ bg, borderTop, borderBottom, className, pageTitle, pageDescription, image }) => {
  const { isAdmin } = useAdminContext();
  return (
    <Section className={className} bg={bg} borderTop={borderTop} borderBottom={borderBottom}>
      <ProgramHero image={image} pageTitle={pageTitle} pageDescription={pageDescription} canEdit={isAdmin}></ProgramHero>
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
    LayoutProp({ colors: [bgColors.none, bgColors.dark, bgColors.light, bgColors.gray] }),
  ],
}

export default ProgramHeroUnit
