import { multiPassContract } from "@/contracts/multipass";
import { useAccount } from "@/hooks/useAccount";
import { useContractFunction } from "@usedapp/core";

export const useMergePasses = (tokenIds: number[]) => {
  const { chainId, user } = useAccount();
  const contract = multiPassContract(chainId);
  const { state, send } = useContractFunction(tokenIds && contract && user && contract, 'mergePasses', {transactionName: 'Merge Passes'});

  const mergePasses = async () => {
    await send(tokenIds, {from: user});
  }

  return {
    state,
    mergePasses
  }
}
