import { useEffect, useState } from "react"
import { Contract } from "@ethersproject/contracts"
import { TransactionStatus, useCall, useContractFunction } from "@usedapp/core"
import UNISWAP_ROUTER_ABI from "@/contracts/abis/uniswapRouter.json";
import vidyaabi from '@/contracts/abis/vidyaAbi.json'
import uniPoolAbi from '@/contracts/abis/uniswapPair.json'
import { Falsy } from "@usedapp/core/dist/esm/src/model/types";
import { TokenInfo, TokenListContext } from '@/common/providers/TokenListProvider';
import { useAccount } from "@/hooks/useAccount";
import { CHAIN_SETTINGS, ETH_ADDRESS } from "@/contracts/addresses";
import { formatEther, parseEther, parseUnits } from "@ethersproject/units";
import { getProvidersFromConfig } from "@usedapp/core/dist/esm/src/providers/network/readonlyNetworks/provider";
import { classNames } from "@/common/helpers"
import { VTable } from "@/components/atoms/VTable"
import { VButton } from "@/components/atoms/VButton";
import { FormLayout } from "@/components/organisms/Dapp/Generator/FormLayout"
import { VTab, VTabs } from "@/components/atoms/VTabs"
import { BigNumber, ethers } from "ethers";
import VidyaAccessories from "../inventory/VidyaAccessories";
//import CSV from "@/hooks/dapps/dashboard/VidyapriceHistory"



