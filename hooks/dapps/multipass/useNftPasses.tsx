import { ITokenRank } from "@/components/organisms/Dapp/MultiPass/types";
import { getResults } from "@/contracts/helpers";
import { multiPassContract } from "@/contracts/multipass";
import { useAccount } from "@/hooks/useAccount"
import { formatEther } from "@ethersproject/units";
import { useCall, useCalls } from "@usedapp/core";
import { BigNumber } from "ethers";

export const useGetMultipleTokenIds = (userBalance: number) => {
  const { user, chainId } = useAccount();
  const contract = multiPassContract(chainId);
  const tokenIndexes = Array.from(Array(parseInt(userBalance.toString())).keys());

  const calls = user && contract && userBalance && tokenIndexes.map(tokenIndex => {
    return {
      contract,
      method: 'tokenOfOwnerByIndex',
      args: [user, tokenIndex]
    };
  }) || [];


  const responses = useCalls(calls, {refresh: 1, isStatic: false});
  const results = getResults(responses, 0);

  const tokenIds = results.map((result) => result?.[0]?.toNumber() || 0);
  return { tokenIds, error: null };
}

export const useGetMultipleTokenURIs = (tokenIds: number[]) => {
  const { user, chainId } = useAccount();
  const contract = multiPassContract(chainId);

  const calls = user && contract && tokenIds.map(tokenId => {
    return tokenId && {
      contract,
      method: 'tokenURI',
      args: [tokenId]
    };
  }) || [];

  const response = useCalls(calls, {refresh: 1});
  const results = getResults(response, null);
  const tokenURIs = results.map((result) => result?.[0] || null);
  return { tokenURIs, error: null };
}

export const useGetMultipleTokenRanks = (tokenIds: number[]): {tokenRanks: ITokenRank[], error:any} => {
  const { user, chainId } = useAccount();
  const contract = multiPassContract(chainId);

  const calls = user && contract && tokenIds.map(tokenId => {
    return tokenId && {
      contract,
      method: 'rank',
      args: [tokenId]
    };
  }) || [];

  const responses = useCalls(calls, {refresh: 1});

  const results = getResults(responses, 0);
 
  const tokenRanks = results.map((result) => {
    return {
      rank: typeof(result?.[0]) === 'number' ? result?.[0] : result?.[0]?.toNumber() || 0,
      level: result?.[1]?.toNumber() || 0
    }
  });
  return { tokenRanks, error: null };
}

export const useGetReservedETHForTokenLevel = (tokenLevel: number) => {
  const { user, chainId } = useAccount();
  const contract = multiPassContract(chainId);

  const { value, error } = useCall(user && contract && {
    contract,
    method: 'ETHToReceive',
    args: [tokenLevel]
  }, {refresh: 1}) ?? {}

  if(error) {
    console.error('useGetReservedETHForTokenLevel', error);
    return { reservedETH: 0, error };
  }

  const reservedETH = parseFloat(formatEther(value?.[0] || BigNumber.from(0)));

  return { reservedETH, error };
}