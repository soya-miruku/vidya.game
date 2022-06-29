import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { classNames } from '@/common/helpers'
import { blockNames } from '../blockNames'
import { bgColors, DefaultColors } from '../Shared/colors';
import { DefaultLayoutProps, LayoutProp } from '../Shared/LayoutProps';
import { IPricesSectionProps, PricesSection } from '@/components/organisms/pricesSection';
import Section, { SectionProps } from '../Layout/Section';
import { Padding } from '../Shared/additional';
import { PageViewSize } from '@/components/atoms/PageViewSize';

export interface ICoinGeckoPricesSectionUnitProps extends IPricesSectionProps, SectionProps {
}

const CoinGeckoPricesSectionUnit: types.Brick<ICoinGeckoPricesSectionUnitProps> = ({ tokenId, bgImage, parallaxSpeed, enableParallax, blur, height, bg, className, paddingX, paddingY, rounded }) => {
  return (
    <Section className={classNames(className)} bg={bg} bgImage={bgImage}  parallaxSpeed={parallaxSpeed} enableParallax={enableParallax} blur={blur} height={height} paddingX={paddingX} paddingY={paddingY} rounded={rounded}>
      <PageViewSize enabled={!bgImage}>
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
