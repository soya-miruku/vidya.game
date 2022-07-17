import { useCoinGeckoTokenData } from 'hooks/useCoinGeckoTokenData';
import { useDetectDeviceSize } from 'hooks/useDetectIsMobileView';
import React, { useState } from 'react';
import { VButton } from '../atoms/VButton';
import { VImage } from '../atoms/VImage';
import { VTabs } from '../atoms/VTabs';
import { VText } from '../atoms/VText';
import { PriceCard } from '../molecules/PriceCard';
import { PriceCardWithCustomFooter } from '../molecules/PriceCardWithCustomFooter';

export interface IPricesSectionProps {
  tokenId?: string;
  source?: 'coinGecko' | 'coinMarketCap';
}

export const PricesSection: React.FC<IPricesSectionProps> = ({tokenId = 'vidya', source="coinGecko"}) => {
  const { data, isError, isLoading } = useCoinGeckoTokenData(tokenId);
  const [currencySelected, setCurrencySelected] = useState('usd');

  const formatPrice = (price: number) => {
    if(!price) return '0';

    if(price > 1000000) return `${(price / 1000000).toFixed(1)}M`;
    else if(price > 100000) return `${(price / 1000).toFixed(2)}K`;
    else if(price > 10000) return `${(price / 1000).toFixed(1)}K`;
    else if(price > 1000) return `${(price / 1000).toFixed(0)}k`;
    return price.toFixed(2);
  }

  const formatDecimals = (price: number) => {
    if(!price) return 0;
    if(Math.abs(price) > 0.01) return price.toFixed(2)
    else if(Math.abs(price) > 0.001) return price.toFixed(3)
    else if(Math.abs(price) > 0.0001) return price.toFixed(4)
    else if(Math.abs(price) > 0.00001) return price.toFixed(5)
    else return price.toFixed(7)
  }

  return (
    <div className='w-full h-full flex flex-col justify-center items-center '>
      <div className='w-full grid justify-center place-items-center justify-items-center grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-2 gap-vxl tablet:gap-vlrg mobile:gap-vlrg p-vlrg'>
        <PriceCard length={ 'md'} height={'xs'} label='PRICE' price={formatDecimals(data?.currentPrice[currencySelected]?.value)} perctChange={formatDecimals(data?.currentPrice[currencySelected].changePercentage24h)} increase="auto"></PriceCard>
        <PriceCard length={'md'} height={'xs'} label='MARKET CAP' price={formatPrice(data?.marketCap[currencySelected]?.value)} perctChange={data?.marketCap[currencySelected]?.changePercentage24h.toFixed(2) || 0} increase="auto"></PriceCard>
        <PriceCard length={'md'} height={'xs'} label='24HR VOL' price={formatPrice(data?.volume?.[currencySelected].value)} perctChange={data?.volume[currencySelected]?.changePercentage24h || 0} increase="auto"></PriceCard>
        <PriceCardWithCustomFooter length={'md'} height={'xs'} label='TOTAL SUPPLY' price={formatPrice(data?.totalSupply)} footer={`${formatPrice(data?.circulatingSupply)} circulating`}/>
      </div>
      <div className='pt-0 p-vlrg flex justify-between items-center w-full h-full'>
        <VTabs items={[{label: 'USD', value: 'usd'},{label: 'ETH', value: 'eth'}]} onChange={(val) => setCurrencySelected(val)}/>
        <div className='flex space-x-4 space-x-reverse items-center hover:cursor-pointer' onClick={() => window.open('https://www.coingecko.com/en/coins/vidya', '_blank')}>
          <VText className='px-2' size="sm">Prices provided by <strong>Coingecko</strong></VText>
          <VImage width={25} height={25} src='https://static.coingecko.com/s/thumbnail-007177f3eca19695592f0b8b0eabbdae282b54154e1be912285c9034ea6cbaf2.png'/>
        </div>
      </div>
    </div>
  )
}