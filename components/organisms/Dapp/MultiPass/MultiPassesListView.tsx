import { useEffect, useMemo, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { motion } from "framer-motion";
import { classNames } from "@/common/helpers";
import { VText } from "@/components/atoms/VText";
import { VTitle } from "@/components/atoms/VTitle";
import { IMultiPassesListViewProps, INFT } from "./types";
import { Deck } from "@/components/organisms/Dapp/MultiPass/Deck";
import { mapRankToColors } from "./helpers";
import { VButton } from "@/components/atoms/VButton";
import { useMergePasses } from "@/hooks/dapps/multipass/useMege";
import { VImage } from "@/components/atoms/VImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDashed } from "@fortawesome/pro-regular-svg-icons";

const MAX_MERGE_LIST = 10;

export const SmallCard = ({token, padding, displayImage, selected}: {token: INFT, padding?: boolean, displayImage?: boolean, selected?: boolean}) => {
  return (
    <div className="h-full w-full relative flex flex-col justify-between items-start gap-vsm" style={{
      padding: padding ? '0.5rem' : '0',
    }}>
      <div className="w-full h-full absolute z-[100]"></div>
      <div className="flex w-full justify-between z-0 p-[5px]">
        <VTitle overrideTextColor type="h6"><span className="border-[1px] px-2 " style={{
          borderColor: mapRankToColors(token?.tokenRank.rank).bgColor,
          color: mapRankToColors(token?.tokenRank.rank).bgColor,
        }}>Lv.{token?.tokenRank?.level}</span></VTitle>
        <VTitle type="h6">#{token.tokenId}</VTitle>
      </div>
      {displayImage && <div className="flex flex-col h-full w-full justify-center items-center">
        <VImage objectFit="contain" src={token?.imgSrc} width={80} height={100}></VImage>
      </div>}
      <div className="flex w-full justify-between items-center">
        <VText overrideTextColor size="sm">{token.name}</VText>
        {selected && <FontAwesomeIcon className="text-accent-dark-100" icon={faCircleDashed}></FontAwesomeIcon>}
      </div>
    </div>
  )
}

export const MultiPassesListView = ({tokens, currentlySelectedTokenIndex, onTokenClick, onMergingBegan, onMergingEnded}: IMultiPassesListViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const [mergeList, setMergeList] = useState<INFT[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [availableTokens, setAvailableTokens] = useState<INFT[]>(tokens);
  const [selectedToken, setSelectedToken] = useState<INFT>(tokens && tokens[currentlySelectedTokenIndex]);

  const { mergePasses, state } = useMergePasses(selectedToken?.tokenId, mergeList?.map(token => token.tokenId) || []);

  const isMerginInProgress = useMemo(() => state.status === 'Mining' || state.status === 'PendingSignature', [state.status]);

  useEffect(() => {
    if(!tokens) return;
    setAvailableTokens(tokens);
    setSelectedToken(tokens[currentlySelectedTokenIndex]);
    setMergeList([]);
  }, [currentlySelectedTokenIndex, JSON.stringify(tokens)]);

  useEffect(() => {
    if(mergeList.length <= 0) {
      onMergingEnded([]);
      
      setAvailableTokens(tokens);
    }
    else if(mergeList.length > 0) {
      onMergingBegan && onMergingBegan();
    }
  }, [JSON.stringify(mergeList)]);

  useEffect(() => {
    if(state.status === 'Success') {
      onMergingEnded(mergeList);
    }
  }, [state])

  const handleDragEnd = (nft: INFT, index: number, e: any) => {
    setIsDragging(() => false)

    if(dropZoneRef.current) {
      const { left, top, width, height } = dropZoneRef.current.getBoundingClientRect();
      const { clientX, clientY } = e;
      const isInDropZone = clientX >= left && clientX <= left + width && clientY >= top && clientY <= top + height;
      if(isInDropZone) {
        if(!mergeList.includes(nft) && mergeList.length + 1 < MAX_MERGE_LIST) {
          setMergeList([...mergeList, nft]);
          setAvailableTokens(availableTokens.filter(token => token.tokenId !== nft.tokenId ));
        }
      }
    }
  }

  return (
    <div className="w-full h-full flex justify-center items-end px-vsm">
      <div className="flex flex-col gap-vlrg justify-start items-center w-full h-full">
        <div ref={containerRef} className="flex w-full h-full flex-col justify-between gap-vsm overflow-x-scroll scrollbar-thin relative z-100 py-vsm">
          {availableTokens.length <= 0 && mergeList.length <=0 && <VText size="lg">You do not own any passes</VText>}
          {(availableTokens.length > 0 || mergeList.length > 0) && <div className="flex w-full justify-center items-start z-0 h-auto">
          <div ref={dropZoneRef} className="w-full h-[300px] border-[1px] border-dashed rounded-tl-2xl flex justify-center items-center p-vmd -z-[1]">
              { mergeList.length <= 0 && 
                <div className="flex justify-center w-full">
                  <VText size="lg" className="font-mono">
                    {availableTokens.length > 1 ? 'Drag and drop passes here to begin merging with the selected pass ': 'You need to own at least 1 more Multipass in order to merge with '}<span className="font-bold">(#{selectedToken?.tokenId})</span>
                  </VText>
                </div>
              }
            {mergeList.length > 0 && <div className="w-full h-full overflow-hidden flex">
              <p>{(mergeList?.length || 0) + 1} / {MAX_MERGE_LIST}</p>
              <Deck 
                isLoading={isMerginInProgress}
                items={mergeList}
                onRemove={(nft) => {
                  setMergeList(mergeList.filter(token => token.tokenId !== nft.tokenId));
                  setAvailableTokens([...availableTokens, nft]);
                }}/>
               <div className="flex flex-col gap-vsm justify-center items-center">
                <VButton rounded={false} disabled={isMerginInProgress} primary animate={false} customColor={mapRankToColors(selectedToken.tokenRank.rank).bgColor}
                  className="h-full w-[50px] rounded-tr-2xl rounded-br-2xl flex justify-center items-center font-bold hover:!bg-accent-dark-200" 
                  onClick={async () => {
                    await mergePasses();
                  }}>
                  <p className="rotate-90" style={{color: mapRankToColors(selectedToken.tokenRank.rank).textColor}}>Merge</p>
                </VButton>
              </div>
            </div>}
          </div>
          </div>}
          <div className="flex flex-col h-full w-full items-center justify-end gap-vsm">
          {state.errorMessage && <VText size="lg" className="font-mono w-auto !text-aimbotsRed-100">{state.errorCode === -32000 ? 'Cannot estimate gas' : state.errorMessage}</VText>}
          {state.status === 'Success' && <VText size="lg" className="font-mono w-auto !text-aimbotsGreen-100">Merge successful</VText>}
          <div className="flex gap-vmd justify-center items-end flex-wrap px-vsm h-auto w-full">
            {selectedToken?.tokenId && availableTokens.map((token, index) => {
              if(!token) return null;
              return (
                <motion.li 
                  drag={token.tokenId !== selectedToken.tokenId && !isMerginInProgress}
                  dragConstraints={{left: 0, right: 0, top: 0, bottom: 0}}
                  dragElastic={1}
                  onDragStart={() => setIsDragging(() => true)}
                  onDragEnd={(e) => handleDragEnd(token, index, e)}
                  onClick={() => {
                    if(isDragging || token.tokenId === selectedToken.tokenId) return;
                    //document.getElementById('modal-multipass-inner').scrollTo(0,0)
                    onTokenClick(token.tokenId, mergeList.length > 0);
                  }}  
                  key={`${token.tokenId}_${index}`}
                  transition={(_) => {
                    return !isDragging;
                  }}
                  style={{
                    left: `${index * 130}px`,
                    borderColor: token.tokenId !== selectedToken.tokenId ? '#734a9e00' : mapRankToColors(selectedToken.tokenRank.rank).bgColor,
                    borderWidth: token.tokenId === selectedToken.tokenId ? '4px' : '2px',
                    filter: token.tokenId !== selectedToken.tokenId ? 'drop-shadow(0px 0px 10px #734a9e)' : 'none',
                  }}
                  className={classNames('min-w-[115px] rounded-xl bg-black flex flex-col justify-center items-center p-vsm gap-vsm', token.tokenId === selectedToken.tokenId ? '' : 'hover:brightness-150 hover:cursor-pointer')}>
                  <SmallCard selected={token.tokenId === selectedToken.tokenId} token={token} displayImage={!isMobile}></SmallCard>
                </motion.li>
              )
            })}
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}