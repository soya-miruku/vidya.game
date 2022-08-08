import { GeneratorContext, IPoolState } from "@/common/providers/GeneratorProvider";
import { AnimatePresenceModal } from "@/components/atoms/Modal";
import { TokenInfo } from "@/common/providers/TokenListProvider";
import { SwapInput } from "@/components/atoms/SwapInput"
import { VButton } from "@/components/atoms/VButton"
import { TokenSearchModal } from "@/components/molecules/TokenSearchModal";
import { useContext, useMemo, useState } from "react";
import { VText } from "@/components/atoms/VText";

export interface IFormLayoutProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onError?: (error: string) => void;
  onInputChange?: (value: number | string) => void;
  onMax?: (e: any) => void;
  balance: number;
  buttonText: string;
  buttonDisabled?: boolean;
  buttonLoading?: boolean;
  inputDisabled?: boolean;
  inputValue?: number;
  currentPool: IPoolState;
  children?: React.ReactNode;
}

export const FormLayout: React.FC<IFormLayoutProps> = ({currentPool, buttonLoading, onMax, onInputChange, onSubmit, balance, buttonText, buttonDisabled, inputDisabled, inputValue, children, onError}) => {
  const [showCoinSearch, setShowCoinSearch] = useState(false);
  const { state, setCurrentPool } = useContext(GeneratorContext);

  const pools = useMemo(() => {
    return Object.keys(state.pools).map(name => state.pools[name]);
  }, [JSON.stringify(state.pools)])

  const handleSelectTokenChange = async (forToken:number, token: TokenInfo) => {
    if(token.address === currentPool.token) return;
    if(forToken === 0) {
      setCurrentPool(token.name);
      onInputChange(0)
    } 

    setShowCoinSearch(() => false);
  }

  const handleSelectShowCoinSearch = (open:boolean, inputSource: number) => {
    setShowCoinSearch(() => open);
  }

  return (
    <>
      <AnimatePresenceModal>{showCoinSearch &&<TokenSearchModal title="Choose a pool" showCommonList={false} forToken={0} onSelect={handleSelectTokenChange} tokenList={pools.map((pool) => {
        return {
          chainId: 1,
          symbol: pool.symbol,
          address: pool.token,
          decimals: 18,
          name: pool.name,
          logoURI: pool.image,
          source: null,
          sourceUri: '',
          common: false,
          active: true,
          additional: `APR: ${pool.apr.toFixed(2)}%`
        }
      })} onClose={() => handleSelectShowCoinSearch(false, -1)}/> }</AnimatePresenceModal>
      <form onSubmit={onSubmit} className="flex flex-col w-full gap-vmd">
        <SwapInput 
          label="Balance"
          value={inputValue}
          onMax={onMax}
          disabled={inputDisabled}
          onChange={(value) => {
            if(onInputChange) onInputChange(value);
          }}
          onInputError={onError}
          onSelectCoin={() => handleSelectShowCoinSearch(true, 0)}
          balance={balance}
          coinIcons={currentPool.image}
          coinSymbol={currentPool.symbol}>

        </SwapInput>
        {children}
        <div className="flex justify-center items-center w-full">
          <VButton isLoading={buttonLoading} disabled={buttonDisabled} type="submit" className="w-3/4" special>{buttonText}</VButton>
        </div>  
      </form>
    </>
  )
}