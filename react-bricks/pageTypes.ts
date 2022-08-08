import { pageNames } from '@/common/pageNames'
import { types } from 'react-bricks/frontend'
import { blockNames } from './bricks/blockNames'


export const pageTypes: types.IPageType[] = [
  {
    name: pageNames.PAGE.name,
    pluralName: pageNames.PAGE.plural,
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
  },
  {
    name: pageNames.PROGRAM.name,
    pluralName: pageNames.PROGRAM.plural,
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
  },
  {
    name: pageNames.GAME.name,
    pluralName: pageNames.GAME.plural,
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
  },
  {
    name: pageNames.ABOUT.name,
    pluralName: pageNames.ABOUT.plural,
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
  },
  {
    name: pageNames.POST.name,
    pluralName: pageNames.POST.plural,
    defaultLocked: true,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [blockNames.SmallHeroUnit],
  }
]

export default pageTypes