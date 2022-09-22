import { useEffect, useState } from "react"
import { useContractFunction } from "@usedapp/core"
import inventoryAbi from '@/contracts/abis/inventoryAbi.json'
import { useAccount } from "@/hooks/useAccount";
import { CHAIN_SETTINGS } from "@/contracts/addresses";
import styles from "@/css/dashboard.module.scss"
import { classNames } from '@/common/helpers';
import { ethers } from "ethers";
import pastEthPrices from "../../../public/dashboard/pastEthPrices.json"


const FirstChart = () => {
    const { chainId, user, library } = useAccount();
    console.log('l', library)
    const [data, setData] = useState([]);
    const [accBal, setBalance] = useState("");
    const [chosenItem, setChosenItem] = useState("");
    let [sortedItems, setSortedItems] = useState([]);
    let trades = [];
    console.log('renderedInventory')
    let inventoryCon = new ethers.Contract(CHAIN_SETTINGS[chainId || 1].INVENTORY_ADDRESS, inventoryAbi, library)
   
    

   
  



    useEffect(() => {
       
        puller();
    }, [])

    const puller = async () => {

        if(sortedItems !== []){
        try {
           
            const response = pastEthPrices
            console.log('reees',response)

    


          
        
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
                <button onClick={puller}>click me if nfts dont load</button>
                
                
                   
                <div className={classNames( styles.dashGridContainer)}>
                {
                        sortedItems.map((id, key) => (
                            <div id={id} key={key} >

                                <img width={40} src={id.image} />
                                {id.name} {id.id}
                            </div>
                        ))
                    }

                
            </div>
        </>
    )
}

export default FirstChart
