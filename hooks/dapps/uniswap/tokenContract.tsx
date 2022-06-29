import { Contract } from "@ethersproject/contracts"
import { useCall } from "@usedapp/core"
import TOKEN_ABI from "@/contracts/abis/tokenAbi.json";
import { Falsy } from "@usedapp/core/dist/esm/src/model/types";
import { useAccount } from "../../useAccount";
import { CHAIN_SETTINGS, ETH_ADDRESS } from "@/contracts/addresses";

export const useHasSetAllowance = (tokenAddress: string | Falsy) => {
  const { chainId, user } = useAccount();
  const poolAddress = CHAIN_SETTINGS?.[chainId]?.UNISWAPV2_ROUTER02_ADDRESS;
  
  const { value, error } = useCall(user && poolAddress && tokenAddress && tokenAddress !== ETH_ADDRESS && {
    contract: new Contract(tokenAddress, TOKEN_ABI),
    method: "allowance",
    args: [user, poolAddress]
  }) ?? {}

  if(error) {
    console.error(error)
    return undefined;
  }

  return value && value[0].gt(0) || tokenAddress === ETH_ADDRESS;
}