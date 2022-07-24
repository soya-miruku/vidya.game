import { TransactionStatus } from "@usedapp/core";
import { useApproveBase } from "../useApprove";

export const useApprove = (tokenAddress: string, tellerAddress: string): [(limit?: number) => void, TransactionStatus] => {
  return useApproveBase(tokenAddress, tellerAddress);
}