import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'
import { bgColors, DefaultColors } from '../Shared/colors';
import { LayoutProp } from '../Shared/LayoutProps';
import CallHeroUnit, { ICallHeroUnitProps } from './CallHeroImage';

interface IPromo1HeroProps extends ICallHeroUnitProps {

}

const Promo1HeroUnit: types.Brick<IPromo1HeroProps> = ({ bg, parallaxSpeed, enableParallax, blur, rounded, paddingX, paddingY, text, textAlign, image, imageSize, title, badgeText }) => {
  return (
    <CallHeroUnit parallaxSpeed={parallaxSpeed} enableParallax={enableParallax} blur={blur} background={true} badgeText={badgeText} bg={bg} rounded={rounded} paddingX={paddingX} paddingY={paddingY}
    text={text} textAlign={textAlign} image={image} imagePosition='right' imageSize={imageSize} title={title}></CallHeroUnit>
  )
}

Promo1HeroUnit.schema = {
  name: blockNames.Promo1HeroUnit,
  label: 'Promo 1 Hero Unit',
  category: 'TeamOs-Molecules',

  getDefaultProps: () => ({
    title: 'Promo 1 Hero Unit',
    text: 'Promo 1 Hero Unit lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    badgeText: 'New',
    headerButtons: [
      {
        children: 'Button 1',
        secondary: true
      }
    ],
    bg: bgColors.none.value
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
    LayoutProp({ colors: DefaultColors }),
  ],
}

export default Promo1HeroUnit
