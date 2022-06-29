import { classNames, toFixedNumber } from '@/common/helpers';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { NumberInput } from './NumberInput';

export interface ISwapInputProps {
  id?: string;
  label?: string;
  balance?: number;
  placeholder?: string;
  value?: number;
  min?: number;
  onSelectCoin?: any;
  onChange?: (value: number) => void;
  onMax?: any;
  disabled?: boolean;
  onInputError?:any
  coinSymbol?: string;
  coinIcons?: string | Array<string>;
}

export const SwapInput: React.FC<ISwapInputProps> = ({id, label='Balance', balance, placeholder, value, min=1, onSelectCoin, onChange, onMax, disabled, onInputError, coinSymbol, coinIcons}) => {
  const divRef = useRef(null);
  let ratio = useRef(0);
  
  const onMaxClick = () => {
    const maxValue = {target: {value: `${toFixedNumber(balance * 0.98, 8)}`, valueAsNumber: (toFixedNumber(balance * 0.98, 8))}};
    if(onMax) onMax(maxValue);
  }

  useEffect(() => {
    if(divRef?.current && window?.innerHeight) {
      ratio.current = innerHeight / innerWidth;
    }
  }, [divRef])
  
  const renderLogo = () => {
    if(!coinIcons) return <Image className='border-2 border-white rounded-full bg-black' src='/placeholders/img.png' alt="coin" width={100} height={100}></Image>
    if(coinIcons.length === 1 || typeof(coinIcons) === 'string') {
      return (
        <Image className='border-2 border-white rounded-full' src={typeof(coinIcons) === 'string' ? coinIcons : coinIcons[0]} alt="coin" width={100} height={100}></Image>
      )
    }
    return (
      <div className='flex justify-start items-start rounded-full'>
        {coinIcons.map((icon, index) => {
          return (
            <div key={index} className={classNames(index > 0 ? '-ml-6' : 'z-20')}>
              <Image className={classNames('rounded-full w-full')} src={icon} alt="coin" width={100} height={100}></Image>
            </div>
          )
        })}
      </div>
    )
  }

  return(
    <div ref={divRef} className='w-full flex flex-row justify-end items-center dark:bg-dark-100 dark:text-light-100 text-dark-100 bg-light-100 rounded-[15px]'>
      <div className='flex flex-col w-full px-[20px] py-[12px] min-h-[70px] gap-y-0 rounded-[15px]'>
        <NumberInput className={classNames('w-full selection:bg-accent-dark-600 dark:bg-dark-100 bg-light-100 text-standfirst focus:outline-none')} id={id} disabled={disabled} min={min} max={balance} placeholder={placeholder} value={value} onWheel={(e) => e.target.blur()} onChange={onChange} step='any' onInputError={onInputError} />
          <div className='flex items-center justify-start gap-x-1 flex-wrap'>
            {balance > 0 && <button className='text-[10px] dark:bg-dark-300 bg-light-300 dark:text-light-200 px-3 rounded-xs' onClick={onMaxClick}>
              Max
            </button>
            }
            <p className='text-[10px] dark:text-light-500 text-dark-400'>{label}: {balance?.toFixed(4) || 0}</p>
          </div>
      </div>
        <div className={classNames('flex flex-row justify-center items-center gap-x-vsm dark:bg-dark-300 bg-light-300 sm:px-vmd px-vsm py-vsm min-h-[80px] min-w-[130px] rounded-sm mr-[5px]')}>
          <div className='w-[20px] h-[20px]'>
            {renderLogo()}
          </div>
          <h6 className='font-normal'>{ !coinSymbol ? 'null' : coinSymbol?.length > 5 ? `${coinSymbol.slice(0,3)}..` : `${coinSymbol}  `}</h6>
          {onSelectCoin ?  <button onClick={onSelectCoin} ><span className='-ic-chevron text-accent-dark-200 w-[20px] h-[12px]'></span></button>: <div className='w-1'></div>}
        </div>
    </div>
  )
}