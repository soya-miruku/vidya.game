import { Goerli, Mainnet, Rinkeby, Ropsten } from "@usedapp/core";

export const CHAIN_MULTIPASS_SETTINGS = {
  [Mainnet.chainId]: {
    contractAddress: "",
  },
  [Ropsten.chainId]: {
    contractAddress: "",
  },
  [Rinkeby.chainId]: {
    contractAddress: "0x4Ae089f03806c9730dFFD7Df224EaC6953d0b45D",
  },
  [Goerli.chainId]: {
    contractAddress: "0x1faab2e972f08a01813ff83ef9e044c23b4447e2",
  }
}