import { Goerli, Mainnet, Rinkeby, Ropsten } from "@usedapp/core";
import { Contract } from "ethers";
import MULTIPASS_ABI from '@/contracts/abis/multipassABI.json';
import { EMPTY_ADDRESS } from "./addresses";
import { MultipassValidForChain } from "./helpers";

export const CHAIN_MULTIPASS_SETTINGS = {
  [Mainnet.chainId]: {
    contractAddress: EMPTY_ADDRESS,
  },
  [Ropsten.chainId]: {
    contractAddress: EMPTY_ADDRESS,
  },
  [Rinkeby.chainId]: {
    contractAddress: "0x4Ae089f03806c9730dFFD7Df224EaC6953d0b45D",
  },
  [Goerli.chainId]: {
    contractAddress: "0x1faaB2E972f08a01813Ff83Ef9E044C23B4447e2",
  }
}

export const multiPassContract = (chainId: number) => {
  if(!MultipassValidForChain(chainId)) return undefined;
  try {
    return new Contract(CHAIN_MULTIPASS_SETTINGS[chainId].contractAddress, MULTIPASS_ABI);
  } catch(e) {
    console.error(e);
    return undefined;
  }
}