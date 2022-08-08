import { CallResult } from "@usedapp/core";
import { Contract } from "ethers";

import { CHAIN_SETTINGS, EMPTY_ADDRESS } from "./addresses";
import { CHAIN_GENERATOR_SETTINGS } from "./generator";
import { CHAIN_INVENTORY_SETTINGS } from "./inventory";
import { CHAIN_MULTIPASS_SETTINGS } from './multipass';

export const ChainExists = (chainId: number) => {
  return Object.keys(CHAIN_SETTINGS).includes(chainId.toString());
}

export const GeneratorValidForChain = (chainId: number) => {
  return Object.keys(CHAIN_GENERATOR_SETTINGS).includes(chainId.toString()) && CHAIN_GENERATOR_SETTINGS[chainId].vaultAddress !== EMPTY_ADDRESS;
}

export const MultipassValidForChain = (chainId: number) => {
  return Object.keys(CHAIN_MULTIPASS_SETTINGS).includes(chainId.toString()) && CHAIN_MULTIPASS_SETTINGS[chainId].contractAddress !== EMPTY_ADDRESS;
}

export const InventoryValidForChain = (chainId: number) => {
  return Object.keys(CHAIN_INVENTORY_SETTINGS).includes(chainId.toString()) && CHAIN_INVENTORY_SETTINGS[chainId].contractAddress !== EMPTY_ADDRESS;
}

export const getResults = (responses: CallResult<Contract, string>[], defaultValue: any=0) => {
  const results: any[] = [];
  
  responses.forEach((response) => {
    if(response && response.error) {
      results.push(defaultValue);
      console.log(response.error);
    }
    else {
      results.push(response?.value)
    }
  });

  return results;
}