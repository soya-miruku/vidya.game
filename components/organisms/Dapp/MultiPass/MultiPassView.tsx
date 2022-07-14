import { classNames } from "@/common/helpers";
import { VText } from "@/components/atoms/VText";
import { VTitle } from "@/components/atoms/VTitle";
import { useGetReservedETHForTokenLevel } from "@/hooks/dapps/multipass/useNftPasses";
import { motion } from "framer-motion";
import Image from "next/image";
import { mapRankToColors } from "./helpers";
import { IMultiPassViewProps } from "./types";

import styles from '@/css/multipass.module.scss';

export const MultiPassView = ({token}: IMultiPassViewProps) => {
  const { reservedETH } = useGetReservedETHForTokenLevel(token.tokenRank);

  return (
    <div className={classNames(styles['card-overlay'],`flex flex-col border-[4px] !bg-black sm:w-[280px] w-[290px] rounded-xl shadow-btn-dark`)} style={{
      borderColor:mapRankToColors(token?.tokenRank).bgColor
    }}>
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
        <div className="w-[200px] sm:h-[223px] h-[200px] relative">
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
      }} className={`w-[101%] -ml-[1px] h-10 px-vsm flex text-center justify-center items-center hover:cursor-pointer`} style={{
        backgroundColor: mapRankToColors(token?.tokenRank).bgColor
      }}>
        <VText style={{
          color: mapRankToColors(token?.tokenRank).textColor
        }} size="lg" overrideTextColor className='w-full !font-bold'>BURN</VText>
      </motion.div>
        <VText className="!text-[12px] uppercase p-vsm !text-light-300 font-bold px-vsm" size="sm">Destroy this multipass and redeem its reserved ETH value</VText>
  </div>
  )
}