function UsePrevTrades(props:any) {

    const [data, setData] = useState([]);
    const [accBal, setBalance] = useState("");
    const [tradeArray, settradeArray] = useState([]);
    const [trades, setTrades] = useState([])
    const [user, setUser] = useState(props.user)
    const [library, setLibrary] = useState(props.library)
    const [chainId, setChainId] = useState(props.chainId)
    const [rendered, setRendered] = useState(false)
    console.log('upt', props)
    console.log('renderedDashboard')
   



  

    useEffect(() => {
        
        /* const pullData = async () => useCall(CHAIN_SETTINGS[chainId || 1].VIDYA_TOKEN_ADDRESS && {
             contract: new Contract(CHAIN_SETTINGS[chainId || 1].VIDYA_TOKEN_ADDRESS, vidyaabi),
             method: 'balanceOf',
             args: ['0x6C823b50a599E9cD50AdA67a07031699EdcC31bc']
           }) */
        puller();
    }, [props.user])

    const puller = async () => {


        if(!tradeArray)
        console.log('startingPuller')
        let vidya = new ethers.Contract(CHAIN_SETTINGS[props.chainId || 1].VIDYA_TOKEN_ADDRESS, vidyaabi, props.library)
        if(tradeArray.length < 1 && props.user){
        try {
            const preTokenBalance = await vidya.functions.balanceOf('0x6C823b50a599E9cD50AdA67a07031699EdcC31bc')
            console.log(preTokenBalance)
            const tokenBn = ethers.BigNumber.from(preTokenBalance[0])
            const tokenBalance = ethers.utils.formatUnits(tokenBn, 18)
            console.log('u', props.user)
            if (props.user != undefined) {
             //   const filterTo = vidya.filters.Transfer(null, user);
             const filterTo = vidya.filters.Transfer(null, '0x0EBcf026946A4de6155961d66D53b0100c6271a1');
                const allTx = await vidya.queryFilter(filterTo)
                console.log(allTx)


                allTx.forEach(tx => {
                    async function looper() {
                        const decodedData = await tx.decode(tx.data, tx.topics)
                        const rec = await tx.getTransactionReceipt()
                        const recLogs = rec.logs
                        const decoder = new ethers.utils.AbiCoder()
                        const gettx = await tx.getTransaction()
                        const txData = await library.getTransaction(tx.transactionHash)
                    //    console.log('g', gettx)


                        for (let index = 0; index < recLogs.length; index++) {
                            const log = recLogs[index];

                            if (log.topics.length >= 3) {


                                switch (log.topics[0]) {
                                    case '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef':
                                        //         console.log('transfer', log.address)

                                        let token0 = new ethers.Contract(log.address, vidyaabi, library)
                                        let token0name = await token0.functions.name()
                                     //   console.log('re',token0name)

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
                                        let isran = false

                                    //    console.log('s',token1name)

                                        const decode = decoder.decode([
                                            'uint256', 'uint256', 'uint256', 'uint256'
                                        ], log.data)
                                        
                                        if (decode[0]._hex === '0x00') {
                                            

                                            let actualtoken0 = parseFloat(ethers.utils.formatUnits(decode[2], token0decimals))

                                            let actualtoken1 = parseFloat(ethers.utils.formatUnits(decode[1], token1decimals))

                                           // console.log(tx.transactionHash)


                                            // round to 3 decimals places
                                            let token0in = Math.round(actualtoken0 * 1000) / 1000
                                            let token1in = Math.round(actualtoken1 * 1000) / 1000
                                            let trade = {
                                                'txHash': txData.hash,
                                                'token0': token0name,
                                                'amount0': token0in,
                                                'token1': token1name,
                                                'amount1': token1in,
                                                'index': log.logIndex
                                            }
                                           console.log('t',trade)
                                        
                                            //loop here is probably hella ineffecient, lets fix that.... another day
                                            //its picking up trades in the route,I need to make sure it ignores the whole path and just takes value of token A to b



                                            
                                            for (let i = 0; i < tradeArray.length; i++) {
                                                const element = tradeArray[i];
                                                console.log('wawa',tradeArray)
                                                console.log('1',trade.token0,'2',trade.token1)
                                                
                                             
                                                if(element.txHash === trade.txHash) {
                                                    isran = true
                                                }

                                            }
                                                if(isran == false && trade.txHash){
                                                    console.log('tr2',tradeArray)
                                                    const localArray = [...tradeArray, trade]
                                                    console.log('la',localArray) 
                                                    settradeArray(tradeArray => [...tradeArray, trade])

                                                    console.log('wtf', localArray)
                                                    console.log('forreal',trade)
                                                }
                                          
                                                isran = false;
                                           
                                        //    console.log('t', trades)
                                           console.log('ta', tradeArray)
                                            console.log(txData.hash,`\n traded ${actualtoken1} ${token1name} to ${actualtoken0} ${token0name}`,)

                                            

                                        }
                                        else{

                                            let actualtoken0 = ethers.utils.formatUnits(decode[0], token0decimals)

                                            let actualtoken1 = ethers.utils.formatUnits(decode[3], token1decimals)

                                            let trade = {
                                                'txHash': txData.hash,
                                                'token0': token0name,
                                                'amount0': actualtoken0,
                                                'token1': token1name,
                                                'amount1': actualtoken1,
                                            }

                                            let isran = false
                                            //   console.log('t',trade)
                                               //loop here is probably hella ineffecient, lets fix that.... another day
   
                                               for (let i = 0; i < tradeArray.length; i++) {
                                                   const element = tradeArray[i];
                                                   
                                                

                                                   if(element.txHash === trade.txHash) {
                                                       isran = true
                                                   }
   
                                               }
                                                   if(isran == false && trade.txHash !== undefined){
                                                    console.log('tr3',tradeArray)
                                                    const localArray = [...tradeArray, trade]
                                                    console.log('la3',localArray) 

                                                    settradeArray(tradeArray => [...tradeArray, trade])
                                                    console.log('wtf3', localArray)
                                                    console.log('forreal3',trade)
                                                
                                                   }
                        
                                        //    console.log('t', trades)
                                         //   console.log('ta', tradeArray)
                                            //amount0in != 0; token is 0 to 1
                                            console.log(tx.transactionHash)
                                            console.log(`traded ${actualtoken0} ${token0name} to ${actualtoken1} ${token1name}`)

                                            isran = false;
                                        }



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
            console.log('lil broken',error)
        }}
        else{
      //      console.log('already ran')
        }
    }





    let divStyle={
        backgroundColor:'red'
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
           
                <button onClick={puller}>click me and then dashboard if transactions dont show up, annoying bug not pulling back account on render/load</button>
               
               <h1>i'm a trade array</h1>
<div style={divStyle}>

{
    tradeArray.map((id, key) => (
        
        <VTable key={key}
        borderWidth={0}
        columns={[
                    {label: 'TxHash', align: 'center'}, 
                    {label: 'From', align: 'center'}, 
                    {label: 'Amount', align: 'center'}, 
                    {label: 'To', align: 'center'},
                    {label: 'Amount', align: 'center'},
                    {label: 'P&L', align: 'center'}
                    
                ]} 
                data={[
                    {
                        0: <p className="text-accent-dark-100 !font-bold">{id.txHash.slice(0,5)+'...'+id.txHash.slice(-4,-1)}</p>,
                        1: <p className="text-accent-dark-100 !font-bold">{id.token0}</p>,
                        2: <p className="text-accent-dark-100 !font-bold">{id.amount0}</p>,
                        3: <p className="text-accent-dark-100 !font-bold">{id.token1}</p>,
                        4: <p className="text-accent-dark-100 !font-bold">{id.amount1}</p>,
                        //  need to do actual math with usd token values here
                        // coingecko api isn't prime for history or calls, should probably just do web3 calls at x blocknumber???
                        5: <p className="text-accent-dark-100 !font-bold">{(id.amount0 - id.amount1)}</p>}
                        
                    ]}
                    /> 
                    ))
                }
                </div>


                prevtrades
            
        </>
    )
}

export default UsePrevTrades
