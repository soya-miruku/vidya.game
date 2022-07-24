import { MAX_UNINT } from "@/common/constants";
import { ERC20Interface, TransactionStatus, useContractFunction } from "@usedapp/core";
import { Contract } from "ethers";

export const useApproveBase = (tokenAddress: string, spender: string): [(limit?: number) => void, TransactionStatus] => {  
  const { state, send } = useContractFunction(spender && tokenAddress && new Contract(tokenAddress, ERC20Interface), 'approve', {transactionName: 'approve token'});

  const approveToken = (limit: number) => {
    send(spender, limit >= 0 ? limit : MAX_UNINT);
  }

  return [
    approveToken,
    state
  ]
}