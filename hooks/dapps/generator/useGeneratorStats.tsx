import { useEffect } from "react";
import {  useCalls } from "@usedapp/core";
import { BigNumber, Contract } from "ethers";

import { useAccount } from "@/hooks/useAccount";
import { CHAIN_GENERATOR_SETTINGS } from "@/contracts/generator";
import VAULT_ABI from '@/contracts/abis/vaultAbi.json';
import { formatEther } from "@ethersproject/units";
export interface IGeneratorStats {
  totalDistributed: number;
  vidyaRate: number;
}

export const useGeneratorStats = (): IGeneratorStats => {
  const { chainId } = useAccount();

  const defaultValues = {
    totalDistributed: 0,
    vidyaRate: 0
  }

  const calls = chainId === 1 && [
    {
      contract: new Contract(CHAIN_GENERATOR_SETTINGS[chainId].vaultAddress, VAULT_ABI),
      method: "totalDistributed",
      args: []
    },
    {
      contract: new Contract(CHAIN_GENERATOR_SETTINGS[chainId].vaultAddress, VAULT_ABI),
      method: "vidyaRate",
      args: []
    }
  ] || [];

  const results = useCalls(calls, {refresh: 'never', isStatic: false})

  results.forEach((result, index) => {
    if (result && result.error) {
      console.error(result.error);
      return defaultValues;
    }
  });

  const totalDistributed = parseFloat(formatEther(results[0]?.value?.[0] || BigNumber.from(0)) || '0');
  const vidyaRate = parseFloat(formatEther(results[1]?.value?.[0] || BigNumber.from(0)) || '0');

  return {
    totalDistributed,
    vidyaRate
  }
}