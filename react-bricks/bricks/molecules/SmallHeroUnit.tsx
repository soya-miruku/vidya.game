import React from 'react'
import { types, useAdminContext } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'
import { ISmallHeroProps, SmallHero } from '@/components/organisms/smallHero';


interface ISmallHeroUnitProps extends ISmallHeroProps {
  imgSrc?: any
}

const SmallHeroUnit: types.Brick<ISmallHeroUnitProps> = ({ roundedSide, title, description, imgSrc, backgroundFit }) => {
  const { isAdmin } = useAdminContext();
  return (
    <div className='w-full h-full prose'>
      <SmallHero roundedSide={roundedSide} imgSrc={(imgSrc as any)?.src} title={title} description={description} canEdit={isAdmin} backgroundFit={backgroundFit}/>
      <div className='w-full h-12'></div>
    </div>
  )
}

SmallHeroUnit.schema = {
  name: blockNames.SmallHeroUnit2,
  label: 'Small Hero Unit',
  category: 'TeamOs-Molecules',

  getDefaultProps: () => ({
    title: '',
    description: '',
    imgSrc: '/banner0.png',
    backgroundFit: 'cover',
    roundedSide: 'none'
  }),
  sideEditProps: [
    {
      name: 'imgSrc',
      label: 'Image Src',
      type: types.SideEditPropType.Image
    },
    {
      name: 'roundedSide',
      label: 'Rounded Side',
      type: types.SideEditPropType.Select,
      selectOptions: {
        display: types.OptionsDisplay.Select,
        options: [
          {
            label: 'None',
            value: 'none'
          },
          {
            label: 'Left',
            value: 'left'
          },
          {
            label: 'Right',
            value: 'right'
          }
        ]
      }
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
