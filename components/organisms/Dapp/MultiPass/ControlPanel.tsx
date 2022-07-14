import { VButton } from "@/components/atoms/VButton"
import { VTitle } from "@/components/atoms/VTitle"
import { useMint, usePriceToMint } from "@/hooks/dapps/multipass/useMint"
import { useState } from "react"
import { mapRankToColors } from "./helpers"
import { INFT } from "./types"

export const ControlPanel = ({nft}: { nft: INFT }) => {
  const [amount, setAmount] = useState(1);
  const { tokenPrice } = usePriceToMint(amount);
  const { mint, state } = useMint(amount);

  const handleMint = async () => {
    await mint(tokenPrice);
  }

  return (
    <div className="w-full h-full border-4 flex p-vsm rounded-tr-3xl rounded-bl-3xl" style={{
      borderColor: mapRankToColors(nft?.tokenRank).bgColor,
    }}>
      <div className="flex flex-col justify-between items-start w-full min-h-[150px] h-full gap-vsm">
        <VTitle type="h5">Actions</VTitle>
        <div className="h-full">
          <VButton onClick={handleMint} className="!tracking-widest" customColor={mapRankToColors(nft?.tokenRank).bgColor} style={{
            color: mapRankToColors(nft?.tokenRank).textColor,
          }} primary>Mint {tokenPrice}</VButton>
        </div>
      </div>
    </div>
  )
}