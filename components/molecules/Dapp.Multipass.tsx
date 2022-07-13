import { classNames } from "@/common/helpers";
import { CHAIN_MULTIPASS_SETTINGS } from "@/contracts/multipass";
import { useGetMultipleTokenIds, useGetMultipleTokenRanks, useGetMultipleTokenURIs, useGetOwnerTokenIdByIndex, useTokenURI } from "@/hooks/dapps/multipass/useNftPasses";
import { useBalances } from "@/hooks/dapps/uniswap/useBalances";
import { useAccount } from "@/hooks/useAccount";
import Image from "next/image";
import { useState, useMemo, useEffect, useRef } from "react";
import { isMobile } from "react-device-detect";
import { AuthenticatedView, UnAuthenticatedView } from "../atoms/AuthenticatedView";
import { VLabel } from "../atoms/VLabel";
import { VText } from "../atoms/VText";
import { VTitle } from "../atoms/VTitle";
import { DappLogin } from "./DappLogin";

export interface INFTAttribute {
  traitType: string;
  value: string;
}
export interface INFT {
  tokenId: number;
  tokenRank: number;
  name: string;
  description: string;
  attributes: INFTAttribute[];
  mediaSrc: string;
}

export interface IMultiPassesListViewProps {
  tokens: INFT[];
  currentlySelectedTokenIndex: number;
  onTokenClick: (tokenId: number) => void;
}

