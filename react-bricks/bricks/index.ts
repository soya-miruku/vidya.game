import { types } from 'react-bricks/frontend'
import website from 'react-bricks-ui/website'
import CallHeroImage from './molecules/CallHeroImage';
import TwoColumnsUnit from './molecules/TwoColumns';
import VRBButton from './atoms/VRBButton';
import Text from './atoms/TextItem';
import VRBImage from './atoms/VRBImage';
import VRBText from './atoms/VRBText';
import VRBLabel from './atoms/VRBLabel';
import VRBCustomer from './atoms/VRBCustomer';
import Customers from './molecules/Customers';
import CallHeroColumn from './molecules/CallHeroColumn';
import VRBColumn from './atoms/VRBColumn';
import VRBTitle from './atoms/VRBTitle';

const bricks: types.Brick<any>[] = [
  // ...website, // React Bricks UI
  CallHeroImage,
  CallHeroColumn,
  TwoColumnsUnit,
  VRBButton,
  Text,
  VRBColumn,
  VRBText,
  VRBTitle,
  VRBLabel,
  VRBImage,
  VRBCustomer,
  Customers
]

export default bricks
