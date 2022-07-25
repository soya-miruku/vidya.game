import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'
import { bgColors, DefaultColors } from '../Shared/colors';
import { DefaultLayoutProps, LayoutProp } from '../Shared/LayoutProps';
import Section, { SectionProps } from '../Layout/Section';
import { Padding } from '../Shared/additional';

interface IFeaturesSmallListUnitProps extends SectionProps {
  featureItems?: any[];
}

const FeaturesSmallListUnit: types.Brick<IFeaturesSmallListUnitProps> = ({ ...sectionProps }) => {
  return (
    <Section {...sectionProps}>
      <Repeater propName='featureItems' renderWrapper={(items) => {
        return (
          <div className="flex justify-center items-center sm:gap-vxl gap-vsm flex-wrap">
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
    ...DefaultLayoutProps,
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
      max: 20
    },
  ],
  sideEditProps: [
    LayoutProp({ colors: DefaultColors }),
  ],
}

export default FeaturesSmallListUnit
