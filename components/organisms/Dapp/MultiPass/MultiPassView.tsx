import { VText } from "@/components/atoms/VText";
import { VTitle } from "@/components/atoms/VTitle";
import { motion } from "framer-motion";
import { mapRankToColors } from "./helpers";
import { IMultiPassViewProps } from "./types";

import { GradientBorder } from "@/components/atoms/GradientBorder";
import { useState } from "react";
import { AnimatePresenceModal } from "@/components/atoms/Modal";
import { ConfirmationModal } from "@/components/molecules/ConfirmationModal";
import { useBurnLevels } from "@/hooks/dapps/multipass/useMint";
import { VImage } from "@/components/atoms/VImage";

export const MultiPassView = ({token, isMerging, reservedETH}: IMultiPassViewProps) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { burnLevels, state } = useBurnLevels(token?.tokenId, token?.tokenRank?.level);

  return (
    <>
      <AnimatePresenceModal>
        {showConfirmModal && <ConfirmationModal onClose={() => setShowConfirmModal(false)} onConfirm={async () => {
            setShowConfirmModal(false);
            await burnLevels();
          }} title="Destroy this multipass and redeem its reserved ETH value" description="Are you sure you want to destroy this multipass? this action is not reversable" confirmText="Destroy Pass" cancelText="Cancel"/>}
      </AnimatePresenceModal>
      <GradientBorder padding='none' className="flex flex-col sm:w-[280px] w-[250px] shadow-btn-dark h-auto" borderRadius={2} gradientColors={!isMerging ? [mapRankToColors(token?.tokenRank?.rank).bgColor] : [mapRankToColors(token?.tokenRank?.rank).bgColor, '#f37055', '#ef4e7b', '#734a9e', mapRankToColors(token?.tokenRank?.rank).bgColor]}>
          <div className="flex justify-between items-center p-vmd py-vmd w-full">
            <VTitle overrideTextColor type="h5"><span style={{
              borderColor:mapRankToColors(token?.tokenRank?.rank).bgColor,
              color:mapRankToColors(token?.tokenRank?.rank).bgColor
            }} className="border-[1px] px-2 border-accent-dark-100 text-accent-dark-100">Lv.{token?.tokenRank?.level}</span> - {token?.name || 'PLACEHOLDER'} ({token?.tokenId})</VTitle>
            <div>
            </div>
          </div>
          <div className="w-full px-vmd flex flex-col justify-center items-center">
            <VText overrideTextColor size='md'>{token?.description}</VText>
            <div className="w-[200px] h-[25vh] relative">
              {token?.mediaSrc ? <video style={{
                objectFit: 'contain',
                width: '100%',
                height: '100%',
              }} src={token.mediaSrc} autoPlay loop muted></video> : <VImage layout="fill" objectFit='contain' src='/placeholders/img.png'></VImage> }
            </div>
          </div>
          <div className="flex flex-col w-full justify-end items-center">
            <div className="w-full flex justify-end items-center px-vsm py-[4px]">
              <VImage src="/ethsm.png" width={20} height={20}
              ></VImage>
              <p className="pt-1">{(reservedETH || 0).toFixed(2) || 0}</p>
            </div>
            <motion.button disabled={isMerging} onClick={() => setShowConfirmModal(true)} initial={{
              scale: 1
            }} whileHover={{
              scale: 0.97
            }} className={`w-[100%] h-11 flex text-center justify-center items-center hover:cursor-pointer disabled:cursor-not-allowed rounded-b-2xl`} style={{
              // backgroundColor: isMerging ? '#000' : mapRankToColors(token?.tokenRank).bgColor
            }}>
              <VText style={{
                color: isMerging ? 'gray' : '#fff'
              }} size="lg" overrideTextColor className='w-full !font-bold'>BURN/DESTROY</VText>
            </motion.button>
            {state.errorMessage && <VText size="md" overrideTextColor className="text-aimbotsRed-100 pb-2">{state.errorCode === -32000 ? 'Cannot estimate gas' : state.errorMessage}</VText>}
          </div>
      </GradientBorder>
    </>
  )
}