import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'
import { bgColors, DefaultColors } from '../Shared/colors';
import { DefaultLayoutProps, LayoutProp } from '../Shared/LayoutProps';
import Section, { SectionProps } from '../Layout/Section';
import VRBRichText from '../atoms/VRBRichText';

interface IFeaturesMedListUnitProps extends SectionProps {
  featureItems?: any[];
  disclaimer?: string;
  showDisclaimer?: boolean;
}

const FeaturesMedListUnit: types.Brick<IFeaturesMedListUnitProps> = ({ bg, bgImage, height, rounded, disclaimer, showDisclaimer, paddingX, paddingTop, paddingBottom, enableParallax, parallaxSpeed, blur}) => {
  return (
    <Section parallaxSpeed={parallaxSpeed} enableParallax={enableParallax} blur={blur} bg={bg} bgImage={bgImage} height={height} paddingX={paddingX} paddingTop={paddingTop} paddingBottom={paddingBottom} rounded={rounded} className="flex flex-col justify-center items-center gap-y-vxl">
      <Repeater propName='featureItems' renderWrapper={(items) => {
        return (
          <div className="flex justify-center items-center gap-vmd flex-wrap">
            {items}
          </div>
        )
      }}></Repeater>
      {showDisclaimer && <VRBRichText className='px-[180px] text-center' text={disclaimer} propName='disclaimer' size='sm'></VRBRichText>}
    </Section>
  )
}

FeaturesMedListUnit.schema = {
  name: blockNames.FeaturesMedListUnit,
  label: 'Features Med List Unit',
  category: 'TeamOs-Molecules',

  getDefaultProps: () => ({
    ...DefaultLayoutProps,
    disclaimer: 'Maecenas venenatis id libero eget dapibus. Mauris ullamcorper maximus enim, et finibus tortor blandit quis. Sed est eros, dignissim et egestas id, convallis a mauris. Mauris in venenatis velit.',
    showDisclaimer: false,
    featureItems: [
      {
        bordered: true,
        title: 'TITLE',
        subtitle: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
        image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        buttonText: 'Button Text',
        secondaryBtn: true,
        primaryBtn: false,
        specialBtn: false,
        btnLink: '#'
      },
      {
        bordered: true,
        title: 'TITLE',
        subtitle: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
        image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        buttonText: 'Button Text',
        secondaryBtn: true,
        primaryBtn: false,
        specialBtn: false,
        btnLink: '#'
      }
    ]
  }),
  repeaterItems: [
    {
      name: 'featureItems',
      itemType: blockNames.FeatureCard,
      itemLabel: 'Item',
      min: 2,
      max: 2
    },
  ],
  sideEditProps: [
    LayoutProp({ colors: DefaultColors }),
    {
      name: 'showDisclaimer',
      label: 'Show Disclaimer',
      type: types.SideEditPropType.Boolean,
    }
  ],
}

export default FeaturesMedListUnit
