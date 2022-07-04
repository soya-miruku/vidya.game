import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'
import { bgColors, DefaultColors } from '../Shared/colors';
import { DefaultLayoutProps, LayoutProp } from '../Shared/LayoutProps';
import Section, { SectionProps } from '../Layout/Section';
import { Padding } from '../Shared/additional';

interface IDetailsListUnitProps extends SectionProps {
  detailItems?: any[];
}

const DetailsListUnit: types.Brick<IDetailsListUnitProps> = ({ ...sectionProps }) => {
  return (
    <Section {...sectionProps}>
      <Repeater propName='detailItems' renderWrapper={(items) => {
        return (
          <div className="flex justify-center items-center gap-vsm flex-wrap">
            {items}
          </div>
        )
      }}></Repeater>
    </Section>
  )
}

DetailsListUnit.schema = {
  name: blockNames.DetailsListUnit,
  label: 'Detail List Unit',
  category: 'TeamOs-Molecules',

  getDefaultProps: () => ({
    ...DefaultLayoutProps,
    detailItems: [
      {
        bordered: true,
        label: 'LABEL',
        title: 'TITLE'
      },
      {
        bordered: true,
        label: 'LABEL',
        title: 'TITLE'
      },
      {
        bordered: true,
        label: 'LABEL',
        title: 'TITLE'
      },
      {
        bordered: true,
        label: 'LABEL',
        title: 'TITLE'
      },
      {
        bordered: true,
        label: 'LABEL',
        title: 'TITLE'
      }
    ]
  }),
  repeaterItems: [
    {
      name: 'detailItems',
      itemType: blockNames.DetailCard,
      itemLabel: 'Item',
      min: 1,
      max: 5
    },
  ],
  sideEditProps: [
    LayoutProp({ colors: DefaultColors }),
  ],
}

export default DetailsListUnit