export const MultiPassesListView = ({tokens, currentlySelectedTokenIndex, onTokenClick}: IMultiPassesListViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleWheelScroll = (e: any) => {
    if(containerRef.current || !isMobile) {
      const { scrollLeft } = containerRef.current;
      const smoothX = scrollLeft + e.deltaY * .45;
      containerRef.current.scrollLeft = smoothX;
    }
  }

  return (
    <div className="w-full flex justify-center items-end p-vmd">
      <div ref={containerRef} onWheel={handleWheelScroll} className="flex gap-vsm justify-start items-center overflow-x-scroll w-full scrollbar-thin py-vmd">
        {tokens.length <= 0 && <VText size="lg">You do not own any passes</VText>}
        {tokens.map((token, index) => {
          return (
            <div onClick={() => onTokenClick(index)} key={`${token.tokenId}_${index}`} 
            className={classNames('min-w-[151px] h-[200px] bg-black border-[1px] flex flex-col justify-center items-center p-vsm gap-vsm',
            index === currentlySelectedTokenIndex ? 'bg-white border-white' : 'bg-black border-black hover:brightness-150 hover:cursor-pointer'
            )}>
              <div className="h-full w-full flex justify-center items-center gap-vsm">
                <div className="">
                  <VLabel overrideColors>{token.tokenId}</VLabel>
                </div>
                <div className="flex">
                  <VText overrideTextColor size="sm">{token.name} - Lv.{token.tokenRank}</VText>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const MultiPassDapp = ({}) => {
  const { chainId } = useAccount();
  const [ balance ] = useBalances([CHAIN_MULTIPASS_SETTINGS[chainId].contractAddress])
  const [ currentTokenIndex, setCurrentTokenIndex ] = useState(0);
  const { tokenIds } = useGetMultipleTokenIds(balance);
  const { tokenURIs } = useGetMultipleTokenURIs(tokenIds);
  const { tokenRanks } = useGetMultipleTokenRanks(tokenIds);

  const nfts: INFT[] = useMemo(() => {
    const empty = {
      tokenId: 0,
      tokenRank: 0,
      name: '',
      description: 'To live and die for the entertainment of another is to mimic the great comedy of the natural world.',
      attributes: [],
      mediaSrc: ''
    }
    const dummyResults = Array.from({length: 8}).map(() => ({
      ...empty,
      tokenId: Math.floor(Math.random() * 100),
      tokenRank: Math.floor(Math.random() * 10),
    }));
    
    if(!tokenRanks || tokenRanks.length <= 0) return dummyResults;
    if(!tokenURIs || tokenURIs.length <= 0) return dummyResults;
    if(!tokenIds || tokenIds.length <= 0) return dummyResults;

    return tokenRanks.map((rank, index) => {
      return {
        tokenId: tokenIds[index],
        tokenRank: rank,
        tokenUri: tokenURIs[index],
      }
    }).sort((a, b) => a.tokenRank - b.tokenRank).map((token, index) => {
      const tokenURI = token.tokenUri;
      if(!tokenURI) return null;
      const nftItem = tokenURI && JSON.parse(Buffer.from(tokenURI.substring(29), "base64").toString());
      const nft = nftItem && {
        name: nftItem.name,
        description: nftItem.description,
        attributes: nftItem.attributes.map(attribute => ({
          traitType: attribute.trait_type,
          value: attribute.value
        })),
        mediaSrc: nftItem.image
      }
      return {
        tokenId: token.tokenId,
        tokenRank: token.tokenRank,
        ...nft
      }
    }).filter(nft => nft !== null);
  }, [tokenRanks, tokenURIs, tokenIds]);

  const nft: INFT = useMemo(() => {
    if(!nfts) return null;
    return nfts[currentTokenIndex];
  }, [nfts, currentTokenIndex])

  return (
    <div className="w-full h-full">
      <UnAuthenticatedView>
        <DappLogin/>
      </UnAuthenticatedView>
      <AuthenticatedView>
        <div className="w-full h-full flex overflow-hidden justify-between flex-col overflow-y-auto">
          <div className="w-full flex justify-between sm:flex-row flex-col gap-vsm p-vmd">
            <div className="flex flex-col border-[1px] border-accent-dark-800 bg-black sm:w-[300px] w-full">
              <div className="flex justify-between items-center p-vsm">
                <VTitle overrideTextColor type="h5"><span className="border-[1px] px-2 border-accent-dark-100 text-accent-dark-100">{nft?.tokenId}</span> - {nft?.name || 'PLACEHOLDER'}</VTitle>
                <VLabel overrideColors>Lv. {nft?.tokenRank || 0}</VLabel>
              </div>
              <div className="w-full px-vsm flex flex-col justify-center items-center">
                <VText overrideTextColor size='md'>{nft?.description}</VText>
                <div className="w-[200px] sm:h-[223px] h-[250px] relative">
                  {nft?.mediaSrc ? <video style={{
                    objectFit: 'contain',
                    width: '100%',
                    height: '100%',
                  }} src={nft.mediaSrc} autoPlay loop muted></video> : <Image layout="fill" objectFit='contain' src='/placeholders/img.png'></Image> }
                </div>
              </div>
              <div className="w-[100.5%] h-auto bg-accent-dark-800 px-vsm text-center hover:brightness-150 hover:cursor-pointer">
                <VText size="md" overrideTextColor className="w-full font-bold">BURN</VText>
                <VText className="!text-[11px] uppercase !text-light-300" size="sm">Destroy this multipass and redeem its reserved ETH value</VText>
              </div>
            </div>
            <div className="w-full border-[1px] flex p-vsm">
              <VTitle type="h5">Actions</VTitle>
            </div>
          </div>
          <div className="w-full p-vsm">
            <div className="w-full border-[1px] border-accent-dark-100 p-vsm gap-y-vsm">
              <VText size="lg">BALANCE - {balance}</VText>
              {balance >= 0 && <div className="flex w-full justify-center items-start">
                <div className="sm:w-52 w-full h-52 border-2 border-dashed flex justify-center items-center p-vmd">
                  <VText size="md" className="font-mono">Drag and drop passes here to begin merging</VText>
                </div>
              </div>}
              <MultiPassesListView currentlySelectedTokenIndex={currentTokenIndex} onTokenClick={(index) => setCurrentTokenIndex(index)} tokens={nfts}/>
          </div>
          </div>
      </div>
      </AuthenticatedView>
    </div>
  )
}