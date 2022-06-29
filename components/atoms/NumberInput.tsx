import React from 'react';

export interface INumberInputProps {
  id?: string;
  min?: number;
  max?: number;
  step?: string;
  value?: any;
  pattern?: string;
  onChange?: (value: number) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  onWheel?: (event: any) => void;
  onInputError?:any
}

export const NumberInput: React.FC<INumberInputProps> = ({id, min=1, max=100000, pattern='^((0|[1-9]\d*)?(\.\d+)?(?:\d)(e-?(0|[1-9]\d*))?|0x[0-9a-f]+)$', step='any', disabled, className, value, placeholder, onWheel, onChange, onInputError, ...rest}) => {
  const preCheckNumberInputThenCallOnChange = (e) => {
    // if(e.target.value === '.') {
    //   e.target.value = '0.';
    // }

    // const afterDecimal = e.target.value.toString().split('.');
    
    // if(afterDecimal[0].length > 1 && (afterDecimal[0][0] === '0')) {
    //   e.target.value = '0';
    // }

    // if(max >= 0 && parseFloat(value) > max) {
    //   e.target.value = max;
    // }

    // if(afterDecimal.length > 2) {
    //     e.target.value = parseFloat(e.target.value);      
    // }

    if(onChange) onChange(e);
  }

  return (
    <input disabled={disabled} onKeyDown={(event) => { 
      const regex = new RegExp(/(^((0|[1-9]\d*)?(\.\d+)?(?:\d)(e-?(0|[1-9]\d*))?|0x[0-9a-f]+)$)|(Backspace|Tab|Delete|\.|ArrowLeft|ArrowRight)/g);
      return (!event.key.match(regex)) && event.preventDefault();

    }} min={min} onWheel={onWheel} max={max} type='number' step={step} id={id} 
    className={className}
    value={value} onChange={preCheckNumberInputThenCallOnChange} placeholder={placeholder} {...rest}></input>
  )
}