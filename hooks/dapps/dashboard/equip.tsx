import { useContractFunction } from "@usedapp/core";
import { useState } from "react";
import inventoryAbi from '@/contracts/abis/inventoryAbi.json'
import { useAccount } from "@/hooks/useAccount";
import { CHAIN_SETTINGS } from "@/contracts/addresses";
import styles from "@/css/dashboard.module.scss"
import { classNames } from '@/common/helpers';
import { ethers } from "ethers";
//gotta pass the contract in
const useItemEquip = (library, itemId, chainId, inventoryCon, pos) => {

  const [txStatus, setTxStatus] = useState(null);

  const equipItem = async (itemId,pos) => {
    try {
        const { state, send } = useContractFunction(inventoryCon, 'equip', {transactionName: 'equip'});

      const result:any = await send(itemId, pos);
      if (result.status === "Mining") {
        setTxStatus("Mining");
        await result.wait();
        setTxStatus("Mined");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { equipItem, txStatus };
};

export default useItemEquip;