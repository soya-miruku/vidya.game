import { EMPTY_ADDRESS } from "./addresses";

export const CHAIN_GENERATOR_SETTINGS = {
  1: {
    vaultAddress: '0xe4684AFE69bA238E3de17bbd0B1a64Ce7077da42',
    pool: {
      eth: {
        name: 'eth',
        image: '/generator/eth.png',
        token: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH token address 
        lptoken: "0xDA3706c9A099077e6BC389D1baf918565212A54D", // The Uniswap V2 LP token for VIDYA/ETH 
        teller: "0xD9BecdB8290077fAf79A2637a5f2FDf5033b2486", // The Teller contract address for VIDYA/ETH pool 
      },
      single: {
        name: 'single',
        image: '/generator/vidya.png',
        token: "0x3D3D35bb9bEC23b06Ca00fe472b50E7A4c692C30",
        lptoken: undefined, //"0x3D3D35bb9bEC23b06Ca00fe472b50E7A4c692C30",
        teller: "0x4E053ac1F6F34A73F5Bbd876eFd20525EAcB5382",    
      }
    }
  },
  3: {
    vaultAddress: EMPTY_ADDRESS,
    pool: {
    }
  }
}