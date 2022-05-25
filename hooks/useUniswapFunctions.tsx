import { Contract } from "@ethersproject/contracts"
import { Mainnet, useCall } from "@usedapp/core"
import UNISWAP_FACTORY_ABI from "@/common/abis/uniswapFactory.json";
import { Falsy } from "@usedapp/core/dist/esm/src/model/types";
import { useAccount } from "./useAccount";
import { CHAIN_SETTINGS } from "@/common/constants";

export const useGetPair = (token0: string | Falsy, token1: string | Falsy) => {
  const { chainId } = useAccount();
  const { value, error } = useCall(token0 && token1 && {
    contract: new Contract(CHAIN_SETTINGS[chainId].UNISWAPV2_FACTORY2_ADDRESS, UNISWAP_FACTORY_ABI),
    method: "getPair",
    args: [token0, token1]
  }) ?? {}

  if(error) {
    console.error(error)
    return undefined;
  }

  return value;
}