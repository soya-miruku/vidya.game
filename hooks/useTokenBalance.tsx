import { Contract } from "@ethersproject/contracts"
import { useCall } from "@usedapp/core"
import ERC20ABI from "@/common/abis/commonERC20.json";
import { Falsy } from "@usedapp/core/dist/esm/src/model/types";

export const useTokenBalance = (tokenAddress: string | Falsy, accountAddress: string | Falsy) => {
  const { value, error } = useCall(accountAddress && tokenAddress && {
    contract: new Contract(tokenAddress, ERC20ABI),
    method: "balanceOf",
    args: [accountAddress]
  }) ?? {}

  if(error) {
    console.error(error)
    return undefined;
  }

  return value?.[0];
}