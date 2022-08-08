import { TransactionStatus, useContractFunction } from "@usedapp/core";
import tellerABI from '@/contracts/abis/tellerABI.json';

import { Contract } from "ethers";
import { useAccount } from "@/hooks/useAccount";

export const useClaimRewards = (tellerAddress: string): [() => boolean, TransactionStatus] => {  
  const { user } = useAccount();
  const { state, send } = useContractFunction(user && tellerAddress && new Contract(tellerAddress, tellerABI), 'claimExternal', {transactionName: 'claim rewards'});

  const claimRewards = () => {
    try {
      send({from: user});
      return true;
    } catch(e) {
      console.error(e);
      return false;
    }

  }

  return [
    claimRewards,
    state
  ]
}