import { useEtherBalance, useTokenBalance } from "@usedapp/core"
import { Falsy } from "@usedapp/core/dist/esm/src/model/types";
import { useAccount } from "./useAccount";
import { ETH_ADDRESS } from "@/contracts/addresses";
import { formatEther } from "@ethersproject/units";
import { BigNumber } from "ethers";

export const useEthOrTokenBalance = (tokenAddress: string | Falsy) => {
  const { user } = useAccount();
  return parseFloat(tokenAddress === ETH_ADDRESS ? formatEther(useEtherBalance(user) || BigNumber.from(0)) : formatEther(useTokenBalance(tokenAddress, user) || BigNumber.from(0)));
}