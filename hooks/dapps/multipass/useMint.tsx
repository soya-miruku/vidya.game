import { multiPassContract } from "@/contracts/multipass";
import { useAccount } from "@/hooks/useAccount";
import { formatEther, parseEther } from "@ethersproject/units";
import { useCall, useContractFunction } from "@usedapp/core";

export const useMint = (amount=1) => {
  const { chainId } = useAccount();
  const contract = multiPassContract(chainId);
  const { state, send } = useContractFunction(contract && contract, 'mint', {transactionName: 'Mint Multipass'});

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


export const usePriceToMint = (amount:number) => {
  const { chainId } = useAccount();
  const contract = multiPassContract(chainId);

  const { value, error } = useCall(contract && {
    contract,
    method: 'priceToken',
    args: [amount]
  }, {refresh: 'everyBlock'}) ?? {};

  if(error) {
    console.error(error);
    return { tokenPrice: 0, error };
  }

  const tokenPrice = value?.[0] ? formatEther(value?.[0]) : 0;

  return { tokenPrice, error };
}