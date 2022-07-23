import { classNames, toFixedNumber } from '@/common/helpers';
import React, { useEffect } from 'react';
import { useRef } from 'react';
import { NumberInput } from './NumberInput';
import { VImage } from './VImage';

export interface ISwapInputProps {
  id?: string;
  label?: string;
  balance?: number;
  placeholder?: string;
  value?: number | string;
  min?: number;
  onSelectCoin?: any;
  onChange?: (value: number | string) => void;
  onMax?: any;
  disabled?: boolean;
  onInputError?:any
  coinSymbol?: string;
  coinIcons?: string | Array<string>;
}

export const SwapInput: React.FC<ISwapInputProps> = ({id, label='Balance', balance, placeholder, value, min=0, onSelectCoin, onChange, onMax, disabled, onInputError, coinSymbol, coinIcons}) => {
  const divRef = useRef(null);
  let ratio = useRef(0);
  
  const onMaxClick = () => {
    // const maxValue = {target: {value: `${toFixedNumber(balance * 0.9995, 8)}`, valueAsNumber: (toFixedNumber(balance * 0.9995, 8))}};
    if(onMax) onMax(toFixedNumber(balance * 0.9995, 8));
  }

  useEffect(() => {
    if(divRef?.current && window?.innerHeight) {
      ratio.current = innerHeight / innerWidth;
    }
  }, [divRef])
  
  const renderLogo = () => {
    if(!coinIcons) return <VImage className='border-2 border-white rounded-full bg-black' src='/placeholders/img.png' alt="coin" width={100} height={100}></VImage>
    if(coinIcons.length === 1 || typeof(coinIcons) === 'string') {
      return (
        <VImage className='border-2 border-white rounded-full' src={typeof(coinIcons) === 'string' ? coinIcons : coinIcons[0]} alt="coin" width={100} height={100}></VImage>
      )
    }
    return (
      <div className='flex justify-start items-start rounded-full'>
        {coinIcons.map((icon, index) => {
          return (
            <div key={index} className={classNames(index > 0 ? '-ml-6' : 'z-20')}>
              <VImage className={classNames('rounded-full w-full')} src={icon} alt="coin" width={100} height={100}></VImage>
            </div>
          )
        })}
      </div>
    )
  }

  return(
    <div ref={divRef} className={classNames('w-full flex flex-row justify-end items-center rounded-[15px]', 
      disabled ? 'dark:bg-dark-200 bg-light-300 text-gray-400': 'dark:bg-dark-100 bg-light-100 text-dark-100 dark:text-light-100')}>
      <div className='flex flex-col w-full px-[20px] py-[12px] min-h-[70px] gap-y-0 rounded-[15px]'>
        <NumberInput className={classNames('w-full disabled:dark:bg-dark-200 disabled:bg-light-300 selection:bg-accent-dark-600 dark:bg-dark-100 bg-light-100 text-2xl focus:outline-none')} 
          id={id} disabled={disabled} min={min} max={balance} placeholder={placeholder} value={value} onWheel={(e) => e.target.blur()} 
          onChange={(e) => {
            const value = e.target.value;
            // console.log('the value', value)
            // let valNumber;
            // if(value === '0.') {
            //   console.log('yes')
            //   valNumber = 0.0;
            // }
            // else {
            //   console.log(value)
            //   valNumber = Number(value);
            // }

            // if(valNumber < min) {
            //   console.log('lol')
            //   valNumber = min;
            // }

            // if(valNumber > balance) {
            //   valNumber = balance;
            // }

            if(onChange) onChange(value);
          }} step='any' onInputError={onInputError} />
          <div className='flex items-center justify-start gap-x-1 flex-wrap'>
            {balance > 0 && <button disabled={disabled} type='button' className='text-[10px] dark:bg-dark-300 bg-light-300 dark:text-light-200 px-3 rounded-xs' onClick={onMaxClick}>
              Max
            </button>
            }
            <p className='text-[10px] dark:text-light-500 text-dark-400'>{label}: {balance?.toFixed(4) || 0}</p>
          </div>
      </div>
        <div className={classNames('flex flex-row justify-center items-center gap-x-vsm dark:bg-dark-300 bg-light-300 sm:px-vmd px-vsm py-vsm min-h-[70px] min-w-[130px] rounded-sm mr-[5px]')}>
          <div className='w-[20px] h-[20px]'>
            {renderLogo()}
          </div>
          <h6 className='font-normal text-dark-100 dark:text-light-100'>{ !coinSymbol ? 'null' : coinSymbol?.length > 5 ? `${coinSymbol.slice(0,3)}..` : `${coinSymbol}  `}</h6>
          {onSelectCoin ?  <button type='button' onClick={onSelectCoin} ><span className='-ic-chevron text-accent-dark-200 w-[20px] h-[12px]'></span></button>: <div className='w-1'></div>}
        </div>
    </div>
  )
}