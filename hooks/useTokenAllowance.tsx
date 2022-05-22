import { Contract } from "@ethersproject/contracts"
import { useCall } from "@usedapp/core"
import ERC20ABI from "@/common/abis/commonERC20.json";
import { Falsy } from "@usedapp/core/dist/esm/src/model/types";

export const useTokenAllowance = (tokenAddress: string | Falsy, ownerAddress: string | Falsy, spenderAddress: string | Falsy) => {
  const { value, error} = useCall(ownerAddress && spenderAddress && tokenAddress && {
    contract: new Contract(tokenAddress, ERC20ABI),
    method: "allowance",
    args: [ownerAddress, spenderAddress]
  }) ?? {}

  if(error) {
    console.error(error)
    return undefined;
  }

  return value?.[0];
}