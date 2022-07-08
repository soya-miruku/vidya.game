import { Contract } from "@ethersproject/contracts"
import { useCall } from "@usedapp/core"
import UNISWAP_FACTORY_ABI from "@/contracts/abis/uniswapFactory.json";
import { Falsy } from "@usedapp/core/dist/esm/src/model/types";
import { useAccount } from "../../useAccount";
import { CHAIN_SETTINGS, EMPTY_ADDRESS } from "@/contracts/addresses";
import { ChainExists } from "@/contracts/helpers";

export const useGetPair = (token0: string | Falsy, token1: string | Falsy) => {
  const { chainId } = useAccount();
  const { value, error } = useCall(token0 && token1 && ChainExists(chainId)  && {
    contract: new Contract(CHAIN_SETTINGS[chainId || 1].UNISWAPV2_FACTORY2_ADDRESS, UNISWAP_FACTORY_ABI),
    method: "getPair",
    args: [token0, token1]
  }) ?? {}

  if(error) {
    return {address: EMPTY_ADDRESS, exists: false}
  }

  const exists = value && value[0] !== EMPTY_ADDRESS;
  const address = value && value[0];
  return {address, exists};
}