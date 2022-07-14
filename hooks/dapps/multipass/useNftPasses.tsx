import { multiPassContract } from "@/contracts/multipass";
import { useAccount } from "@/hooks/useAccount"
import { formatEther } from "@ethersproject/units";
import { useCall, useCalls } from "@usedapp/core";
import { BigNumber } from "ethers";

export const useTokenURI = (tokenId: number) => {
  const { user, chainId } = useAccount();
  const contract = multiPassContract(chainId);

  const { value, error } = useCall(user && contract && {
    contract,
    method: 'tokenURI',
    args: [tokenId]
  }, {}) ?? {};

  if(error) {
    console.error(error);
    return { tokenURI: null, error };
  }

  const tokenURI = value?.[0];

  return { tokenURI, error };
}

export const useGetOwnerTokenIdByIndex = (tokenIndex: number) => {
  const { user, chainId } = useAccount();
  const contract = multiPassContract(chainId);

  const { value, error } = useCall(user && contract && {
    contract,
    method: 'tokenOfOwnerByIndex',
    args: [user, tokenIndex]
  }) ?? {}

  if(error) {
    console.error(error);
    return { tokenId: null, error };
  }

  const tokenId = value?.[0]?.toNumber();

  return { tokenId, error };
}

export const useTokenRank = (tokenId: number) => {
  const { user, chainId } = useAccount();
  const contract = multiPassContract(chainId);

  const { value, error } = useCall(user && contract && {
    contract,
    method: 'rank',
    args: [tokenId]
  }) ?? {}

  if(error) {
    console.error(error);
    return { rank: null, error };
  }

  const rank = value?.[0]?.map((r) => typeof(r) ==='number' ? r : r?.toNumber() || 0) || [];

  return { rank, error };
}

export const useGetMultipleTokenIds = (userBalance: number) => {
  const { user, chainId } = useAccount();
  const contract = multiPassContract(chainId);
  const tokenIndexes = Array.from(Array(userBalance).keys());

  const calls = user && contract && userBalance && tokenIndexes.map(tokenIndex => {
    return {
      contract,
      method: 'tokenOfOwnerByIndex',
      args: [user, tokenIndex]
    };
  }) || [];


  const results = useCalls(calls, {refresh: 'never'}) ?? tokenIndexes.map(() => { return { value: null, error: null }; });

  results.forEach((result, index) => {
    if (result && result.error) {
      console.error(result.error);
      const empty = tokenIndexes.map(() => 0);
      return { tokenIds: empty, error: result.error };
    }
  });

  const tokenIds = results.map((result) => result?.value?.[0]?.toNumber() || 0);
  return { tokenIds, error: null };
}


export const useGetMultipleTokenURIs = (tokenIds: number[]) => {
  const { user, chainId } = useAccount();
  const contract = multiPassContract(chainId);

  const calls = user && contract && tokenIds.map(tokenId => {
    return {
      contract,
      method: 'tokenURI',
      args: [tokenId]
    };
  }) || [];

  const results = useCalls(calls, {refresh: 'never'}) ?? tokenIds.map(() => { return { value: null, error: null }; });

  results.forEach((result, index) => {
    if (result && result.error) {
      console.error(result.error);
      const empty = tokenIds.map(() => null);
      return { tokenURIs: empty, error: result.error };
    }
  });

  const tokenURIs = results.map((result) => result?.value?.[0] || null);
  return { tokenURIs, error: null };
}

export const useGetMultipleTokenRanks = (tokenIds: number[]) => {
  const { user, chainId } = useAccount();
  const contract = multiPassContract(chainId);

  const calls = user && contract && tokenIds.map(tokenId => {
    return {
      contract,
      method: 'rank',
      args: [tokenId]
    };
  }) || [];

  const results = useCalls(calls, {refresh: 'never'}) ?? tokenIds.map(() => { return { value: null, error: null }; });

  results.forEach((result, index) => {
    if (result && result.error) {
      console.error(result.error);
      const empty = tokenIds.map(() => null);
      return { tokenRanks: empty, error: result.error };
    }
  });

  const tokenRanks = results.map((result) => result?.value?.[0] || null);
  return { tokenRanks, error: null };
}

export const useGetReservedETHForTokenLevel = (tokenLevel: number) => {
  const { user, chainId } = useAccount();
  const contract = multiPassContract(chainId);

  const { value, error } = useCall(user && contract && {
    contract,
    method: 'ETHToReceive',
    args: [tokenLevel]
  }, {refresh: 'never'}) ?? {}

  if(error) {
    console.error(error);
    return { reservedETH: null, error };
  }

  const reservedETH = parseFloat(formatEther(value?.[0] || BigNumber.from(0)));

  return { reservedETH, error };
}