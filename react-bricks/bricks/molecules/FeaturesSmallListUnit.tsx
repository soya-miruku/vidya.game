import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'
import { bgColors } from '../Shared/colors';
import { LayoutProp } from '../Shared/LayoutProps';
import Section, { Border } from '../Layout/Section';
import { Padding } from '../Shared/additional';

interface IFeaturesSmallListUnitProps {
  featureItems?: any[];
  bg?: { color: string; className: string };
  borderTop?: Border;
  borderBottom?: Border;
  paddingX?: Padding
  paddingY?: Padding
}

const FeaturesSmallListUnit: types.Brick<IFeaturesSmallListUnitProps> = ({ bg, borderTop, borderBottom, paddingX, paddingY}) => {
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

FeaturesSmallListUnit.schema = {
  name: blockNames.FeaturesSmallUnit,
  label: 'Features Small List Unit',
  category: 'TeamOs-Molecules',

  getDefaultProps: () => ({
    bg: bgColors.none,
    featureItems: [
      {
        bordered: true,
        label: 'LABEL',
        icon: '-ic-darkmode'
      },
      {
        bordered: true,
        label: 'LABEL',
        icon: '-ic-darkmode'
      },
      {
        bordered: true,
        label: 'LABEL',
        icon: '-ic-darkmode'
      },
      {
        bordered: true,
        label: 'LABEL',
        icon: '-ic-darkmode'
      },
      {
        bordered: true,
        label: 'LABEL',
        icon: '-ic-darkmode'
      }
    ]
  }),
  repeaterItems: [
    {
      name: 'featureItems',
      itemType: blockNames.IconCard,
      itemLabel: 'Item',
      min: 1,
      max: 5
    },
  ],
  sideEditProps: [
    LayoutProp({ colors: [bgColors.none, bgColors.dark, bgColors.light, bgColors.gray] }),
  ],
}

export default FeaturesSmallListUnit
