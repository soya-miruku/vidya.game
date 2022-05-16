import { useCoinGeckoTokenData } from 'hooks/useCoinGeckoTokenData';
import { useDetectIsMobileView } from 'hooks/useDetectIsMobileView';
import React, { useEffect, useState } from 'react';
import { VButton } from '../atoms/VButton';
import { VImage } from '../atoms/VImage';
import { VText } from '../atoms/VText';
import { BasicCard } from '../molecules/BasicCard';
import { PriceCard } from '../molecules/PriceCard';
import { PriceCardWithCustomFooter } from '../molecules/PriceCardWithCustomFooter';
import { StatCard } from '../molecules/StatCard';

export interface IPricesSectionProps {
  tokenId?: string;
}

export const PricesSection: React.FC<IPricesSectionProps> = ({tokenId = 'vidya'}) => {
  const { data, isError, isLoading } = useCoinGeckoTokenData(tokenId);
  const { isMobileView } = useDetectIsMobileView();
  const [currencySelected, setCurrencySelected] = useState('usd');

  const formatPrice = (price: number) => {
    if(!price) return '0';

    if(price > 1000000) return `${(price / 1000000).toFixed(2)}M`;
    else if(price > 100000) return `${(price / 1000).toFixed(2)}K`;
    else if(price > 10000) return `${(price / 1000).toFixed(1)}K`;
    else if(price > 1000) return `${(price / 1000).toFixed(0)}k`;
    return price.toFixed(2);
  }

  return (
    <div className='w-full h-full flex flex-col m-0 p-4 justify-center items-center flex-wrap'>
      <div className='flex sm:gap-x-16 gap-x-1 gap-y-4 flex-wrap'>
        <PriceCard length={isMobileView ? 'sm' : 'md'} label='PRICE' price={data?.currentPrice[currencySelected]?.value || 0} perctChange={data?.currentPrice[currencySelected].changePercentage24h || 0} increase="auto"></PriceCard>
        <PriceCard length={isMobileView ? 'sm' : 'md'} label='MARKET CAP' price={formatPrice(data?.marketCap[currencySelected]?.value)} perctChange={data?.marketCap[currencySelected]?.changePercentage24h || 0} increase="auto"></PriceCard>
        <PriceCard length={isMobileView ? 'sm' : 'md'} label='24HR VOL' price={formatPrice(data?.volume?.[currencySelected].value)} perctChange={data?.volume[currencySelected]?.changePercentage24h || 0} increase="auto"></PriceCard>
        <PriceCardWithCustomFooter length={isMobileView ? 'sm' : 'md'} label='TOTAL SUPPLY' price={formatPrice(data?.totalSupply)} footer={`${data?.circulatingSupply?.toFixed(2) || 0} circulating`}/>
      </div>
      <div className='px-12 pt-12 pb-4 flex justify-between items-center w-full h-full'>
        <div className='flex space-x-2'>
          <VButton padding={false} onClick={() => setCurrencySelected('usd')} secondary={currencySelected === 'usd'}>USD</VButton>
          <VButton padding={false} onClick={() => setCurrencySelected('eth')} secondary={currencySelected === 'eth'}>ETH</VButton>
        </div>
        <div className='flex space-x-4 space-x-reverse items-center'>
          <VText className='px-2' size="md">Prices provided by <strong>Coingecko</strong></VText>
          <VImage width={25} height={25} src='https://static.coingecko.com/s/thumbnail-007177f3eca19695592f0b8b0eabbdae282b54154e1be912285c9034ea6cbaf2.png'/>
        </div>
      </div>
    </div>
  )
}