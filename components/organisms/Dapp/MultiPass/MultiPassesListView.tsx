import { useEffect, useMemo, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { motion } from "framer-motion";
import { classNames } from "@/common/helpers";
import { VText } from "@/components/atoms/VText";
import { VTitle } from "@/components/atoms/VTitle";
import { IMultiPassesListViewProps, INFT } from "./types";
import { VLabel } from "@/components/atoms/VLabel";
import Image from "next/image";
import { Deck } from "@/components/organisms/Dapp/MultiPass/Deck";
import { mapRankToColors } from "./helpers";
import { VButton } from "@/components/atoms/VButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfinity } from "@fortawesome/pro-regular-svg-icons";

export const SmallCard = ({token, padding, displayImage}: {token: INFT, padding?: boolean, displayImage?: boolean}) => {
  return (
    <div className="h-full w-full relative flex flex-col justify-between items-start gap-vsm" style={{
      padding: padding ? '0.5rem' : '0',
    }}>
      <div className=" w-full h-full absolute z-[100]"></div>
      <div className="flex w-full justify-between z-0 p-[5px]">
        <VTitle overrideTextColor type="h6"><span className="border-[1px] px-2 " style={{
          borderColor: mapRankToColors(token?.tokenRank).bgColor,
          color: mapRankToColors(token?.tokenRank).textColor,
        }}>Lv.{token?.tokenRank}</span></VTitle>
        <VTitle type="h6">#{token.tokenId}</VTitle>
      </div>
      {displayImage && <div className="flex flex-col h-full w-full justify-center items-center">
        <Image objectFit="contain" src={token?.imgSrc} width={80} height={100}></Image>
      </div>}
      <VText overrideTextColor size="sm">{token.name}</VText>
    </div>
  )
}

export const MultiPassesListView = ({tokens, currentlySelectedTokenIndex, onTokenClick}: IMultiPassesListViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const [ mergeList, setMergeList ] = useState<INFT[]>([]);
  const [ isDragging, setIsDragging ] = useState(false);
  const [ availableTokens, setAvailableTokens ] = useState<INFT[]>(tokens);

  const selectedToken = useMemo(() => {
    return tokens && tokens[currentlySelectedTokenIndex];
  }, [tokens])

  useEffect(() => {
    // initialise available list
    setAvailableTokens(tokens);
    // initialise merge list
    setMergeList([]);
  }, [currentlySelectedTokenIndex, JSON.stringify(tokens)]);

  const handleWheelScroll = (e: any) => {
    if(containerRef.current || !isMobile) {
      const { scrollLeft } = containerRef.current;
      const smoothX = scrollLeft + e.deltaY * .45;
      containerRef.current.scrollLeft = smoothX;
    }
  }

  const handleDragEnd = (nft: INFT, index: number, e: any) => {
    setIsDragging(() => false)

    if(dropZoneRef.current) {
      const { left, top, width, height } = dropZoneRef.current.getBoundingClientRect();
      const { clientX, clientY } = e;
      const isInDropZone = clientX >= left && clientX <= left + width && clientY >= top && clientY <= top + height;
      if(isInDropZone) {
        if(!mergeList.includes(nft)) {
          setMergeList([...mergeList, nft]);
          setAvailableTokens(availableTokens.filter(token => token.tokenId !== nft.tokenId));
        }
      }

    }
  }

  return (
    <div className="w-full h-full flex justify-center items-end px-vsm">
      <div className="flex flex-col gap-vlrg justify-start items-center w-full h-auto">
        <div ref={containerRef} className="flex w-full h-full flex-col gap-vsm overflow-x-scroll scrollbar-thin relative z-100 py-vsm">
          {availableTokens.length <= 0 && <VText size="lg">You do not own any passes</VText>}
          {availableTokens.length > 0 && <div className="flex w-full justify-center items-start z-0">
          <div ref={dropZoneRef} className="w-full h-[280px] border-[1px] border-dashed flex justify-center items-center p-vmd -z-[1]">
            {mergeList.length <= 0 &&<VText size="md" className="font-mono">Drag and drop passes here to begin merging</VText>}
            <div className="w-full h-full overflow-hidden flex">
              <Deck items={mergeList} onRemove={(nft) => {
                setMergeList(mergeList.filter(token => token.tokenId !== nft.tokenId));
                setAvailableTokens([...availableTokens, nft]);
              }}/>
              {mergeList.length > 0 && <div className="flex flex-col gap-vsm justify-center items-center">
                <VButton rounded={false} primary animate={false} customColor={mapRankToColors(selectedToken.tokenRank).bgColor} className="h-full rounded-tr-2xl rounded-br-2xl text-base">
                  <span>
                    <FontAwesomeIcon icon={faInfinity}></FontAwesomeIcon>
                  </span>
                  Merge
                </VButton>
              </div>}
            </div>
          </div>
          </div>}
          <div className="flex gap-x-vmd justify-end items-end" style={{
            height: innerHeight <= 800 ? '90px' : '190px',
          }}>
            {availableTokens.map((token, index) => {
              return (
                <motion.li 
                  drag={token.tokenId !== selectedToken.tokenId}
                  dragConstraints={{left: 0, right: 0, top: 0, bottom: 0}}
                  dragElastic={1}
                  onDragStart={() => setIsDragging(() => true)}
                  onDragEnd={(e) => handleDragEnd(token, index, e)}
                  onClick={() => {
                    if(isDragging || token.tokenId === selectedToken.tokenId) return;
                    // document.getElementById('modal-multipass-inner').scrollTo(0,0)
                    onTokenClick(token.tokenId, mergeList.length > 0);
                  }}  
                  key={`${token.tokenId}_${index}`}
                  style={{
                    left: `${index * 130}px`,
                    borderColor: token.tokenId === selectedToken.tokenId ? '#734a9e' : mapRankToColors(selectedToken.tokenRank).bgColor,
                    borderWidth: token.tokenId === selectedToken.tokenId ? '4px' : '2px',
                  }}
                  transition={(delta) => {
                    if(isDragging) {

                    }
                    return !isDragging;
                  }}
                className={classNames('min-w-[115px] absolute rounded-xl bg-black flex flex-col justify-center items-center p-vsm gap-vsm', token.tokenId === selectedToken.tokenId ? '' : 'hover:brightness-150 hover:cursor-pointer')}>
                  <SmallCard token={token} displayImage={innerHeight >= 800}></SmallCard>
                </motion.li>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}