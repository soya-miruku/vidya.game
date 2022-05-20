import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'
import { bgColors } from '../Shared/colors';
import { LayoutProp } from '../Shared/LayoutProps';
import Section, { Border } from '../Layout/Section';
import { Padding } from '../Shared/additional';

interface IFeaturesMedListUnitProps {
  featureItems?: any[];
  bg?: { color: string; className: string };
  borderTop?: Border;
  borderBottom?: Border;
  paddingX?: Padding
  paddingY?: Padding
}

const FeaturesMedListUnit: types.Brick<IFeaturesMedListUnitProps> = ({ bg, borderTop, borderBottom, paddingX, paddingY}) => {
  return (
    <Section bg={bg} borderTop={borderTop} borderBottom={borderBottom} paddingX={paddingX} paddingY={paddingY}>
      <Repeater propName='featureItems' renderWrapper={(items) => {
        return (
          <div className="flex justify-center items-center gap-vxl flex-wrap">
            {items}
          </div>
        )
      }}></Repeater>
    </Section>
  )
}

FeaturesMedListUnit.schema = {
  name: blockNames.FeaturesMedListUnit,
  label: 'Features Med List Unit',
  category: 'TeamOs-Molecules',

  getDefaultProps: () => ({
    bg: bgColors.none,
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
    LayoutProp({ colors: [bgColors.none, bgColors.dark, bgColors.light, bgColors.gray] }),
  ],
}

export default FeaturesMedListUnit
