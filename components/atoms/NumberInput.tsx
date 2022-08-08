import React, { useMemo } from 'react';

export interface INumberInputProps {
  id?: string;
  min?: number;
  max?: number;
  step?: string;
  value?: any;
  pattern?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  onWheel?: (event: any) => void;
  onInputError?:any;
  style?: React.CSSProperties;
}

export const NumberInput: React.FC<INumberInputProps> = ({id, min=1, max=100000, pattern='^((0|[1-9]\d*)?(\.\d+)?(?:\d)(e-?(0|[1-9]\d*))?|0x[0-9a-f]+)$', step='any', disabled, className, style, value, placeholder, onWheel, onChange, onInputError, ...rest}) => {
  const preCheckNumberInputThenCallOnChange = (e) => {
    if(e.target.value === '.') {
      e.target.value = '0.';
    }

    const afterDecimal = e.target.value.toString().split('.');
    
    if(afterDecimal[0].length > 1 && (afterDecimal[0][0] === '0')) {
      e.target.value = '0';
    }

    if(max >= 0 && parseFloat(value) > max) {
      e.target.value = max;
    }

    if(afterDecimal.length > 2) {
        e.target.value = parseFloat(e.target.value);      
    }

    if(onChange) onChange(e);
  }

  const readableValue = useMemo(() => {
    if(value === undefined) return '';
    if(typeof(value) === 'number') return value.toString().slice(0, 12);
    return value.slice(0, 12);
  }, [value])

  return (
    <input disabled={disabled} onKeyDown={(event) => { 
      const regex = new RegExp(/(^((0|[1-9]\d*)?(\.\d+)?(?:\d)(e-?(0|[1-9]\d*))?|0x[0-9a-f]+)$)|(Backspace|Tab|Delete|\.|ArrowLeft|ArrowRight)/g);
      return (!event.key.match(regex)) && event.preventDefault();

    }} onWheel={onWheel} type='text' id={id} 
    className={className}
    style={style}
    value={readableValue} onChange={preCheckNumberInputThenCallOnChange} placeholder={placeholder} {...rest}></input>
  )
}