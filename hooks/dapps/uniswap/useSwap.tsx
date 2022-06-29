import { Contract } from "@ethersproject/contracts"
import { TransactionStatus, useCall, useContractFunction } from "@usedapp/core"
import UNISWAP_ROUTER_ABI from "@/contracts/abis/uniswapRouter.json";
import { Falsy } from "@usedapp/core/dist/esm/src/model/types";
import { useAccount } from "@/hooks/useAccount";
import { CHAIN_SETTINGS, ETH_ADDRESS } from "@/contracts/addresses";
import { formatEther, parseEther, parseUnits } from "@ethersproject/units";
import { BigNumber } from "ethers";
import { toWei } from "web3-utils";

const calculateMinReceieved = (amountOut: number, slippage) => {
  return toWei((amountOut - (amountOut * slippage / 100)).toFixed(18));
}

const getDeadline = () => {
  return Math.floor(Date.now() / 1000) + 900;
}

export const useSwapETHForExactTokens = (slippage:number =1): [(amount: number, amountOut: number, token1Address: string) => void, TransactionStatus] => {
  const { chainId, user } = useAccount();
  const contract = new Contract(CHAIN_SETTINGS[chainId || 1].UNISWAPV2_ROUTER02_ADDRESS, UNISWAP_ROUTER_ABI);
  const { state, send } = useContractFunction(contract, 'swapExactETHForTokens', {transactionName: 'swapEthForTokens'});

  const swapEthForTokens = (amount: number, amountOut: number, token1Address: string) => {
    const deadline = getDeadline();
    const minAmountOut = calculateMinReceieved(amountOut, slippage);
    const path = [CHAIN_SETTINGS?.[chainId]?.WETH_ADDRESS, token1Address];
    const amountIn = toWei(amount.toString());

    console.log(amountIn, path, minAmountOut, deadline);
    send(minAmountOut, path, user, deadline, {value: parseEther(amount.toString())});
  }

  return [
    swapEthForTokens,
    state
  ]
}

export const useSwapExactTokensForEth = (slippage:number=1): [(amount: number, amountOut: number, token1Address: string) => void, TransactionStatus] => {
  const { chainId, user } = useAccount();
  const contract = new Contract(CHAIN_SETTINGS[chainId || 1].UNISWAPV2_ROUTER02_ADDRESS, UNISWAP_ROUTER_ABI);
  const { state, send } = useContractFunction(contract, 'swapExactETHForTokens', {transactionName: 'swapEthForTokens'});

  const swapTokensForEth = (amount: number, amountOut: number, token1Address: string) => {
    const deadline = getDeadline();
    const amountIn = toWei(amount.toString());
    const minAmountOut = calculateMinReceieved(amountOut, slippage);

    const path = [token1Address, CHAIN_SETTINGS?.[chainId]?.WETH_ADDRESS];

    send(amountIn, minAmountOut, path, user, deadline);
  }

  return [
    swapTokensForEth,
    state
  ]
}

export const useSwap = (token0: string, token1:string, slippage: number = 1):  [(amount: number, amountOut: number, token1Address: string) => void, TransactionStatus] => {
  return token0 === ETH_ADDRESS ? useSwapETHForExactTokens(slippage) : token1 === ETH_ADDRESS ?  useSwapExactTokensForEth(slippage) : useSwapExactTokensForEth(slippage);
}