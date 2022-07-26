import { Mainnet } from "@usedapp/core";
import { Contract } from "ethers";
import INVENTORY_ABI from '@/contracts/abis/inventoryAbi.json';
import { InventoryValidForChain } from "./helpers";

export const CHAIN_INVENTORY_SETTINGS = {
  [Mainnet.chainId]: {
    contractAddress: '0x9680223F7069203E361f55fEFC89B7c1A952CDcc',
  },
}

export const inventoryContract = (chainId: number) => {
  if(!InventoryValidForChain(chainId)) return undefined;
  try {
    return new Contract(CHAIN_INVENTORY_SETTINGS[chainId].contractAddress, INVENTORY_ABI);
  } catch(e) {
    console.error(e);
    return undefined;
  }
}