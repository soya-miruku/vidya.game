import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'
import { bgColors, DefaultColors } from '../Shared/colors';
import { LayoutProp } from '../Shared/LayoutProps';
import CallHeroUnit, { ICallHeroUnitProps } from './CallHeroImage';

interface IPromo2HeroProps extends ICallHeroUnitProps {

}

const Promo2HeroUnit: types.Brick<IPromo2HeroProps> = ({ bg, text, textAlign, image, imageSize, title, badgeText, ...sectionProps }) => {
  return (
    <CallHeroUnit background={false} badgeText={badgeText} bg={bg} rounded='lg' text={text} textAlign={textAlign} image={image} imagePosition='right' imageSize={imageSize} title={title} {...sectionProps}></CallHeroUnit>
  )
}

Promo2HeroUnit.schema = {
  name: blockNames.Promo2HeroUnit,
  label: 'Promo 2 Hero Unit',
  category: 'TeamOs-Molecules',

  getDefaultProps: () => ({
    title: 'Promo 2 Hero Unit',
    text: 'Promo 2 Hero Unit lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    badgeText: 'New',
    headerButtons: [
      {
        children: 'Button 1',
        primary: false,
        secondary: true
      }
    ],
    bg: bgColors.dark.value
  }),
  repeaterItems: [
    {
      name: 'headerButtons',
      itemType: blockNames.Button,
      itemLabel: 'Button',
      min: 0,
      max: 2 
    },
  ],
  sideEditProps: [
    LayoutProp({ colors: DefaultColors}),
  ],
}

export default Promo2HeroUnit
