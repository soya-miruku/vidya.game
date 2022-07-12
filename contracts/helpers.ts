import { CHAIN_SETTINGS, EMPTY_ADDRESS } from "./addresses";
import { CHAIN_GENERATOR_SETTINGS } from "./generator";

export const ChainExists = (chainId: number) => {
  return Object.keys(CHAIN_SETTINGS).includes(chainId.toString());
}

export const GeneratorValidForChain = (chainId: number) => {
  return Object.keys(CHAIN_GENERATOR_SETTINGS).includes(chainId.toString()) && CHAIN_GENERATOR_SETTINGS[chainId].vaultAddress !== EMPTY_ADDRESS;
}