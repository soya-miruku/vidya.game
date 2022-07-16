import { NumberInput } from "@/components/atoms/NumberInput"
import { VButton } from "@/components/atoms/VButton"
import { VText } from "@/components/atoms/VText"
import { VTitle } from "@/components/atoms/VTitle"
import { ConfirmationModal } from "@/components/molecules/ConfirmationModal"
import { useBurnLevels, useBuyLevels, useMint, usePriceToMint } from "@/hooks/dapps/multipass/useMint"
import { useGetReservedETHForTokenLevel } from "@/hooks/dapps/multipass/useNftPasses"
import { useEffect, useMemo, useState } from "react"
import { mapRankToColors } from "./helpers"
import { INFT } from "./types"

export interface IPlusMinusInputFieldProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: string
  label: string | JSX.Element
  disabled?: boolean
  onMinusClick?: () => void
  onPlusClick?: () => void
  onBtnClick?: () => void
  borderColor?: string
  btnText?: string
  isLoading?: boolean
  btnTextColor?: string
}

export const PlusMinusInputField = ({label, value, onPlusClick, onMinusClick, onBtnClick, btnText, btnTextColor, onChange, borderColor, disabled, isLoading, step='1', min=0, max=1}: IPlusMinusInputFieldProps) => {
  return (
    <div className="flex flex-col w-full justify-end items-end">
    <VText className="uppercase !font-bold !w-full" size="md">{label}</VText>
    <div className="flex w-full justify-end items-end">
      <div className="flex flex-col gap-y-vsm w-full">
        <div className="flex justify-start items-center h-[55px] gap-[5px]">
          <div className="flex flex-col gap-y-[5px]">
            <button onClick={onPlusClick} className="sm:px-2 px-2 py-0 border-2 rounded-bl-lg rounded-tr-lg" style={{
              borderColor: borderColor || '#fff',
            }}>
              <VText size='md'>+</VText>
            </button>
            <button onClick={onMinusClick} className="sm:px-2 px-2 py-0 border-2 rounded-br-lg rounded-tl-lg" style={{
              borderColor: borderColor || '#fff',
            }}>
              <VText size='md'>-</VText>
            </button>
          </div>
          <NumberInput value={value} onChange={onChange} style={{
            borderColor: borderColor || '#fff',
          }} className="focus:outline-none bg-transparent px-vsm mr-2 w-full h-full border-[2px] rounded-tl-lg rounded-br-lg text-body dark:text-light-100 text-dark-100 appearance-none outline-none p-1" min={min} max={max} step={step}></NumberInput>
          </div>
      </div>
      <VButton disabled={disabled} isLoading={isLoading} onClick={onBtnClick} animate={false} className="w-full rounded-tl-xl rounded-br-xl font-bold text-body-xs justify-center flex hover:!bg-accent-dark-200"  rounded={false} customColor={borderColor} style={{
        color: btnTextColor
      }}>{btnText}</VButton>
    </div>
    </div>
  )
}

