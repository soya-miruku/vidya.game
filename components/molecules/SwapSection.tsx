import { toFixedNumber } from '@/common/helpers';
import { TokenInfo, TokenListContext } from '@/common/providers/TokenListProvider';
import { EMPTY_ADDRESS } from '@/contracts/addresses';
import { useHasSetAllowance } from '@/hooks/dapps/uniswap/tokenContract';
import { useBalances } from '@/hooks/dapps/uniswap/useBalances';
import { getAmountsOut } from '@/hooks/dapps/uniswap/useGetAmountsOut';
import { useGetPair } from '@/hooks/dapps/uniswap/useGetPair';
import { useSwap, useSwapETHForExactTokens } from '@/hooks/dapps/uniswap/useSwap';
import { useAccount } from 'hooks/useAccount';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useContext } from 'react';
import { AuthenticatedView, UnAuthenticatedView } from '../atoms/AuthenticatedView';
import { SwapInput } from '../atoms/SwapInput';
import { VButton } from '../atoms/VButton';
import { VItemContainer } from '../atoms/VItemContainer';

import styles from '@/css/swap.module.scss';
import { TokenSearchModal } from './TokenSearchModal';
import { AnimatePresenceModal } from '../atoms/Modal';

export interface ISwapSectionProps {
  defaultToken0?: string;
  defaultToken1?: string;
  className?: string;
}

const DECIMALS = 7;

