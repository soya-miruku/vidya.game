import {  ERC20Interface, useCalls } from "@usedapp/core";
import { BigNumber, Contract } from "ethers";
import { formatEther } from "@ethersproject/units";
import { useAccount } from "@/hooks/useAccount";
import TELLER_ABI from '@/contracts/abis/tellerABI.json';
import VIDYA_ABI from '@/contracts/abis/vidyaAbi.json';
import { GeneratorContext, IPoolState } from "@/common/providers/GeneratorProvider";
import { useContext, useEffect, useState } from "react";
import { getResults } from "@/contracts/helpers";

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

export const useGetUserInfo = (currentPool: IPoolState) => {
  const { library, chainId, user } = useAccount();
  const [results, setResults] = useState<any>();

  useEffect(() => {
    if(!library || !currentPool || !user) return;
    const contract = new Contract(currentPool.teller, TELLER_ABI, library.getSigner());
    contract.getUserInfo(user).then(res => {
      setResults(res);
    }).catch(err => {
      console.error(err);
    })
  }, [library, currentPool])

  return results;
}

export const useLoadUser = (currentPool: IPoolState): IGeneratorUser => {
  const { library, chainId, user } = useAccount();
  const defaultValues = { remainingUnlockTime: 0, amountCommitted: 0, claimAmount: 0, deposited: 0, commitmentStatus: false, commitmentIndex: 0, depositAvailable: 0, canWidthdraw: false, canCommit: false, approved: false, accountBalance: 0 };

  const calls = chainId === 1 && user && [
    // {
    //   contract: new Contract(currentPool.teller, TELLER_ABI),
    //   method: "getUserInfo",
    //   args: [user]
    // },
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

  const responses = useCalls(calls, {refresh: 'everyBlock', isStatic: false})
  const results = getResults(responses, defaultValues);
  const userInfo = useGetUserInfo(currentPool);

  // const info = results[0];
  const allowance = results[0];
  const balanceResult = results[1];

  const remainingUnlockTime = userInfo?.[0].toNumber() || 0;
  const amountCommitted = parseFloat(formatEther(userInfo?.[1] || BigNumber.from(0)) || '0');
  const commitmentIndex = userInfo?.[2].toNumber() || 0;
  const claimAmount = parseFloat(formatEther(userInfo?.[3] || BigNumber.from(0)) || '0');
  const deposited = parseFloat(formatEther(userInfo?.[4] || BigNumber.from(0)) || '0');
  const commitmentStatus = amountCommitted > 0;
  const approved = allowance?.[0] > 0;
 
  let depositAvailable = (deposited - amountCommitted)
  depositAvailable = depositAvailable < 0 ? 0 : depositAvailable;
  const canWidthdraw = depositAvailable > 0;
  const canCommit = depositAvailable > 0 && !commitmentStatus;

  const accountBalance = parseFloat(formatEther(balanceResult?.[0] || BigNumber.from(0)) || '0');

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