export const ControlPanel = ({nft, reservedETH, canBurnOrBuyLevels}: { nft: INFT, reservedETH:number, canBurnOrBuyLevels: boolean }) => {
  const [maxLimitMint, setMaxLimitMint] = useState<number>(9);
  const [mintAmount, setMintAmount] = useState(1);
  const [buyLevelsAmount, setBuyLevelsAmount] = useState(1);
  const [burnLevelsAmount, setBurnLevelsAmount] = useState(1);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const { tokenPrice } = usePriceToMint(mintAmount);
  const { tokenPrice: buyLevelPrice } = usePriceToMint(buyLevelsAmount);
  const { mint, state } = useMint(mintAmount);
  const { buyLevels, state:buyLevelState } = useBuyLevels(nft && nft.tokenId, buyLevelsAmount);
  const { burnLevels, state: burnLevelState } = useBurnLevels(nft && nft.tokenId, burnLevelsAmount);

  const isMintingInProgress = useMemo(() => state.status === 'Mining' || state.status === 'PendingSignature', [state.status]);
  const isBuyingLevelsInProgress = useMemo(() => buyLevelState.status === 'Mining' || buyLevelState.status === 'PendingSignature', [buyLevelState.status]);
  const isBurningLevelsInProgress = useMemo(() => burnLevelState.status === 'Mining' || burnLevelState.status === 'PendingSignature', [burnLevelState.status]);

  const handleMint = async () => {
    await mint(tokenPrice);
  }

  const handleBuyLevels = async () => {
    await buyLevels(buyLevelPrice);
  }

  const handleBurnLevels = async () => {
    if(burnLevelsAmount >= nft.tokenRank) {
      setBurnLevelsAmount(() => nft.tokenRank)
      setShowConfirmationModal(true);
    }
    else {
      await burnLevels();
    }
  }

  useEffect(() => {
    if(state.status === 'Success') {
      setMintAmount(1);
    }
  }, [state])

  useEffect(() => {
    if(buyLevelState.status === 'Success') {
      setBuyLevelsAmount(1);
    }
  }, [buyLevelState])

  useEffect(() => {
    if(burnLevelState.status === 'Success') {
      
    }
  }, [burnLevelState])

  return (
    <>
    {showConfirmationModal && <ConfirmationModal
    title="YOU ARE ABOUT TO DESTORY THIS MULTIPASS"
    description="the level amount you have put means that this multipass will be destroyed! are you sure you want to do this?"
    onClose={() => setShowConfirmationModal(false)}
    onConfirm={async () => {
      setShowConfirmationModal(() => false);
      await burnLevels();
    }}
    confirmText="Destroy"
    cancelText="Cancel"
    />}
    <div className="w-full h-full border-4 flex p-vsm rounded-tr-3xl rounded-bl-3xl" style={{
      borderColor: mapRankToColors(nft?.tokenRank).bgColor,
    }}>
      <div className="flex flex-col justify-between items-start w-full min-h-[150px] h-full gap-vsm">
        <div className="w-full flex flex-col gap-vsm">
          <VTitle type="h5">Actions</VTitle>
          <div className="flex flex-col w-full h-auto border-0 p-vsm gap-y-vsm " style={{ borderColor: mapRankToColors(nft?.tokenRank).bgColor }}>
            <PlusMinusInputField
              onBtnClick={handleMint}
              btnText="MINT"
              label={<>Mint pass for <span className="text-accent-dark-100">{tokenPrice} eth</span></>}
              value={mintAmount}
              min={1}
              max={maxLimitMint}
              disabled={isMintingInProgress}
              isLoading={isMintingInProgress}
              borderColor={mapRankToColors(nft?.tokenRank).bgColor}
              btnTextColor={mapRankToColors(nft?.tokenRank).textColor}
              onPlusClick={() => setMintAmount(mintAmount > maxLimitMint ? mintAmount : mintAmount + 1)}
              onMinusClick={() => setMintAmount(mintAmount > 1 ? mintAmount - 1 : 1)}
              onChange={(e:any) => {
                setMintAmount(e.target.valueAsNumber);
              }} ></PlusMinusInputField>
            {state.errorMessage && <VText size="sm" className="!text-aimbotsRed-100">{state.errorMessage}</VText>}
            {state.status === 'Success' && <VText size="sm" className="!text-aimbotsGreen-100">Successfuly Minted!</VText>}
          </div>
        </div>
        <div className="flex flex-col w-full h-auto border-4 rounded-tr-2xl rounded-bl-2xl p-vsm gap-y-vsm" style={{ borderColor: mapRankToColors(nft?.tokenRank).bgColor }}>
            <PlusMinusInputField 
              btnText="BUY LEVELS" 
              label={<>Total Price <span className="text-accent-dark-100">{buyLevelPrice} eth</span></>}
              value={buyLevelsAmount}
              min={1}
              max={maxLimitMint}
              disabled={isBuyingLevelsInProgress || !canBurnOrBuyLevels}
              isLoading={isBuyingLevelsInProgress}
              onBtnClick={handleBuyLevels}
              borderColor={mapRankToColors(nft?.tokenRank).bgColor}
              btnTextColor={mapRankToColors(nft?.tokenRank).textColor}
              onPlusClick={() => setBuyLevelsAmount(buyLevelsAmount > maxLimitMint ? buyLevelsAmount : buyLevelsAmount + 1)}
              onMinusClick={() => setBuyLevelsAmount(buyLevelsAmount > 1 ? buyLevelsAmount - 1 : 1)}
              onChange={(e:any) => {
                setBuyLevelsAmount(e.target.valueAsNumber);
              }}
            ></PlusMinusInputField>
            {buyLevelState.errorMessage && <VText size="sm" className="!text-aimbotsRed-100">{buyLevelState.errorCode === -32000 ? 'Cannot estimate gas' : buyLevelState.errorMessage}</VText>}
            {buyLevelState.status === 'Success' && <VText size="sm" className="!text-aimbotsGreen-100">Successfuly Brought levels!</VText>}
            <PlusMinusInputField 
              btnText="BURN LEVELS" 
              label={<>Total Gain <span className="text-accent-dark-100">{(reservedETH * burnLevelsAmount).toFixed(4)} eth</span></>}
              value={burnLevelsAmount}
              min={0}
              max={nft?.tokenRank || 0}
              disabled={isBurningLevelsInProgress || !canBurnOrBuyLevels}
              isLoading={isBurningLevelsInProgress}
              onBtnClick={handleBurnLevels}
              borderColor={mapRankToColors(nft?.tokenRank).bgColor}
              btnTextColor={mapRankToColors(nft?.tokenRank).textColor}
              onPlusClick={() => setBurnLevelsAmount(burnLevelsAmount > maxLimitMint ? burnLevelsAmount : burnLevelsAmount + 1)}
              onMinusClick={() => setBurnLevelsAmount(burnLevelsAmount > 1 ? burnLevelsAmount - 1 : 1)}
              onChange={(e:any) => {
                setBurnLevelsAmount(e.target.valueAsNumber);
              }} ></PlusMinusInputField>
            {burnLevelState.errorMessage && <VText size="sm" className="!text-aimbotsRed-100">{burnLevelState.errorCode === -32000 ? 'Cannot estimate gas' : burnLevelState.errorMessage}</VText>}
            {burnLevelState.status === 'Success' && <VText size="sm" className="!text-aimbotsGreen-100">{burnLevelsAmount} levels have been redeemed! {burnLevelsAmount >= nft.tokenRank ? 'and this multipass has been destroyed' : ''}</VText>}
        </div>
      </div>
    </div>
    </>
  )
}