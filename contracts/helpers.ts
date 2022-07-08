import { CHAIN_SETTINGS } from "./addresses";

export const ChainExists = (chainId: number) => {
  return Object.keys(CHAIN_SETTINGS).includes(chainId.toString());
}