import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { classNames } from '@/common/helpers'
import { blockNames } from '../blockNames'
import { bgColors } from '../Shared/colors';
import { LayoutProp } from '../Shared/LayoutProps';
import { IPricesSectionProps, PricesSection } from '@/components/organisms/pricesSection';
import Section, { Border } from '../Layout/Section';
import { Padding } from '../Shared/additional';

export interface ICoinGeckoPricesSectionUnitProps extends IPricesSectionProps {
  bg?: { color: string; className: string };
  borderTop?: Border
  borderBottom?: Border
  paddingX?: Padding
  paddingY?: Padding
  className?: string;
}
const CoinGeckoPricesSectionUnit: types.Brick<ICoinGeckoPricesSectionUnitProps> = ({ tokenId, bg, borderTop, borderBottom, className, paddingX, paddingY }) => {
  return (
    <Section className={classNames(className)} bg={bg} borderTop={borderTop} borderBottom={borderBottom} paddingX={paddingX} paddingY={paddingY}>
      <PricesSection tokenId={tokenId}/>
    </Section>
  )
}

CoinGeckoPricesSectionUnit.schema = {
  name: blockNames.CoinGeckoPricesSectionUnit,
  label: 'CoinGecko Prices Unit',
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

export default CoinGeckoPricesSectionUnit
