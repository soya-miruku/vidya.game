import {  useCall } from "@usedapp/core";
import { BigNumber, Contract } from "ethers";
import { formatEther } from "@ethersproject/units";
import UNISWAP_POOL_ABI from '@/contracts/abis/uniswapPair.json';

export const useReserves = (poolAddress: string) => {
  const { value, error } = useCall(poolAddress && {
    contract: new Contract(poolAddress, UNISWAP_POOL_ABI),
    method: "getReserves",
    args: []
  }, {refresh: 'never'}) ?? {
    value: [],
    error: null
  }

  if(error) {
    // console.log(poolAddress)
    // console.error('reserver error!', error)
    return {
      reserve0: 0,
      reserve1: 0
    }
  }

  const reserve0 = parseFloat(formatEther(value?.[0] || BigNumber.from(0)) || '0');
  const reserve1 = parseFloat(formatEther(value?.[1] || BigNumber.from(0)) || '0');
  
  return {
    reserve0,
    reserve1
  }
}

export const useTotalSupply = (poolAddress: string) => {
  const { value, error } = useCall(poolAddress && {
    contract: new Contract(poolAddress, UNISWAP_POOL_ABI),
    method: "totalSupply",
    args: []
  }, {refresh: 'never'}) ?? {
    value: [],
    error: null
  }

  if(error) {
    console.error('total supply error!', error)
    return 0
  }

  return parseFloat(formatEther(value?.[0] || BigNumber.from(0)) || '0');
}