import { types } from 'react-bricks/frontend'
import website from 'react-bricks-ui/website'
import HeroUnit from './atoms/ButtonItem';
import CallHeroUnit from './molecules/CallHeroUnit';
import TwoColumnsUnit from './molecules/TwoColumns';
import Button from './atoms/ButtonItem';
import Text from './atoms/TextItem';

const bricks: types.Brick<any>[] = [
  ...website, // React Bricks UI
  HeroUnit,
  CallHeroUnit,
  TwoColumnsUnit,
  Button,
  Text
]

export default bricks
