import { MAX_UNINT } from "@/common/constants";
import { TransactionStatus, useContractFunction } from "@usedapp/core";
import tellerABI from '@/contracts/abis/tellerABI.json';

import { Contract } from "ethers";
import { parseEther } from "@ethersproject/units";
import { useAccount } from "@/hooks/useAccount";

export const useCommitLP = (tellerAddress: string): [(amount: number, commitmentIndex: number) => boolean, TransactionStatus] => {  
  const { user } = useAccount();
  const { state, send } = useContractFunction(user && tellerAddress && new Contract(tellerAddress, tellerABI), 'commit', {transactionName: 'commit tokens to teller'});

  const commitLP = (amount: number, commitmentIndex: number) => {
    if(amount <= 0) return false;
    try {
      const amountWei = parseEther(amount.toString());
      send(amountWei, commitmentIndex, {from: user});
      return true;
    } catch(e) {
      console.error(e);
      return false;
    }

  }

  return [
    commitLP,
    state
  ]
}