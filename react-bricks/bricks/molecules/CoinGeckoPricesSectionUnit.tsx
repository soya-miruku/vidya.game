import React from 'react'
import { types } from 'react-bricks/frontend';
import { classNames } from '@/common/helpers'
import { blockNames } from '../blockNames'
import { DefaultColors } from '../Shared/colors';
import { DefaultLayoutProps, LayoutProp } from '../Shared/LayoutProps';
import { IPricesSectionProps, PricesSection } from '@/components/organisms/pricesSection';
import Section, { SectionProps } from '../Layout/Section';
import { PageViewSize } from '@/components/atoms/PageViewSize';

export interface ICoinGeckoPricesSectionUnitProps extends IPricesSectionProps, SectionProps {
}

const CoinGeckoPricesSectionUnit: types.Brick<ICoinGeckoPricesSectionUnitProps> = ({ tokenId, className, ...sectionProps }) => {
  return (
    <Section className={classNames(className)} {...sectionProps}>
      <PageViewSize enabled={!sectionProps.bgImage}>
        <PricesSection tokenId={tokenId}/>
      </PageViewSize>
    </Section>
  )
}

CoinGeckoPricesSectionUnit.schema = {
  name: blockNames.CoinGeckoPricesSectionUnit,
  label: 'CoinGecko Prices Unit',
  category: 'TeamOs-Molecules',

  getDefaultProps: () => ({
    tokenId: 'vidya',
    ...DefaultLayoutProps
  }),
  sideEditProps: [
    LayoutProp({ colors: DefaultColors }),
    {
      name: 'tokenId',
      label: 'Token Id',
      type: types.SideEditPropType.Text
    }
  ],
}

export default CoinGeckoPricesSectionUnit
