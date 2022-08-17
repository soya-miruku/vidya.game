import { useEffect, useState } from "react"
import { Contract } from "@ethersproject/contracts"
import { TransactionStatus, useCall, useContractFunction } from "@usedapp/core"
import UNISWAP_ROUTER_ABI from "@/contracts/abis/uniswapRouter.json";
import vidyaabi from '@/contracts/abis/vidyaAbi.json'
import inventoryAbi from '@/contracts/abis/inventoryAbi.json'
import { inventoryContract } from "@/contracts/inventory";
import uniPoolAbi from '@/contracts/abis/uniswapPair.json'
import { Falsy } from "@usedapp/core/dist/esm/src/model/types";
import { TokenInfo, TokenListContext } from '@/common/providers/TokenListProvider';
import { useAccount } from "@/hooks/useAccount";
import { CHAIN_SETTINGS, ETH_ADDRESS } from "@/contracts/addresses";
import { formatEther, parseEther, parseUnits } from "@ethersproject/units";
import { getProvidersFromConfig } from "@usedapp/core/dist/esm/src/providers/network/readonlyNetworks/provider";
import { toWei } from "web3-utils";
import { classNames } from "@/common/helpers"
import { VTable } from "@/components/atoms/VTable"
import { VButton } from "@/components/atoms/VButton";
import { FormLayout } from "@/components/organisms/Dapp/Generator/FormLayout"
import { VTab, VTabs } from "@/components/atoms/VTabs"

import { BigNumber, ethers } from "ethers";




const VidyaAccessories = () => {
    const { chainId, user, library } = useAccount();
    console.log('l', library)
    const [data, setData] = useState([]);
    const [accBal, setBalance] = useState("");
    const [chosenItem, setChosenItem] = useState("");
    let [sortedItems, setSortedItems] = useState([]);
    let trades = [];
    console.log('renderedDashboard')
    let inventoryCon = new ethers.Contract(CHAIN_SETTINGS[chainId || 1].INVENTORY_ADDRESS, inventoryAbi, library)


    const equip = async (e) => {
        if (!library) return;
        try {

            setChosenItem(e.target.id)

            const vars = 2;
            console.log(vars)
            var pos = 1
            let unsignedTx = await inventoryCon.populateTransaction.equip(e.target.id, pos)
            console.log(unsignedTx)
            let to = unsignedTx.to
            let data = unsignedTx.data
            console.log('u', unsignedTx)
            const { state, send } = useContractFunction(inventoryCon, 'swapExactTokensForTokens', {transactionName: 'swapTokensForTokens'});

            // library.provider = ethereum
           



        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
       
        puller();
    }, [])

    const puller = async () => {

        if(sortedItems !== []){
        try {
           
            console.log('u', user)
            if (user != undefined) {
               console.log(inventoryCon)
        let unSortedItems = await inventoryCon.functions.getItemsByOwner(user)
        console.log('uuu',unSortedItems)
        let sortedItems = []
        unSortedItems[0].forEach(element => {
            let sortedNum = ethers.utils.formatUnits(element, 0)
            console.log(sortedNum)

            async function pullUri() {
                let uri = await inventoryCon.functions.tokenURI(sortedNum)
                const response = await fetch(uri)
                const data = await response.json();

                data["id"] = sortedNum;


                sortedItems.push(data);
                if (sortedItems.length == unSortedItems[0].length) {
                    console.log(sortedItems)
                    setSortedItems(sortedItems)
                }


            }
            pullUri();

        });
        console.log('s', sortedItems)
           

            }
        
        } catch (error) {
            console.log('lil broken',error)
        }}
        else{
            console.log('already ran')
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
               
                <div>
                {
                        sortedItems.map((id, key) => (
                            <div id={id.id} onClick={equip} key={key}>

                                <img width={40} src={id.image} />
                                {id.name} {id.id}
                            </div>
                        ))
                    }
                </div>

                prevtrades
            </div>
        </>
    )
}

export default VidyaAccessories
