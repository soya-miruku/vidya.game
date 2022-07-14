import { CHAIN_MULTIPASS_SETTINGS } from "@/contracts/multipass";
import { useGetMultipleTokenIds, useGetMultipleTokenRanks, useGetMultipleTokenURIs } from "@/hooks/dapps/multipass/useNftPasses";
import { useBalances } from "@/hooks/dapps/uniswap/useBalances";
import { useAccount } from "@/hooks/useAccount";
import { useState, useMemo } from "react";
import { AuthenticatedView, UnAuthenticatedView } from "@/components/atoms/AuthenticatedView";
import { VText } from "@/components/atoms/VText";
import { DappLogin } from "@/components/molecules/DappLogin";
import { INFT } from "./types";
import { mapRankToColors, mapRankToImage } from "./helpers";
import { ControlPanel } from "./ControlPanel";
import { MultiPassesListView } from "./MultiPassesListView";
import { MultiPassView } from "./MultiPassView";
import { AnimatePresenceModal, Modal } from "@/components/atoms/Modal";
import { VTitle } from "@/components/atoms/VTitle";
import { VButton } from "@/components/atoms/VButton";
import { NumberInput } from "@/components/atoms/NumberInput";

export const MultiPassDapp = ({}) => {
  const { chainId } = useAccount();
  const [ balance ] = useBalances([CHAIN_MULTIPASS_SETTINGS[chainId].contractAddress])
  const [ currentTokenIndex, setCurrentTokenIndex ] = useState(0);
  const { tokenIds } = useGetMultipleTokenIds(balance);
  const { tokenURIs } = useGetMultipleTokenURIs(tokenIds);
  const { tokenRanks } = useGetMultipleTokenRanks(tokenIds);
  const [ nextToken, setNextToken ] = useState<number>(0);
  const [ showConfirmModal, setShowConfirmModal ] = useState(false);

  const nfts: INFT[] = useMemo(() => {
    if(!tokenRanks || tokenRanks.length <= 0) return [];
    if(!tokenURIs || tokenURIs.length <= 0) return [];
    if(!tokenIds || tokenIds.length <= 0) return [];

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
        mediaSrc: nftItem.image,
        imgSrc: mapRankToImage(token.tokenRank),
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

  const handleNextToken = (tokenId: number, hasProgress: boolean) => {
    const index = nfts.findIndex(nft => nft.tokenId === tokenId);
    setNextToken(index);
    if(hasProgress){
      setShowConfirmModal(true);
    }
    else {
      setCurrentTokenIndex(index)
    }
  }

  return (
    <div className="w-full h-full relative">
      <AnimatePresenceModal>
        {showConfirmModal && <Modal>
          <div className="flex flex-col justify-center items-center dark:bg-dark-300 bg-light-200 rounded-xl p-vxl drop-shadow-xl gap-vsm">
            <VTitle type='h4'>You are about to leave the merge phase</VTitle>
            <VText size="lg">Are you sure you want to leave the merge phase?</VText>
            <div className="flex justify-between gap-x-vmd">
              <VButton primary animate={false} customColor='#FF4365' onClick={() => {
                setShowConfirmModal(false);
                setCurrentTokenIndex(nextToken)
              }}>Leave</VButton>
              <VButton primary onClick={() => setShowConfirmModal(false)}> Stay
              </VButton>
            </div>
          </div>

        </Modal>}
      </AnimatePresenceModal>
      <UnAuthenticatedView>
        <DappLogin/>
      </UnAuthenticatedView>
      <AuthenticatedView>
        <div id="modal-multipass-inner" className="w-full h-full flex overflow-hidden justify-between flex-col overflow-y-auto">
          <div className="w-full h-full flex justify-between items-start sm:flex-row flex-col gap-vlrg p-vsm">
            <div className="flex flex-col gap-vmd h-full sm:w-auto w-full justify-center items-center">
              {nft && <MultiPassView token={nft}/>}
              <ControlPanel nft={nft}/>
            </div>
            <div className="flex flex-col w-full h-full items-end justify-between gap-vmd">
              <div className="flex flex-col w-full h-auto border-4 rounded-tr-2xl rounded-bl-2xl p-vsm gap-y-vsm" style={{ borderColor: mapRankToColors(nft?.tokenRank).bgColor }}>
                  <div>
                    <VText size="md">BUY LEVELS</VText>
                    <div className="flex justify-start items-center h-[55px] gap-[5px]">
                      <div className="flex flex-col gap-y-[5px]">
                        <button className="sm:px-2 px-2 py-0 border-2 rounded-bl-lg rounded-tr-lg" style={{
                          borderColor: mapRankToColors(nft?.tokenRank).bgColor,
                        }}>
                          <VText size='md'>+</VText>
                        </button>
                        <button className="sm:px-2 px-2 py-0 border-2 rounded-br-lg rounded-tl-lg" style={{
                          borderColor: mapRankToColors(nft?.tokenRank).bgColor,
                        }}>
                          <VText size='md'>-</VText>
                        </button>
                      </div>
                      <NumberInput style={{
                        borderColor: mapRankToColors(nft?.tokenRank).bgColor,
                      }} className="focus:outline-none bg-transparent sm:w-36 w-16 h-full border-[2px] rounded-bl-lg rounded-tr-lg text-body dark:text-light-100 text-dark-100 appearance-none outline-none p-1" min={0} max={balance} step='1'></NumberInput>
                      </div>
                  </div>
                  <div>
                    <VText size="md">BURN LEVELS</VText>
                    <div className="flex justify-start items-center h-[55px] gap-[5px]">
                      <div className="flex flex-col gap-y-[5px]">
                        <button className="sm:px-2 px-2 py-0 border-2 rounded-bl-lg rounded-tr-lg" style={{
                          borderColor: mapRankToColors(nft?.tokenRank).bgColor,
                        }}>
                          <VText size='md'>+</VText>
                        </button>
                        <button className="sm:px-2 px-2 py-0 border-2 rounded-br-lg rounded-tl-lg" style={{
                          borderColor: mapRankToColors(nft?.tokenRank).bgColor,
                        }}>
                          <VText size='md'>-</VText>
                        </button>
                      </div>
                      <NumberInput style={{
                        borderColor: mapRankToColors(nft?.tokenRank).bgColor,
                      }} className="focus:outline-none bg-transparent sm:w-36 w-16 h-full border-[2px] rounded-bl-lg rounded-tr-lg text-body dark:text-light-100 text-dark-100 appearance-none outline-none p-1" min={0} max={balance} step='1'></NumberInput>
                      </div>
                  </div>
              </div>
              <div className="w-full h-auto flex flex-col justify-start items-start border-4 rounded-tl-2xl rounded-br-2xl border-accent-dark-100 p-vsm" style={{ borderColor: mapRankToColors(nft?.tokenRank).bgColor }}>
                <VText className="px-vsm" size="lg">BALANCE - <span className="font-bold">{balance}</span></VText>
                <MultiPassesListView currentlySelectedTokenIndex={currentTokenIndex} onTokenClick={handleNextToken} tokens={nfts}/>
              </div>
            </div>
          </div>
      </div>
      </AuthenticatedView>
    </div>
  )
}