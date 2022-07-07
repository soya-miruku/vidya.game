import { useContext } from "react";
import {  useCalls } from "@usedapp/core";
import { BigNumber, Contract } from "ethers";

import { useAccount } from "@/hooks/useAccount";
import { GeneratorContext, IGeneratorStats } from "@/common/providers/GeneratorProvider";
import { CHAIN_GENERATOR_SETTINGS } from "@/contracts/generator";
import VAULT_ABI from '@/contracts/abis/vaultAbi.json';
import { formatEther } from "@ethersproject/units";

export const useGeneratorStats = (): IGeneratorStats => {
  const { chainId } = useAccount();
  const { setStats } = useContext(GeneratorContext);

  const defaultValues = {
    totalDistributed: 0,
    timeToCalculateRate: 0,
    vidyaRate: 0
  }
  
  if(chainId !== 1) {
    return defaultValues;
  }

  const contract = new Contract(CHAIN_GENERATOR_SETTINGS[chainId].vaultAddress, VAULT_ABI);
  const results = useCalls([
    {
      contract,
      method: "totalDistributed",
      args: []
    },
    // {
    //   contract,
    //   method: "timeToCalculateRate",
    //   args: []
    // },
    {
      contract,
      method: "vidyaRate",
      args: []
    }
  ],)

  results.forEach((result, index) => {
    if (result && result.error) {
      console.error(result.error);
    }
  }, { refresh: 'never'});

  const totalDistributed = parseFloat(formatEther(results[0]?.value?.[0] || BigNumber.from(0)) || '0');
  // const timeToCalculateRate = parseFloat(formatEther(results[1]?.value?.[0] || BigNumber.from(0)) || '0') * 1000000000000000000;
  const vidyaRate = parseFloat(formatEther(results[1]?.value?.[0] || BigNumber.from(0)) || '0');

  console.log('totalDistributed', totalDistributed);
  // console.log('timeToCalculateRate', timeToCalculateRate);
  console.log('vidyaRate', vidyaRate);

  setStats({
    totalDistributed,
    // timeToCalculateRate,
    vidyaRate
  })

  return {
    totalDistributed,
    // timeToCalculateRate,
    vidyaRate
  }
}