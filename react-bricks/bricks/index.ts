import { types } from 'react-bricks/frontend'
import website from 'react-bricks-ui/website'
import CallHeroImage from './molecules/CallHeroImage';
import VRBButton from './atoms/VRBButton';
import VRBRichText from './atoms/VRBRichText';
import VRBImage from './atoms/VRBImage';
import VRBText from './atoms/VRBText';
import VRBLabel from './atoms/VRBLabel';
import VRBCustomer from './atoms/VRBCustomer';
import Customers from './molecules/Customers';
import CallHeroColumn from './molecules/CallHeroColumn';
import VRBColumn from './atoms/VRBColumn';
import VRBTitle from './atoms/VRBTitle';
import BlogListUnit from './molecules/BlogListUnit';
import VideoHeroUnit from './molecules/VideoHeroUnit';
import SmallHeroUnit from './molecules/SmallHeroUnit';
import IntroUnit from './molecules/IntroUnit';
import ProgramHeroUnit from './molecules/ProgramHeroUnit';
import CoinGeckoPricesSectionUnit from './molecules/CoinGeckoPricesSectionUnit';
import Promo1HeroUnit from './molecules/Promo1HeroUnit';
import Promo2HeroUnit from './molecules/Promo2HeroUnit';
import SpacerUnit from './molecules/SpacerUnit';
import ProgramListUnit from './molecules/ProgramListUnit';
import GameListUnit from './molecules/GameListUnit';
import TeamListUnit from './molecules/TeamListUnit';
import VRBTeamCard from './atoms/VRBTeamCard';
import VRBIconCard from './atoms/VRBIconCard';
import VRBDetailCard from './atoms/VRBDetailCard';
import FeaturesSmallListUnit from './molecules/FeaturesSmallListUnit';
import DetailsListUnit from './molecules/DetailListUnit';
import FeaturesMedListUnit from './molecules/FeaturesMedListUnit';
import VRBFeatureCard from './atoms/VRBFeatureCard';
import SwapUnit from './molecules/SwapUnit';
import EmptyUnit from './molecules/EmptyUnit';
import GeneratorStatsUnit from './molecules/GeneratorStatsUnit';
import GeneratorStakingInfoUnit from './molecules/GeneratorStakingInfoUnit';
import MultiPassStatsUnit from './molecules/MultipassStatsUnit';
import PDFViewUnit from './molecules/PDFViewUnit';
import ProgramVideoHeroUnit from './molecules/ProgramVideoHeroUnit';
import MinimapCarouselUnit from './molecules/MinimapCarouselUnit';
import SimpleImage from './atoms/SimpleImage';
import HeroWithTabsUnit from './molecules/HeroWithTabsUnit';
import VRBProductView from './atoms/VRBProductView';

const bricks: types.Brick<any>[] = [
  // ...website, // React Bricks UI
  CallHeroImage,
  CallHeroColumn,
  SmallHeroUnit,
  BlogListUnit,
  ProgramListUnit,
  GameListUnit,
  TeamListUnit,
  FeaturesMedListUnit,
  FeaturesSmallListUnit,
  DetailsListUnit,
  IntroUnit,
  SpacerUnit,
  SwapUnit,
  VideoHeroUnit,
  ProgramHeroUnit,
  CoinGeckoPricesSectionUnit,
  Promo1HeroUnit,
  Promo2HeroUnit,
  VRBFeatureCard,
  VRBTeamCard,
  VRBIconCard,
  VRBDetailCard,
  VRBButton,
  VRBRichText,
  VRBColumn,
  VRBText,
  VRBTitle,
  VRBLabel,
  VRBImage,
  VRBCustomer,
  Customers,
  EmptyUnit,
  GeneratorStatsUnit,
  GeneratorStakingInfoUnit,
  MultiPassStatsUnit,
  ProgramVideoHeroUnit,
  PDFViewUnit,
  MinimapCarouselUnit,
  SimpleImage,
  HeroWithTabsUnit,
  VRBProductView
]

export default bricks
