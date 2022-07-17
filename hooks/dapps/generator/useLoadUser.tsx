import {  ERC20Interface, useCalls } from "@usedapp/core";
import { BigNumber, Contract } from "ethers";
import { formatEther } from "@ethersproject/units";
import { useAccount } from "@/hooks/useAccount";
import TELLER_ABI from '@/contracts/abis/tellerABI.json';
import VIDYA_ABI from '@/contracts/abis/vidyaAbi.json';
import { GeneratorContext, IPoolState } from "@/common/providers/GeneratorProvider";
import { useContext } from "react";

export interface IGeneratorUser {
  remainingUnlockTime?: number;
  amountCommitted?: number;
  claimAmount?: number;
  deposited?: number;
  commitmentStatus?: boolean;
  commitmentIndex?: number;
  depositAvailable?: number;
  canWidthdraw?: boolean;
  canCommit?: boolean;
  approved?: boolean;
  accountBalance?: number;
}

export const useLoadUser = (currentPool: IPoolState): IGeneratorUser => {
  const { chainId, user } = useAccount();
  const defaultValues = { remainingUnlockTime: 0, amountCommitted: 0, claimAmount: 0, deposited: 0, commitmentStatus: false, commitmentIndex: 0, depositAvailable: 0, canWidthdraw: false, canCommit: false, approved: false, accountBalance: 0 };
  const calls = chainId === 1 && user && [
    {
      contract: new Contract(currentPool.teller, TELLER_ABI),
      method: "getUserInfo",
      args: [user]
    },
    {
      contract: new Contract(currentPool?.lptoken ? currentPool.lptoken : currentPool.token, VIDYA_ABI),
      method: "allowance",
      args: [user, currentPool.teller]
    },
    {
      contract: new Contract(currentPool?.lptoken ? currentPool.lptoken : currentPool.token, ERC20Interface),
      method: "balanceOf",
      args: [user]
    }
  ] || [];

  const results = useCalls(calls, {refresh: 1, isStatic: false})

  results.forEach((result, index) => {
    if (result && result.error) {
      console.error(result.error);
      return defaultValues;
    }
  });

  const info = results[0];
  const allowance = results[1];
  const balanceResult = results[2];

  const remainingUnlockTime = info?.value?.[0].toNumber() || 0;
  const amountCommitted = parseFloat(formatEther(info?.value?.[1] || BigNumber.from(0)) || '0');
  const commitmentIndex = info?.value?.[2].toNumber() || 0;
  const claimAmount = parseFloat(formatEther(info?.value?.[3] || BigNumber.from(0)) || '0');
  const deposited = parseFloat(formatEther(info?.value?.[4] || BigNumber.from(0)) || '0');
  const commitmentStatus = amountCommitted > 0;
  const approved = allowance?.value?.[0] > 0;
 
  let depositAvailable = (deposited - amountCommitted)
  depositAvailable = depositAvailable < 0 ? 0 : depositAvailable;

  const canWidthdraw = depositAvailable > 0;
  const canCommit = depositAvailable > 0 && !commitmentStatus;

  const accountBalance = parseFloat(formatEther(balanceResult?.value?.[0] || BigNumber.from(0)) || '0');

  return {
    remainingUnlockTime,
    amountCommitted,
    claimAmount,
    deposited,
    commitmentStatus,
    commitmentIndex,
    depositAvailable,
    approved,
    canWidthdraw,
    canCommit,
    accountBalance
  }
}


export interface ILoadedUser { 
  content: IGeneratorUser;
  pool: IPoolState;
}

export const useLoadUserPools = (pools: string[]): ILoadedUser[] => {
  const { state } = useContext(GeneratorContext);

  return pools.map(pool => {
    const poolDetail = useLoadUser(state.pools[pool]);
    return {
      content: poolDetail,
      pool: state.pools[pool]
    };
  });
}