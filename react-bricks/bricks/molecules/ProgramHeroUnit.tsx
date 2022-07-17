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

const ProgramHeroUnit: types.Brick<IProgramHeroUnitProps> = ({ className, pageTitle, pageDescription, image, imageHeight, imageWidth, objectFit, ...sectionProps }) => {
  const { isAdmin } = useAdminContext();
  return (
    <Section className={className} {...sectionProps}>
      <ProgramHero overrideColor={!!sectionProps.bgImage} image={image} imageHeight={imageHeight} imageWidth={imageWidth} objectFit={objectFit} pageTitle={pageTitle} pageDescription={pageDescription} canEdit={isAdmin}></ProgramHero>
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
    imageHeight: '489px',
    imageWidth: '622px',
  }),
  sideEditProps: [
    LayoutProp({ colors: DefaultColors }),
    {
      name: 'imageHeight',
      label: 'Image Height',
      type: types.SideEditPropType.Text,
    },
    {
      name: 'imageWidth',
      label: 'Image Width',
      type: types.SideEditPropType.Text,
    },
    {
      name: 'objectFit',
      type: types.SideEditPropType.Select,
      label: 'Image Fit',
      selectOptions: {
        display: types.OptionsDisplay.Select,
        options: [
          { label: 'Cover', value: 'cover' },
          { label: 'Contain', value: 'contain' },
          { label: 'Fill', value: 'fill' },
          { label: 'None', value: 'none' },
          { label: 'Scale down', value: 'scale-down' },
        ], 
      }
    },
  ],
}

export default ProgramHeroUnit
