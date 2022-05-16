import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { classNames } from '@/common/helpers'
import { blockNames } from '../blockNames'
import { bgColors } from '../Shared/colors';
import { LayoutProp } from '../Shared/LayoutProps';
import { Round, Padding } from '../Shared/additional';
import { Border } from '../Layout/Section';
import CallHeroUnit, { ICallHeroUnitProps } from './CallHeroImage';

interface IPromo2HeroProps extends ICallHeroUnitProps{

}

const Promo2HeroUnit: types.Brick<IPromo2HeroProps> = ({ bg, borderBottom, borderTop, paddingX, paddingY, text, textAlign, image, imageSize, title, badgeText }) => {
  return (
    <CallHeroUnit background={false} badgeText={badgeText} bg={bg} borderBottom={borderBottom} borderTop={borderTop} rounded='lg' paddingX={paddingX} paddingY={paddingY}
    text={text} textAlign={textAlign} image={image} imagePosition='right' imageSize={imageSize} title={title}></CallHeroUnit>
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
    LayoutProp({ colors: [bgColors.none, bgColors.dark, bgColors.light, bgColors.gray] }),
  ],
}

export default Promo2HeroUnit
