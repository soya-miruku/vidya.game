import { faInfoCircle } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FixedSizeList as List } from "react-window";
import React, { useState, useEffect, useContext } from 'react';
import { TokenInfo, TokenListContext } from '@/common/providers/TokenListProvider';
import { VImage } from '../atoms/VImage';

export interface ITokenListSearchProps {
  forToken?: number;
  tokenList?: TokenInfo[];
  onSelect?: (forToken:number, token: TokenInfo) => void;
  onClose?: () => void;
}

export const TokenListSearch: React.FC<ITokenListSearchProps> = ({ forToken, onSelect, onClose }) => {
  const {tokenList, commonTokenList} = useContext(TokenListContext);
  const [search, setSearch] = useState('');
  const [ results, setResults ] = useState<any>([]);
  
  useEffect(() => {
    if(!tokenList && tokenList?.length <= 0) return;
    setResults(() => tokenList || []);
  }, [tokenList])
  
  useEffect(() => {
    if(!tokenList) return;
    const delayDebounce = setTimeout(() => {
      if(!search && tokenList.length > 0) {
        setResults(tokenList || []);
        return;
      }
      else if(search && search !== '' && tokenList.length > 0) {
        setResults(tokenList.filter(token => token.symbol.toLowerCase().includes(search.toLowerCase())));
      }
    }, 620);

    return () => clearTimeout(delayDebounce);

  }, [search])

  const onSearch = (e) => {
    setSearch(e.target.value);
  }

  const onSelectToken = async (token: TokenInfo) => {
    if(onSelect) onSelect(forToken, token);
    onClose && onClose();
  }
  
  const ITEM_SIZE = 72;  
  const Row = ({ index, style }) => {
    const token = results[index];
    return (
      <div style={{...style, top: style.top}} onClick={() => {onSelectToken(token)}} key={index} className="w-full p-3 hover:shadow-sm flex flex-row justify-start items-center space-x-3 hover:rounded-xl hover:bg-zinc-200/10 hover:cursor-pointer">
        <div className='pt-2'>
          <VImage className='rounded-full' src={token?.logoURI ?? ''} width={32} height={32} alt="search-symbol-icon"/>
        </div>
        <div className='flex flex-col justify-center items-start p-0 m-0 w-full'>
          <h6 className='text-body-sm font-semibold dark:text-light-200 text-dark-200'>{token.symbol}</h6>
          <p className='dark:text-light-400 text-dark-300 text-body-xs'>{token.name}</p>
          <p className='text-gray-500 tracking-wider text-body-xs'>source: {token.source}</p>
        </div>
        <FontAwesomeIcon onClick={() => window.open(`https://${token.chainId === 3 ? 'ropsten.' : ''}etherscan.io/address/${token.address}`, '_blank')} className='w-4 h-4 dark:text-light-200 text-dark-200 dark:hover:text-accent-dark-200 hover:text-accent-dark-200' size='sm' icon={faInfoCircle}/>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full px-vlrg">
      <input onChange={onSearch} value={search} className="rounded-lg w-full p-3 text-lg dark:text-light-200 text-dark-200 dark:bg-dark-300 bg-light-300 focus:outline-none" placeholder="Search by token name or address"></input>
      <div className='h-full w-full'>
        <div className='flex flex-auto p-2 flex-wrap w-full overflow-x-clip gap-x-2'>
          {commonTokenList.map((token, i) => (
          <div onClick={() => {onSelectToken(token)}} className='hover:bg-accent-dark-200 border-[1px] hover:cursor-pointer dark:text-light-200 text-dark-200 dark:border-light-300 border-dark-500 rounded-full ml-1 pl-2 pr-2 pb-2 mt-2 flex flex-row justify-center items-center min-w-[73px]' key={`${token.name}_${i}`}>
            <div className='pt-2 w-[20px] relative'>
              <VImage className='rounded-full' src={token?.logoURI} width={100} height={100} layout="responsive" objectFit='cover' alt="common-symbol-icon"/>
            </div>
            <div className='mt-2 pl-1'>
              <h6 className='text-body-xs font-semibold'>{token.symbol}</h6>
            </div>
          </div>))}
        </div>
      </div>
      <div className='flex flex-col border-t-[1px] dark:border-zinc-700 border-zinc-300'>
        <div className="flex flex-col max-h-[460px] w-full">
          <List itemSize={ITEM_SIZE} className='w-full scrollbar-track-rounded-full scrollbar-thin dark:scrollbar-thumb-light-300 scrollbar-thumb-dark-200' height={550} width='100%' itemCount={results.length}>
            {Row}
          </List>
          {results.length <= 0 && <p className='text-center text-gray-300 mt-2 text-base'>No results found</p>}
        </div>
      </div>
      <div>
      </div>
    </div>
  )
}