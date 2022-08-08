import { TransactionStatus, useContractFunction } from "@usedapp/core";
import tellerABI from '@/contracts/abis/tellerABI.json';

import { Contract } from "ethers";
import { useAccount } from "@/hooks/useAccount";

export const useBreakCommitment = (tellerAddress: string): [() => boolean, TransactionStatus] => {  
  const { user } = useAccount();
  const { state, send } = useContractFunction(user && tellerAddress && new Contract(tellerAddress, tellerABI), 'breakCommitment', {transactionName: 'breakCommitment'});

  const breakCommitment = () => {
    try {
      send({from: user});
      return true;
    } catch(e) {
      console.error(e);
      return false;
    }

  }

  return [
    breakCommitment,
    state
  ]
}