import { Contract } from "@ethersproject/contracts"
import { TransactionStatus, useCall, useContractFunction } from "@usedapp/core"
import TOKEN_ABI from "@/contracts/abis/tokenAbi.json";
import { ERC20Interface } from "@usedapp/core";
import { Falsy } from "@usedapp/core/dist/esm/src/model/types";
import { useAccount } from "../../useAccount";
import { CHAIN_SETTINGS, ETH_ADDRESS } from "@/contracts/addresses";
import { ChainExists } from "@/contracts/helpers";
import { MAX_UNINT } from "@/common/constants";

export const useHasSetAllowance = (tokenAddress: string | Falsy) => {
  const { chainId, user } = useAccount();

  const routerAddress = ChainExists(chainId) && CHAIN_SETTINGS?.[chainId]?.UNISWAPV2_ROUTER02_ADDRESS;
  
  const { value, error } = useCall(user && routerAddress && tokenAddress && tokenAddress !== ETH_ADDRESS && {
    contract: new Contract(tokenAddress, TOKEN_ABI),
    method: "allowance",
    args: [user, routerAddress]
  }, {refresh: 1}) ?? {}

  if(error) {
    console.error(error)
    return false;
  }
  return value && value[0].gt(0) || tokenAddress === ETH_ADDRESS;
}

export const useApprove = (tokenAddress: string): [(limit: number) => void, TransactionStatus] => {
  const { chainId } = useAccount();
  
  const routerAddress = ChainExists(chainId) && CHAIN_SETTINGS?.[chainId]?.UNISWAPV2_ROUTER02_ADDRESS;

  const { state, send } = useContractFunction(tokenAddress && new Contract(tokenAddress, ERC20Interface), 'approve', {transactionName: 'approve token'});

  const approveToken = (limit: number) => {
    send(routerAddress, limit > 0 ? limit : MAX_UNINT);
  }

  return [
    approveToken,
    state
  ]
}