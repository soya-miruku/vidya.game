import { useEffect, useState } from "react"
import { useContractFunction } from "@usedapp/core"
import inventoryAbi from '@/contracts/abis/inventoryAbi.json'
import { useAccount } from "@/hooks/useAccount";
import { CHAIN_SETTINGS } from "@/contracts/addresses";
import styles from "@/css/dashboard.module.scss"
import { classNames } from '@/common/helpers';
import { ethers } from "ethers";
import useItemEquip from "../dashboard/equip";



const VidyaAccessories = (props:any) => {



    const [user, setUser] = useState(props.user)
    const [library, setLibrary] = useState(props.library)
    const [chainId, setChainId] = useState(props.chainId)
    const [isAuthenticated, setIsAuthenticated] = useState(props.isAuthenticated)
    console.log('renderedaccesso')
    console.log('VA', props.library, props.user)
    const [data, setData] = useState([]);
    const [accBal, setBalance] = useState("");
    const [chosenItem, setChosenItem] = useState("");
    let [sortedItems, setSortedItems] = useState([]);
    const [txStatus, setTxStatus] = useState(null);

    let trades = [];
    let inventoryCon = new ethers.Contract(CHAIN_SETTINGS[chainId || 1].INVENTORY_ADDRESS, inventoryAbi, library)
    const { state, send } = useContractFunction(inventoryCon, 'equip', {transactionName: 'equip'});
    
    
    
    
    
    const equip = async (e) => {
        if (!library) return;
        try {
          //  console.log('reee',e,'re2',e.id)
            console.log(e.id)

            const vars = 2;
            console.log(vars)
            var pos = 1
            let id = e.id
          
              console.log('id',e.id,'pos',pos)
              const result:any = await send(e.id, pos);
              if (result.status === "Mining") {
                setTxStatus("Mining");
                await result.wait();
                setTxStatus("Mined");
              }
            
          

            // library.provider = ethereum
           



        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
       
        puller();
    }, [])



    const puller = async () => {
        if (sortedItems.length < 2) {
            try {
                if (props.user && props.library) {
                    console.log('VAPULLER')
                    let unSortedItems = await inventoryCon.functions.getItemsByOwner('0x3063d85ab19c6154fca06f5dc7a92502f030751e');
                    let sortedItems2 = [];
                    
                    await Promise.all(unSortedItems[0].map(async (element) => {
                        let sortedNum = ethers.utils.formatUnits(element, 0);
                        let uri = await inventoryCon.functions.tokenURI(sortedNum);
                        const response = await fetch(uri);
                        const data = await response.json();
                        data["id"] = sortedNum;
                        sortedItems2.push(data);
                    }));
                    
                    setSortedItems(sortedItems2);
                }
            } catch (error) {
                console.log('lil broken',error)
            }
        } else {
            console.log('already ran');
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
                
                <h1>I am the accessories</h1>
                   
                <div className={classNames( styles.dashGridContainer)}>
                {
                        sortedItems.map((id, key) => (
                           
                            <div id={id}  onClick={() => equip(id)} key={key} >

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
