export interface INFTAttribute {
  traitType: string;
  value: string;
}
export interface ITokenRank {
  rank: number;
  level: number;
}
export interface INFT {
  tokenId: number;
  tokenRank: ITokenRank;
  name: string;
  description: string;
  attributes: INFTAttribute[];
  mediaSrc: string;
  imgSrc: string;
}

export interface IMultiPassesListViewProps {
  tokens: INFT[];
  currentlySelectedTokenIndex: number;
  onTokenClick: (tokenId: number, hasProgress: boolean) => void;
  onMergingBegan: () => void;
  onMergingEnded: () => void;
  onMerginInProgress: (inProgress) => void;
}

export interface IMultiPassViewProps {
  token: INFT;
  isMerging: boolean;
  reservedETH: number;
}

export interface IControlPanelProps {
  nft: INFT
  reservedETH:number
  canBurnOrBuyLevels: boolean
  onPassDestroyed: (nft: INFT) => void
  onBurningPass: (isBurning: boolean) => void
}