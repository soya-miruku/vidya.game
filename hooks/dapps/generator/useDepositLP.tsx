import { MAX_UNINT } from "@/common/constants";
import { TransactionStatus, useContractFunction } from "@usedapp/core";
import tellerABI from '@/contracts/abis/tellerABI.json';

import { Contract } from "ethers";
import { parseEther } from "@ethersproject/units";
import { useAccount } from "@/hooks/useAccount";

export const useDepositLP = (tellerAddress: string): [(amount?: number) => boolean, TransactionStatus] => {  
  const { user } = useAccount();
  const { state, send } = useContractFunction(user && tellerAddress && new Contract(tellerAddress, tellerABI), 'depositLP', {transactionName: 'deposit tokens to teller'});

  const depositLP = (amount: number) => {
    if(amount <= 0) return false;
    try {
      const amountWei = parseEther(amount.toString());
      send(amountWei, {from: user});
      return true;
    } catch(e) {
      console.error(e);
      return false;
    }

  }

  return [
    depositLP,
    state
  ]
}