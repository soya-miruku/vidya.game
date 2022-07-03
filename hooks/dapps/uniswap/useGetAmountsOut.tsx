import { Contract } from "@ethersproject/contracts"
import { useCall } from "@usedapp/core"
import UNISWAP_ROUTER_ABI from "@/contracts/abis/uniswapRouter.json";
import { Falsy } from "@usedapp/core/dist/esm/src/model/types";
import { useAccount } from "@/hooks/useAccount";
import { CHAIN_SETTINGS, ETH_ADDRESS } from "@/contracts/addresses";
import { formatEther, parseUnits } from "@ethersproject/units";
import { BigNumber } from "ethers";
import { toChecksumAddress, toWei } from "web3-utils";


export const getAmountsOut = async (chainId: number, provider: any, amountIn: number, path: string [], pairExists:boolean) => {
  const contract = new Contract(CHAIN_SETTINGS[chainId || 1].UNISWAPV2_ROUTER02_ADDRESS, UNISWAP_ROUTER_ABI, provider);
  const updatedPath = path.map((token) => token === ETH_ADDRESS ? CHAIN_SETTINGS[chainId].WETH_ADDRESS: toChecksumAddress(token));
  // if the path does not contain weth address add this in the middle
  if (!updatedPath.includes(CHAIN_SETTINGS[chainId].WETH_ADDRESS) && !pairExists) {
    updatedPath.splice(1, 0, CHAIN_SETTINGS[chainId].WETH_ADDRESS);
  }
  
  if(!contract || !amountIn || !path || path.length <= 1) return 0;

  try {
    const amountOut = await contract.getAmountsOut(toWei(amountIn.toString()), updatedPath);
    return amountOut && parseFloat(formatEther(amountOut[amountOut.length - 1])) || 0;
  }
  catch(e) {
    console.error(e);
    return 0;
  }
}

export const useGetAmountsOut = (amountIn: number | Falsy, path: string []) => {
  const { chainId } = useAccount();
  const { value, error } = useCall(amountIn && path && chainId && {
    contract: new Contract(CHAIN_SETTINGS[chainId].UNISWAPV2_ROUTER02_ADDRESS, UNISWAP_ROUTER_ABI),
    method: "getAmountsOut",
    args: [parseUnits(amountIn.toString(), 'ether'), path.map((token) => token === ETH_ADDRESS ? CHAIN_SETTINGS[chainId].WETH_ADDRESS: token)]
  }, {refresh: 100}) ?? {}

  if(error) {
    console.error(error)
    return 0;
  }

  return formatEther(value?.[0]?.[1] || BigNumber.from(0));
}