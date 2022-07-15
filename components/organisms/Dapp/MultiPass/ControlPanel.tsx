import { NumberInput } from "@/components/atoms/NumberInput"
import { VButton } from "@/components/atoms/VButton"
import { VText } from "@/components/atoms/VText"
import { VTitle } from "@/components/atoms/VTitle"
import { useMint, usePriceToMint } from "@/hooks/dapps/multipass/useMint"
import { useState } from "react"
import { mapRankToColors } from "./helpers"
import { INFT } from "./types"

export interface IPlusMinusInputFieldProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: string
  label: string
  disabled?: boolean
  onMinusClick?: () => void
  onPlusClick?: () => void
  borderColor?: string
}

export const PlusMinusInputField = ({label, value, onPlusClick, onMinusClick, onChange, borderColor, step='1', min=0, max=100}: IPlusMinusInputFieldProps) => {
  return (<div className="flex flex-col gap-y-vsm">
    <VText className="uppercase !font-bold" size="md">{label}</VText>
    <div className="flex justify-start items-center h-[55px] gap-[5px]">
      <div className="flex flex-col gap-y-[5px]">
        <button className="sm:px-2 px-2 py-0 border-2 rounded-bl-lg rounded-tr-lg" style={{
          borderColor: borderColor || '#fff',
        }}>
          <VText size='md'>+</VText>
        </button>
        <button className="sm:px-2 px-2 py-0 border-2 rounded-br-lg rounded-tl-lg" style={{
          borderColor: borderColor || '#fff',
        }}>
          <VText size='md'>-</VText>
        </button>
      </div>
      <NumberInput value={value} onChange={onChange} style={{
        borderColor: borderColor || '#fff',
      }} className="focus:outline-none bg-transparent px-vsm mr-2 w-full h-full border-[2px] rounded-tl-lg rounded-br-lg text-body dark:text-light-100 text-dark-100 appearance-none outline-none p-1" min={min} max={max} step={step}></NumberInput>
      </div>
  </div>)
}

export const ControlPanel = ({nft, balance}: { nft: INFT, balance:number }) => {
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
        <div className="w-full flex flex-col gap-vsm">
          <VTitle type="h5">Actions</VTitle>
          <div className="flex flex-col w-full h-auto border-0 p-vsm gap-y-vsm" style={{ borderColor: mapRankToColors(nft?.tokenRank).bgColor }}>
            <PlusMinusInputField label="mint" value={1} borderColor={mapRankToColors(nft?.tokenRank).bgColor} onChange={() => {}} ></PlusMinusInputField>
          </div>
        </div>
        {/* <div className="h-full">
          <VButton onClick={handleMint} className="!tracking-widest" customColor={mapRankToColors(nft?.tokenRank).bgColor} style={{
            color: mapRankToColors(nft?.tokenRank).textColor,
          }} primary>Mint {tokenPrice}</VButton>
        </div> */}
        <div className="flex flex-col w-full h-auto border-4 rounded-tr-2xl rounded-bl-2xl p-vsm gap-y-vsm" style={{ borderColor: mapRankToColors(nft?.tokenRank).bgColor }}>
          <PlusMinusInputField label="buy levels" value={1} borderColor={mapRankToColors(nft?.tokenRank).bgColor} onChange={() => {}} ></PlusMinusInputField>
          <PlusMinusInputField label="burn levels" value={1} borderColor={mapRankToColors(nft?.tokenRank).bgColor} onChange={() => {}} ></PlusMinusInputField>
        </div>
      </div>
    </div>
  )
}