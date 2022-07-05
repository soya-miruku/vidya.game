import React from 'react'
import { types, Repeater, useAdminContext } from 'react-bricks/frontend';
import { classNames } from '@/common/helpers'
import { blockNames } from '../blockNames'
import { ISmallHeroProps, SmallHero } from '@/components/organisms/smallHero';


const SmallHeroUnit: types.Brick<ISmallHeroProps> = ({ title, desc, imgSrc, backgroundFit }) => {
  const { isAdmin } = useAdminContext();
  return (
    <div className='w-full h-full '>
      <SmallHero title={title} desc={desc} imgSrc={(imgSrc as any)?.src} canEdit={isAdmin} backgroundFit={backgroundFit}></SmallHero>
    </div>
  )
}

SmallHeroUnit.schema = {
  name: blockNames.SmallHeroUnit,
  label: 'Small Hero Unit',
  category: 'TeamOs-Molecules',

  getDefaultProps: () => ({
    title: 'Small Hero Title',
    desc: 'Small Hero Description',
    imgSrc: '/banner0.png',
    backgroundFit: 'cover'
  }),
  sideEditProps: [
    {
      name: 'imgSrc',
      label: 'Image Src',
      type: types.SideEditPropType.Image
    },
    {
      name: 'backgroundFit',
      label: 'Background Fit',
      type: types.SideEditPropType.Select,
      selectOptions: {
        display: types.OptionsDisplay.Select,
        options: [
        {
          label: 'Cover',
          value: 'cover'
        },
        {
          label: 'Contain',
          value: 'contain'
        },
        {
          label: 'None',
          value: 'none'
        },
        {
          label: 'Fill',
          value: 'fill'
        }
      ]
    }
    }
  ],
}

export default SmallHeroUnit
