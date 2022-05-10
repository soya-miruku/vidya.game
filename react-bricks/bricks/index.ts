import { types } from 'react-bricks/frontend'
import website from 'react-bricks-ui/website'
import CallHeroUnit from './molecules/CallHeroUnit';
import TwoColumnsUnit from './molecules/TwoColumns';
import Button from './atoms/ButtonItem';
import Text from './atoms/TextItem';
import Image from './atoms/ImageItem';

const bricks: types.Brick<any>[] = [
  // ...website, // React Bricks UI
  CallHeroUnit,
  TwoColumnsUnit,
  Button,
  Text,
  Image
]

export default bricks
