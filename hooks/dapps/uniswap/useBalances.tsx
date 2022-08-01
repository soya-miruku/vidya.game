import { TokenInfo } from "@/common/providers/TokenListProvider";
import { EMPTY_ADDRESS, ETH_ADDRESS } from "@/contracts/addresses";
import { getResults } from "@/contracts/helpers";
import { useAccount } from "@/hooks/useAccount";
import { formatEther, formatUnits } from "@ethersproject/units";
import { ERC20Interface, MultiCallABI, useCall, useCalls, useMulticallAddress } from "@usedapp/core";
import { BigNumber, Contract } from "ethers";

export const useBalance = (address: string) => {
  const { user } = useAccount();
  const response = useCall(address && {
    contract: new Contract(address, ERC20Interface),
    method: 'balanceOf',
    args: [user]
  }, {refresh: 'everyBlock'});

  if(!response || response.error) {
    return {
      balance: 0,
      error: response?.error
    }
  }

  const balance = response.value?.[0]?._hex?.length <= 4 ? response?.value?.[0].toNumber() : formatEther(response?.value?.[0] || BigNumber.from(0));
  console.log(balance);
  return {
    balance,
    error: response?.error
  }

}

export const useBalances = (tokenAddresses: TokenInfo[]) => {
  const { user } = useAccount();
  const multicallAddress = useMulticallAddress();

  const calls = tokenAddresses?.map(token => {
    return user && multicallAddress && token && token.address !== EMPTY_ADDRESS && (token.address === ETH_ADDRESS ?
    {
      contract: new Contract(multicallAddress, MultiCallABI),
      method: "getEthBalance",
      args: [user]
    }:
    {
      contract: new Contract(token.address, ERC20Interface),
      method: "balanceOf",
      args: [user]
    }) || undefined;
  }) ?? []

  const responses = useCalls(calls, {refresh: 'everyBlock', isStatic: false});
  const results = getResults(responses, 0);
  const balances = results.map((result, index) => {
    if(!result || !result?.[0]) return 0;
    const b = result?.[0]?.toHexString();
    return parseFloat(formatUnits(b, tokenAddresses[index].decimals) || '0');
  });
  return balances;
}