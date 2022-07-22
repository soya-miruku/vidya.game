import { multiPassContract } from "@/contracts/multipass";
import { useAccount } from "@/hooks/useAccount";
import { formatEther, parseEther } from "@ethersproject/units";
import { useCall, useContractFunction } from "@usedapp/core";

export const useMint = (amount: number = 1) => {
  const { chainId, user } = useAccount();
  const contract = multiPassContract(chainId);
  const { state, send } = useContractFunction(contract && user && contract, 'mint', {transactionName: 'Mint Multipass'});

  const mint = async (price) => {
    if(!price) {
      return;
    }
    await send(amount, {value: parseEther(price)});
  }

  return {
    state,
    mint
  }
}

export const useBuyLevels = (tokenId: number, amount:number) => {
  const { chainId, user } = useAccount();
  const contract = multiPassContract(chainId);
  const { state, send } = useContractFunction(tokenId && contract && user && contract, 'buyAccessLevels', {transactionName: 'Buy Access Levels'});

  const buyLevels = async (pricePerLevel: number | string) => {
    if(!pricePerLevel) {
      return;
    }
    await send(tokenId, amount, {value: parseEther(pricePerLevel.toString())});
  }

  return {
    state,
    buyLevels
  }
}


export const useBurnLevels = (tokenId: number, amount:number) => {
  const { chainId, user } = useAccount();
  const contract = multiPassContract(chainId);
  const { state, send } = useContractFunction(contract && user && contract, 'burnAccessLevels', {transactionName: 'Burn Access Levels'});

  const burnLevels = async () => {
    await send(tokenId, amount, {from: user});
  }

  return {
    state,
    burnLevels
  }
}

export const usePriceToMint1 = () => {
  const { chainId } = useAccount();
  const contract = multiPassContract(chainId);

  const { value, error } = useCall(contract && {
    contract,
    method: 'priceToken',
    args: [1]
  }, {refresh: 'everyBlock'}) ?? {};

  if(error) {
    console.error('usePriceToMint1', error);
    return { tokenPrice: 0, error };
  }

  const tokenPrice = parseFloat(value?.[0] ? formatEther(value?.[0]) : '0');

  return { tokenPrice, error };
}