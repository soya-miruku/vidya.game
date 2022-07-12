import { Goerli, Mainnet, Rinkeby, Ropsten } from "@usedapp/core";
import { EMPTY_ADDRESS } from "./addresses";

export const CHAIN_GENERATOR_SETTINGS = {
  [Mainnet.chainId]: {
    vaultAddress: '0xe4684AFE69bA238E3de17bbd0B1a64Ce7077da42',
    pool: {
      eth: {
        name: 'eth',
        symbol: 'VIDYA/ETH',
        type: 'LP',
        image: '/generator/eth.png',
        token: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH token address 
        lptoken: "0xDA3706c9A099077e6BC389D1baf918565212A54D", // The Uniswap V2 LP token for VIDYA/ETH 
        teller: "0xD9BecdB8290077fAf79A2637a5f2FDf5033b2486", // The Teller contract address for VIDYA/ETH pool 
      },
      single: {
        name: 'single',
        symbol: 'VIDYA',
        type: 'single',
        image: '/generator/vidya.png',
        token: "0x3D3D35bb9bEC23b06Ca00fe472b50E7A4c692C30",
        lptoken: undefined, //"0x3D3D35bb9bEC23b06Ca00fe472b50E7A4c692C30",
        teller: "0x4E053ac1F6F34A73F5Bbd876eFd20525EAcB5382",    
      }
    }
  },
  [Ropsten.chainId]: {
    vaultAddress: '0x5BfCc3ad8e5ad7A710174837AD84E5029e714eDB',
    pool: {
      eth: {
        name: 'eth',
        symbol: 'VIDYA/ETH',
        type: 'LP',
        image: '/generator/eth.png',
        token: "0xc778417e063141139fce010982780140aa0cd5ab", // WETH token address 
        lptoken: "0x18691f5BcedD9F363ce306F7DfB25BDe8E1d1cD9", // The Uniswap V2 LP token for VIDYA/ETH 
        teller: "0xee9062b56402e85b9a93fb99efa153dc9e091783", // The Teller contract address for VIDYA/ETH pool 
      },
      single: {
        name: 'single',
        symbol: 'VIDYA',
        type: 'single',
        image: '/generator/vidya.png',
        token: "0x0CbCaFD9f1B9d7c41B6F55BbddE06Bee3Aa7B791",
        lptoken: undefined, //"0x3D3D35bb9bEC23b06Ca00fe472b50E7A4c692C30",
        teller: "0xF1f0327FC8b52832F75656AF9a2acA8932b83D6a",    
      }
    }
  },
  [Rinkeby.chainId]: {
    vaultAddress: EMPTY_ADDRESS,
    pool: {
    }
  },
  [Goerli.chainId]: {
    vaultAddress: EMPTY_ADDRESS,
    pool: {
    }
  }
}