export const SwapSection: React.FC<ISwapSectionProps> = ({defaultToken0="ETH", defaultToken1="VIDYA", className}) => {
  const { tokenList } = useContext(TokenListContext);
  const { Connect, chainId, library } = useAccount();

  const [token0, setToken0] = useState<TokenInfo>();
  const [token1, setToken1] = useState<TokenInfo>();
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedFor, setSelectedFor] = useState<number>(-1);
  const [showCoinSearch, setShowCoinSearch] = useState(false);
  
  const [token0Balance, token1Balance] = useBalances([token0?.address || EMPTY_ADDRESS, token1?.address || EMPTY_ADDRESS]);
  const { exists } = useGetPair(token0?.address || EMPTY_ADDRESS, token1?.address || EMPTY_ADDRESS);
  const [ swapEthForTokens, state ] = useSwap(token0?.address, token1?.address, 1);

  const hasSetAllowance = useHasSetAllowance(token0?.address);

  const [token0Amount, setToken0Amount] = useState(0);
  const [token1Amount, setToken1Amount] = useState(0);

  const findToken = (symbol: string) => tokenList?.find(token => token.symbol === symbol);

  useEffect(() => {
    if(!tokenList) return;
    const token0 = findToken(defaultToken0) || tokenList[0];
    const token1 = findToken(defaultToken1) || tokenList[1];

    setToken0(() => token0 as TokenInfo)
    setToken1(() => token1 as TokenInfo)

  }, [JSON.stringify(tokenList)])

  const isValid = useMemo(() => {
    return token0 && token1 && token0Amount > 0 && token1Amount > 0 && token0Balance > 0 && token1Balance > 0 && hasSetAllowance && !isUpdating;
  }, [token0, token1, token0Amount, token1Amount, isUpdating]);

  const calculateAmountsOut = async (isFrom: boolean, amount: number) => {
    if(!token0 || !token1) return;
    return isFrom ? await getAmountsOut(chainId, library, amount, [token0.address, token1.address], exists) : await getAmountsOut(chainId, library, amount, [token1.address, token0.address], exists);
 
  };

  const handleSwitchTokens = () => {
    const temp = token0;
    setToken0(() => token1);
    setToken1(() => temp);

    setToken0Amount(() => token1Amount);
    setToken1Amount(() => token0Amount);
  }

  const handleChangeToken0Amount = async (e) => {
    setIsUpdating(() => true);
    const amount = toFixedNumber(e.target.value, DECIMALS);
    setToken0Amount(() => amount);

    const amounts = await calculateAmountsOut(true, amount);
    setToken1Amount(() => toFixedNumber(amounts, DECIMALS));
    setIsUpdating(() => false);
  }

  const handleChangeToken1Amount = async (e) => {
    setIsUpdating(() => true);
    const amount = toFixedNumber(e.target.value, DECIMALS);
    setToken1Amount(() => amount);

    const amounts = await calculateAmountsOut(false, amount);
    setToken0Amount(() => toFixedNumber(amounts, DECIMALS));
    setIsUpdating(() => false);
  }

  const handleSelectTokenChange = async (forToken:number, token: TokenInfo) => {
    if(token.address === token0?.address || token.address === token1?.address) return;

    if(forToken === 0) {
      setToken0(() => token);
      if(token0Amount > 0) {
        setToken0Amount(() => 0);
        handleChangeToken1Amount({target: {value: token1Amount}});
      }

    } else {
      setToken1(() => token);
      if(token1Amount > 0) {
        setToken1Amount(() => 0);
        handleChangeToken0Amount({target: {value: token0Amount}});
      }
    }

    setSelectedFor(() => -1);
    setShowCoinSearch(() => false);
  }

  const handleSelectShowCoinSearch = (open:boolean, inputSource: number) => {
    setShowCoinSearch(() => open);
    setSelectedFor(() => inputSource);
  }

  const handleSwap = async () => {
    if(!token0 || !token1) return;
    if(!token0Balance || !token1Balance) return;
    if(!hasSetAllowance) return;
    if(!isValid) return;

    swapEthForTokens(token0Amount, token1Amount, token1?.address);
  }

  return (
    <div className={className}>
       <AnimatePresenceModal>{showCoinSearch &&<TokenSearchModal forToken={selectedFor} onSelect={handleSelectTokenChange} tokenList={tokenList} onClose={() => handleSelectShowCoinSearch(false, -1)}/> }</AnimatePresenceModal>
      <VItemContainer widthSize='v2xl' heightSize='vhxl' dropShadow className='w-full bg-gradient-to-br p-[1px] from-aimbotsRed-100/95 to-accent-dark-200/95 backdrop-blur-sm'>
        <div className='flex flex-col sm:p-vxl p-vlrg gap-y-vlrg'>
          <div className='flex justify-between items-center'>
            <h5>Vidya Swap</h5>
            <button>
              <span className='-ic-settings text-accent-dark-200'></span>
            </button>
          </div>
          <div className='flex flex-col justify-center items-center w-full gap-y-2 text-dark-100'>
            <SwapInput 
              min={0.00000000001}
              balance={token0Balance} 
              onMax={(e) => handleChangeToken0Amount(e)} 
              onChange={handleChangeToken0Amount} 
              coinIcons={token0?.logoURI} 
              coinSymbol={token0?.symbol} 
              onSelectCoin={() => handleSelectShowCoinSearch(true, 0)} 
              value={token0Amount}/>
            <div className='absolute hover:cursor-pointer' onClick={handleSwitchTokens}>
              <div className='flex justify-center items-center border-2 dark:border-dark-300 border-light-300 p-vsm rounded-sm dark:bg-dark-100 bg-light-100'>
                <span className='-ic-swap text-accent-dark-200'></span>
              </div>
            </div>
            <SwapInput
              min={0.00000000001}
              balance={token1Balance}
              onMax={(e) => handleChangeToken1Amount(e)}
              onChange={handleChangeToken1Amount}
              coinIcons={token1?.logoURI}
              coinSymbol={token1?.symbol}
              onSelectCoin={() => handleSelectShowCoinSearch(true, 1)}
              value={token1Amount}/>
          </div>
          <AuthenticatedView>
            <div className='flex flex-col w-full justify-center items-center gap-y-1'>
              {state?.errorMessage && <p className='text-aimbotsRed-100 uppercase text-body-xs'>{state.errorMessage}</p>}
              {hasSetAllowance && <VButton disabled={!isValid} className='w-full flex justify-center' special onClick={handleSwap}>Swap</VButton>}
              {!hasSetAllowance && <VButton className='w-full flex justify-center' primary onClick={() => {}}>Allow {token0?.symbol}</VButton>}
            </div>
          </AuthenticatedView>
          <UnAuthenticatedView>
            <VButton onClick={Connect} className='w-full flex justify-center' special>Connect Wallet</VButton>
          </UnAuthenticatedView>
        </div>
      </VItemContainer>
    </div>
  )
}