import {  MultiCallABI, useCalls, useMulticallAddress } from "@usedapp/core";
import { BigNumber, Contract } from "ethers";
import { useAccount } from "@/hooks/useAccount";
import { formatEther } from "@ethersproject/units";
import { CHAIN_MULTIPASS_SETTINGS, multiPassContract } from "@/contracts/multipass";
import { getResults } from "@/contracts/helpers";


export interface IMultiPassStats {
  circulatingSupply: number;
  multipassMinted: number;
  multipassBurned: number;
  levelsBrought: number;
  levelsBurned: number;
  highestLevel: number;
  pooledEther: number;
  totalLevels: number;
}

export const useMultiPassStats = (): IMultiPassStats => {
  const { chainId } = useAccount();
  const multicallAddress = useMulticallAddress();

  const defaultValues = {
    circulatingSupply: 0,
    multipassMinted: 0,
    multipassBurned: 0,
    levelsBrought: 0,
    levelsBurned: 0,
    highestLevel: 0,
    pooledEther: 0,
    totalLevels: 0
  }

  const contract = multiPassContract(chainId);

  const calls = contract && [
    {
      contract,
      method: 'topLevel',
      args: []
    },
    {
      contract,
      method: 'totalSupply',
      args: []
    },
    {
      contract,
      method: 'mintCount',
      args: []
    },
    {
      contract,
      method: 'burnCount',
      args: []
    },
    {
      contract,
      method: 'levelsBought',
      args: []
    },
    {
      contract,
      method: 'levelsBurned',
      args: []
    },
    {
      contract,
      method: "totalLevels",
      args: []
    },
    {
      contract: new Contract(multicallAddress, MultiCallABI),
      method: "getEthBalance",
      args: [CHAIN_MULTIPASS_SETTINGS[chainId].contractAddress]
    }
  ] || [];

  const responses = useCalls(calls, {refresh: 'never'});

  const results = getResults(responses, defaultValues);

  const topLevel = results[0]?.[0] || BigNumber.from(0);
  const totalSupply = results[1]?.[0] || BigNumber.from(0);
  const mintCount = results[2]?.[0] || BigNumber.from(0);
  const burnCount = results[3]?.[0] || BigNumber.from(0);
  const levelsBought = results[4]?.[0] || BigNumber.from(0);
  const levelsBurned = results[5]?.[0] || BigNumber.from(0);
  const totalLevels = results[6]?.[0] || BigNumber.from(0);
  const pooledEther = results[7]?.[0] || BigNumber.from(0);

  return {
    circulatingSupply: totalSupply?.toNumber() || 0,
    multipassMinted: mintCount?.toNumber() || 0,
    multipassBurned: burnCount?.toNumber() || 0,
    levelsBrought: levelsBought?.toNumber() || 0,
    levelsBurned: levelsBurned?.toNumber() || 0,
    highestLevel: topLevel?.toNumber() || 0,
    pooledEther: parseFloat(formatEther(pooledEther) || '0'),
    totalLevels: totalLevels?.toNumber() || 0
  }
}