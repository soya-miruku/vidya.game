import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { classNames } from '@/common/helpers'
import { blockNames } from '../blockNames'
import { bgColors } from '../Shared/colors';
import { LayoutProp } from '../Shared/LayoutProps';
import { IPricesSectionProps, PricesSection } from '@/components/organisms/pricesSection';
import Section, { Border } from '../Layout/Section';

export interface IPricesSectionUnitProps extends IPricesSectionProps {
  bg?: { color: string; className: string };
  borderTop?: Border
  borderBottom?: Border
  className?: string;
}
const PricesSectionUnit: types.Brick<IPricesSectionUnitProps> = ({ tokenId, bg, borderTop, borderBottom, className }) => {
  return (
    <Section className={className} bg={bg} borderTop={borderTop} borderBottom={borderBottom}>
      <PricesSection tokenId={tokenId}/>
    </Section>
  )
}

PricesSectionUnit.schema = {
  name: blockNames.PricesSectionUnit,
  label: 'Prices Unit',
  category: 'TeamOs-Molecules',

  getDefaultProps: () => ({
    tokenId: 'vidya'
  }),
  sideEditProps: [
    LayoutProp({ colors: [bgColors.none, bgColors.dark, bgColors.light, bgColors.gray] }),
    {
      name: 'tokenId',
      label: 'Token Id',
      type: types.SideEditPropType.Text
    }
  ],
}

export default PricesSectionUnit
