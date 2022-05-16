import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export interface ICoinGeckoTokenData {
  id: string;
  name?: string;
  symbol: string;
  image?: string;
  contractAddress?: string;
  currentPrice?: {
    usd?: {
      value: number;
      changePercentage24h: number;
      changePercentage7d: number;
    }
    eth?: {
      value: number;
      changePercentage24h: number;
    };
  };
  marketCap?: {
    usd?: {
      value: number;
      changePercentage24h: number;
    }
    eth?: {
      value: number;
      changePercentage24h: number;
    };
  };

  totalSupply?: number;
  circulatingSupply?: number;

  volume?: {
    usd?: {
      value: number;
      changePercentage24h: number;
    }
    eth?: {
      value: number;
      changePercentage24h: number;
    };
  }
  lastUpdated?: string;
}

export const useCoinGeckoTokenData = (token: string) => {
  const [data, setData] = useState<ICoinGeckoTokenData|null>();
  const { data: tokenData, isLoading, isError } = useQuery(
    `token-${token}`,
    async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${token}`
      );
      const json = await response.json();
      return json;
    },
    {
      refetchOnWindowFocus: false,
      refetchInterval: 1000 * 60 * 60,
    }
  );

  useEffect(() => {
    if (tokenData) {
      setData(() => {
        return {
          id: tokenData.id,
          name: tokenData.name,
          symbol: tokenData.symbol,
          image: tokenData.image?.large || tokenData.image?.small,
          contractAddress: tokenData.contract_address,

          currentPrice: {
            usd: {
              value: parseFloat(tokenData.market_data?.current_price?.usd) || 0,
              changePercentage24h: parseFloat(tokenData.market_data?.price_change_percentage_24h) || 0,
              changePercentage7d: parseFloat(tokenData.market_data?.price_change_percentage_7d) || 0,
            },
            eth: {
              value: parseFloat(tokenData.market_data?.current_price?.eth) || 0,
              changePercentage24h: parseFloat(tokenData.market_data?.price_change_percentage_1h_in_currency?.eth) || 0,
            }
          },
          marketCap: {
            usd: {
              value: parseFloat(tokenData.market_data?.market_cap?.usd) || 0,
              changePercentage24h: parseFloat(tokenData.market_data?.market_cap_change_percentage_24h_in_currency?.usd || 0)
            },
            eth: {
              value: parseFloat(tokenData.market_data?.market_cap?.eth) || 0,
              changePercentage24h: parseFloat(tokenData.market_data?.market_cap_change_percentage_24h_in_currency?.eth || 0)
            }
          },
          volume: {
            usd: {
              value: parseFloat(tokenData.market_data?.total_volume?.usd || 0),
              changePercentage24h: 0,
            },
            eth: {
              value: parseFloat(tokenData.market_data?.total_volume?.eth || 0),
              changePercentage24h: 0,
            }
          },
          totalSupply: parseFloat(tokenData.market_data?.total_supply || '0'),
          circulatingSupply: parseFloat(tokenData.market_data?.circulating_supply || '0'),
          lastUpdated: tokenData.market_data?.last_updated
        };
      });
    }
  }, [tokenData]);

  return { data, isLoading, isError };
}