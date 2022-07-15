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
  const [ isMerging, setIsMerging ] = useState(false);

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
      setIsMerging(false);
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
                setCurrentTokenIndex(nextToken);
                setIsMerging(false);
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
        <div id="modal-multipass-inner" className="w-full h-full flex overflow-hidden sm:justify-center justify-between flex-col overflow-y-auto">
          <div className="w-full h-auto flex justify-between items-start sm:flex-row flex-col gap-vlrg p-vsm">
            <div className="flex flex-col gap-vmd h-full sm:w-auto w-full justify-start items-center ">
              {nft && <MultiPassView token={nft} isMerging={isMerging}/>}
              <ControlPanel nft={nft} balance={balance}/>
            </div>
            <div className="flex flex-col w-full h-full items-end justify-between gap-vmd">
              <div className="w-full h-full flex flex-col justify-start items-start border-4 rounded-tl-2xl rounded-br-2xl border-accent-dark-100 p-vsm" style={{ borderColor: mapRankToColors(nft?.tokenRank).bgColor }}>
                <div className="flex gap-x-vsm justify-between w-full items-center px-vsm">
                  <VText className="px-vsm sm:w-auto w-full" size="lg">BALANCE - <span className="font-bold">{balance}</span></VText>
                  {nft && isMerging && <VTitle className="w-auto" type="h6">Merging has been initiated for (#{nft.tokenId})</VTitle>}
                </div>
                <MultiPassesListView onMergingEnded={() => setIsMerging(false)} onMergingBegan={() => setIsMerging(true)} currentlySelectedTokenIndex={currentTokenIndex} onTokenClick={handleNextToken} tokens={nfts}/>
              </div>
            </div>
          </div>
      </div>
      </AuthenticatedView>
    </div>
  )
}