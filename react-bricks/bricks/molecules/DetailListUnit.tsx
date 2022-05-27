import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'
import { bgColors } from '../Shared/colors';
import { LayoutProp } from '../Shared/LayoutProps';
import Section, { Border } from '../Layout/Section';
import { Padding } from '../Shared/additional';

interface IDetailsListUnitProps {
  detailItems?: any[];
  bg?: { color: string; className: string };
  borderTop?: Border;
  borderBottom?: Border;
  paddingX?: Padding
  paddingY?: Padding
}

const DetailsListUnit: types.Brick<IDetailsListUnitProps> = ({ bg, borderTop, borderBottom, paddingX, paddingY}) => {
  return (
    <Section bg={bg} borderTop={borderTop} borderBottom={borderBottom} paddingX={paddingX} paddingY={paddingY}>
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
    bg: bgColors.none,
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
    LayoutProp({ colors: [bgColors.none, bgColors.dark, bgColors.light, bgColors.gray] }),
  ],
}

export default DetailsListUnit
