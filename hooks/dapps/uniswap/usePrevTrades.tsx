import { useEffect, useState } from "react"
import { Contract } from "@ethersproject/contracts"
import { TransactionStatus, useCall, useContractFunction } from "@usedapp/core"
import UNISWAP_ROUTER_ABI from "@/contracts/abis/uniswapRouter.json";
import vidyaabi from '../../../contracts/abis/vidyaAbi.json'
import uniPoolAbi from '../../../contracts/abis/uniswapPair.json'
import { Falsy } from "@usedapp/core/dist/esm/src/model/types";
import { TokenInfo, TokenListContext } from '@/common/providers/TokenListProvider';
import { useAccount } from "@/hooks/useAccount";
import { CHAIN_SETTINGS, ETH_ADDRESS } from "@/contracts/addresses";
import { formatEther, parseEther, parseUnits } from "@ethersproject/units";
import { getProvidersFromConfig } from "@usedapp/core/dist/esm/src/providers/network/readonlyNetworks/provider";
import { toWei } from "web3-utils";
import { BigNumber, ethers } from "ethers";




const UsePrevTrades = () => {
    const { chainId, user, library } = useAccount();
    console.log('l', library)
    const [data, setData] = useState([]);
    console.log('renderedDashboard')
   
    let vidya = new ethers.Contract(CHAIN_SETTINGS[chainId || 1].VIDYA_TOKEN_ADDRESS, vidyaabi, library)

    useEffect(() => {
        /* const pullData = async () => useCall(CHAIN_SETTINGS[chainId || 1].VIDYA_TOKEN_ADDRESS && {
             contract: new Contract(CHAIN_SETTINGS[chainId || 1].VIDYA_TOKEN_ADDRESS, vidyaabi),
             method: 'balanceOf',
             args: ['0x6C823b50a599E9cD50AdA67a07031699EdcC31bc']
           }) */
        puller();
    }, [])

    const puller = async () => {
        try {
            const preTokenBalance = await vidya.functions.balanceOf('0x6C823b50a599E9cD50AdA67a07031699EdcC31bc')
            console.log(preTokenBalance)
            const tokenBn = ethers.BigNumber.from(preTokenBalance[0])
            const tokenBalance = ethers.utils.formatUnits(tokenBn, 18)
            console.log(tokenBalance)
            console.log('u', user)
            if (user != undefined) {
                const filterTo = vidya.filters.Transfer(null, user);
                const allTx = await vidya.queryFilter(filterTo)
                console.log(allTx)


                allTx.forEach(tx => {
                    async function looper() {
                        const decodedData = await tx.decode(tx.data, tx.topics)
                        const rec = await tx.getTransactionReceipt()
                        const recLogs = rec.logs
                        const decoder = new ethers.utils.AbiCoder()
                        const gettx = await tx.getTransaction()
                        console.log('g', gettx)



                        for (let index = 0; index < recLogs.length; index++) {
                            const log = recLogs[index];

                            if (log.topics.length >= 3) {


                                switch (log.topics[0]) {
                                    case '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef':

                                        let token0 = new ethers.Contract(log.address, vidyaabi, library)
                                        let token0name = await token0.functions.name()
                                        console.log('re',token0name)

                                        break;

                                    case '0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822':
                                        console.log('swap')

                                        let poolContract = new ethers.Contract(log.address, uniPoolAbi, library)
                                        let token0addy = JSON.stringify(await poolContract.functions.token0())
                                        let token1addy = JSON.stringify(await poolContract.functions.token1())
                                        token0addy = token0addy.replace(/[^a-zA-Z0-9]/g, '')
                                        token1addy = token1addy.replace(/[^a-zA-Z0-9]/g, '')
                                        token0 = new ethers.Contract(token0addy, uniPoolAbi, library)
                                        let token1 = new ethers.Contract(token1addy, uniPoolAbi, library)

                                        token0name = await token0.functions.name()
                                        let token1name = await token1.functions.name()
                                        let token0decimals = await token0.functions.decimals()
                                        let token1decimals = await token1.functions.decimals()
                                        console.log('s',token1name)

                                        const decode = decoder.decode([
                                            'uint256', 'uint256', 'uint256', 'uint256'
                                        ], log.data)
                                        




                                        break;

                                    default:
                                        break;
                                }


                            }

                        }



                    }

                    looper();

                })


            }
        } catch (error) {

        }
    }






    /*  const prevTrades = (amount: number, amountOut: number, token1Address: string) => {
      //  const deadline = getDeadline();
       // const minAmountOut = calculateMinReceieved(amountOut, slippage);
      //  const path = [CHAIN_SETTINGS?.[chainId]?.WETH_ADDRESS, token1Address];
    
       // send(minAmountOut, path, user, deadline, {value: parseEther(amount.toString())});
      }*/

    /*  return [
        prevTrades,
        state
      ] */
    return (
        <>
            <div>
                <button onClick={puller}>button time</button>
                prevtrades
            </div>
        </>
    )
}

export default UsePrevTrades
