import { types } from 'react-bricks/frontend'
import website from 'react-bricks-ui/website'
import HeroUnit from './MyHeroUnit';
import CallHeroUnit from './CallHeroUnit';

const bricks: types.Brick<any>[] = [
  ...website, // React Bricks UI
  HeroUnit,
  CallHeroUnit
]

export default bricks
