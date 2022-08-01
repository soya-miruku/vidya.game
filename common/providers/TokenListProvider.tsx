import { useEffect, useReducer, useState, useMemo, createContext } from 'react';
import { toChecksumAddress } from 'web3-utils';
import { useTokenList } from '@usedapp/core';
import { ETH_ICON, SOURCES } from '@/common/constants';
import { useAccount } from '@/hooks/useAccount';
import { ETH_ADDRESS } from '@/contracts/addresses';

export interface TokenInfo {
  chainId: number;
  symbol: string;
  address: string;
  decimals: number;
  name: string;
  logoURI: string;
  source?: string;
  sourceUri?: string;
  common?: boolean;
  active?: boolean;
  additional?: any;
}

type TokenListState = {
  tokenList: TokenInfo[];
  inactiveTokenList: TokenInfo[];
  commonTokenList: TokenInfo[];
  source: string;
  changeSource: (source: string) => void;
}

const initialState = {
  tokenList: [],
  inactiveTokenList: [],
  commonTokenList: [],
  source: SOURCES.Uniswap,
}

export const TokenListContext = createContext<TokenListState | null>(null);

const ACTIONS = {
  SET_DEFAULT_TOKEN_LIST: 'SET_DEFAULT_TOKEN_LIST',
  SET_INACTIVE_TOKEN_LIST: 'SET_INACTIVE_TOKEN_LIST',
  SET_COMMON_TOKEN_LIST: 'SET_COMMON_TOKEN_LIST',
  SET_SOURCE: 'SET_SOURCE'
}

const additionalTokens = [
  {
    address: '0x3d3d35bb9bec23b06ca00fe472b50e7a4c692c30',
    name: 'vidya',
    symbol: 'VIDYA',
    chainId: 1,
    decimals: 18,
    active: true,
    common: true,
    logoURI: 'https://assets.coingecko.com/coins/images/12219/small/VIDYA_TOKEN.png?1598240425',
    source: 'CoinGecko'
  }, 
  {
    address: ETH_ADDRESS,
    name: 'Ether',
    symbol: 'ETH',
    chainId: 1,
    decimals: 18,
    active: true,
    common: true,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    source: 'CoinGecko'
  },
  {
    address: '0x0cbcafd9f1b9d7c41b6f55bbdde06bee3aa7b791',
    name: 'vidya',
    symbol: 'VIDYA',
    chainId: 3,
    decimals: 18,
    active: true,
    common: true,
    logoURI: 'https://assets.coingecko.com/coins/images/12219/small/VIDYA_TOKEN.png?1598240425',
    source: 'CoinGecko'
  }, 
  {
    address: ETH_ADDRESS,
    name: 'Ether',
    symbol: 'ETH',
    chainId: 3,
    decimals: 18,
    active: true,
    common: true,
    logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    source: 'CoinGecko'
  },

]

const preprocessTokenList = (tokenList: TokenInfo[], active=true) => {
  console.log(tokenList.filter(t=>t.symbol === 'USDC'))
  return tokenList ? tokenList.map(token => {
    let url = token?.logoURI; 
    
    if(!url) {
      url = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${toChecksumAddress(token.address)}/logo.png`
    }
    
    if(url.includes('ipfs://')) {
      url = url.replace('ipfs://', 'https://ipfs.io/ipfs/');
    }

    if(token.symbol === 'ETH') {
      url = ETH_ICON;
    }

    return {
      chainId: token.chainId,
      address: token.address,
      symbol: token.symbol,
      decimals: token.decimals,
      name: token.name,
      logoURI: url,
      source: token.source,
      sourceUri: token.sourceUri,
      active,
      common: (token.symbol === 'VIDYA' || token.symbol === 'ETH' || token.symbol === 'WETH' || token.symbol === 'DAI' || token.symbol === 'USDC' || token.symbol === 'USDT' || token.symbol === 'TUSD' || token.symbol === 'WBTC'),
    }
  }) : [];
}

const reducer = (state: TokenListState, action: any) => {
  switch (action.type) {
    case ACTIONS.SET_SOURCE: {
      return {
        ...state,
        source: action.source
      }
    }
    case ACTIONS.SET_COMMON_TOKEN_LIST:
      return {
        ...state,
        commonTokenList: preprocessTokenList(action.tokenList),
      };
    case ACTIONS.SET_INACTIVE_TOKEN_LIST: 
      return {
        ...state,
        inactiveTokenList: preprocessTokenList(action.tokenList, false),
      }
    case ACTIONS.SET_DEFAULT_TOKEN_LIST:
      return {
        ...state,
        tokenList: action.tokenList,
      };
    default:
      return state;
  }
}

export const TokenListProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    changeSource: (source) => null
  });

  const { chainId } = useAccount();
  const { name, logoURI, tokens } = useTokenList(state.source) || {};
  const httpSource = logoURI && logoURI.startsWith('ipfs') ? logoURI.replace('ipfs://', 'https://ipfs.io/ipfs/') : logoURI;
  
  const setDefaultTokenList = (tokenList: TokenInfo[]): void => dispatch({ type: ACTIONS.SET_DEFAULT_TOKEN_LIST, tokenList });
  const setInactiveTokenList = (tokenList: TokenInfo[]): void => dispatch({ type: ACTIONS.SET_INACTIVE_TOKEN_LIST, tokenList });
  const setCommonTokenList = (tokenList: TokenInfo[]): void => dispatch({ type: ACTIONS.SET_COMMON_TOKEN_LIST, tokenList });
  const setSource = (source: string): void => dispatch({ type: ACTIONS.SET_SOURCE, source });

  const processedTokens = useMemo(() => {
    if(!tokens) return [];
    const tokenList = tokens.map(token => {
      return {
        chainId,
        address: token.address,
        symbol: token.symbol,
        decimals: token.decimals,
        name: token.name,
        logoURI: token.logoURI,
        source: name,
        sourceUri: httpSource,
      }
    });

    const includeAdditional = preprocessTokenList([...tokenList, ...additionalTokens]);
    const uniqueTokens = includeAdditional.reduce((acc, token) => {
      if(!acc.find(t => t.address === token.address)) {
        acc.push(token);
      }
      return acc;
    }, [] as TokenInfo[]);

    const newResults = [...uniqueTokens.filter((token) => token.chainId === chainId && token.active)];

    return newResults;
  }, [tokens, chainId]);

  useEffect(() => {
    if(!processedTokens) return;
    setDefaultTokenList(processedTokens);
    setCommonTokenList(processedTokens.filter(token => token.common));
    setInactiveTokenList(processedTokens.filter(token => !token.active));    
  }, [processedTokens]);


  return (
    <TokenListContext.Provider value={{ ...state, changeSource: setSource }}>
      {children}
    </TokenListContext.Provider>
  )
}