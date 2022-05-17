import React from 'react'
import { types, Repeater, useAdminContext } from 'react-bricks/frontend';
import { classNames } from '@/common/helpers'
import { blockNames } from '../blockNames'
import { ISmallHeroProps, SmallHero } from '@/components/organisms/smallHero';


const SmallHeroUnit: types.Brick<ISmallHeroProps> = ({ title, desc, imgSrc }) => {
  const { isAdmin } = useAdminContext();
  return (
    <div className='w-full h-full '>
      <SmallHero title={title} desc={desc} imgSrc={(imgSrc as any)?.src} canEdit={isAdmin}></SmallHero>
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
  }),
  sideEditProps: [
    {
      name: 'imgSrc',
      label: 'Image Src',
      type: types.SideEditPropType.Image
    }
  ],
}

export default SmallHeroUnit
