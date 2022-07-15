import { classNames } from "@/common/helpers";
import { VText } from "@/components/atoms/VText";
import { VTitle } from "@/components/atoms/VTitle";
import { useGetReservedETHForTokenLevel } from "@/hooks/dapps/multipass/useNftPasses";
import { motion } from "framer-motion";
import Image from "next/image";
import { mapRankToColors } from "./helpers";
import { IMultiPassViewProps } from "./types";

import { GradientBorder } from "@/components/atoms/GradientBorder";

export const MultiPassView = ({token, isMerging}: IMultiPassViewProps) => {
  const { reservedETH } = useGetReservedETHForTokenLevel(token.tokenRank);

  return (
    <GradientBorder padding='sm' className="flex flex-col sm:w-[280px] w-[290px] shadow-btn-dark h-auto" borderRadius={2} gradientColors={!isMerging ? [mapRankToColors(token?.tokenRank).bgColor] : [mapRankToColors(token?.tokenRank).bgColor, '#f37055', '#ef4e7b', '#734a9e', mapRankToColors(token?.tokenRank).bgColor]}>
        <div className="flex justify-between items-center p-vsm py-vmd w-full">
          <VTitle overrideTextColor type="h5"><span style={{
            borderColor:mapRankToColors(token?.tokenRank).bgColor,
            color:mapRankToColors(token?.tokenRank).bgColor
          }} className="border-[1px] px-2 border-accent-dark-100 text-accent-dark-100">Lv.{token?.tokenRank}</span> - {token?.name || 'PLACEHOLDER'} ({token?.tokenId})</VTitle>
          <div>
          </div>
        </div>
        <div className="w-full px-vsm flex flex-col justify-center items-center">
          <VText overrideTextColor size='md'>{token?.description}</VText>
          <div className="w-[200px] h-[20vh] relative">
            {token?.mediaSrc ? <video style={{
              objectFit: 'contain',
              width: '100%',
              height: '100%',
            }} src={token.mediaSrc} autoPlay loop muted></video> : <Image layout="fill" objectFit='contain' src='/placeholders/img.png'></Image> }
          </div>
        </div>
        <div className="w-full flex justify-end items-center px-vsm py-[4px]">
          <Image src="/ethsm.png" width={20} height={20}
          ></Image>
          <p className="pt-1">{reservedETH.toFixed(2) || 0}</p>
        </div>
        <motion.div initial={{
          scale: 1
        }} whileHover={{
          scale: 0.97
        }} className={`w-[110%] -ml-[0px] h-10 px-vsm flex text-center justify-center items-center hover:cursor-pointer`} style={{
          backgroundColor: isMerging ? '#000' : mapRankToColors(token?.tokenRank).bgColor
        }}>
          <VText style={{
            color: mapRankToColors(token?.tokenRank).textColor
          }} size="lg" overrideTextColor className='w-full !font-bold'>BURN</VText>
        </motion.div>
          <VText className="!text-[12px] uppercase p-vsm !text-light-300 font-bold px-vsm" size="sm">Destroy this multipass and redeem its reserved ETH value</VText>
      {/* </div> */}
    </GradientBorder>
  )
}