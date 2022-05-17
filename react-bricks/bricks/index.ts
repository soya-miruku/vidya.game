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
import BlogSection from './molecules/BlogSection';
import VideoHeroUnit from './molecules/VideoHeroUnit';
import SmallHeroUnit from './molecules/SmallHeroUnit';
import IntroUnit from './molecules/IntroUnit';
import ProgramHeroUnit from './molecules/ProgramHeroUnit';
import PricesSectionUnit from './molecules/PricesSectionUnit';
import Promo1HeroUnit from './molecules/Promo1HeroUnit';
import Promo2HeroUnit from './molecules/Promo2HeroUnit';
import SpacerUnit from './molecules/SpacerUnit';

const bricks: types.Brick<any>[] = [
  // ...website, // React Bricks UI
  CallHeroImage,
  CallHeroColumn,
  SmallHeroUnit,
  BlogSection,
  IntroUnit,
  SpacerUnit,
  VideoHeroUnit,
  ProgramHeroUnit,
  PricesSectionUnit,
  Promo1HeroUnit,
  Promo2HeroUnit,
  VRBButton,
  VRBRichText,
  VRBColumn,
  VRBText,
  VRBTitle,
  VRBLabel,
  VRBImage,
  VRBCustomer,
  Customers
]

export default bricks
