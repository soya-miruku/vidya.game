import { useEffect, useState } from "react"
import { useContractFunction } from "@usedapp/core"
import inventoryAbi from '@/contracts/abis/inventoryAbi.json'
import { useAccount } from "@/hooks/useAccount";
import { CHAIN_SETTINGS } from "@/contracts/addresses";
import styles from "@/css/dashboard.module.scss"
import { classNames } from '@/common/helpers';
import { ethers } from "ethers";




const VidyaAccessories = () => {
    const { chainId, user, library } = useAccount();
    console.log('l', library)
    const [data, setData] = useState([]);
    const [accBal, setBalance] = useState("");
    const [chosenItem, setChosenItem] = useState("");
    let [sortedItems, setSortedItems] = useState([]);
    let trades = [];
    console.log('renderedInventory')
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
               //dont forget to change this back when done testing
               //let unSortedItems = await inventoryCon.functions.getItemsByOwner(user)

        let unSortedItems = await inventoryCon.functions.getItemsByOwner('0x3063d85ab19c6154fca06f5dc7a92502f030751e')
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
                <button onClick={puller}>click me if nfts dont load</button>
                
                   
                <div className={classNames(styles.dashGridContainer)}>
                {
                        sortedItems.map((id, key) => (
                            <div id={id.id} onClick={equip} key={key}>

                                <img width={40} src={id.image} />
                                {id.name} {id.id}
                            </div>
                        ))
                    }

                
            </div>
        </>
    )
}

export default VidyaAccessories
