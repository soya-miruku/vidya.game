import { VLabel } from '@/components/atoms/VLabel';
import { VText } from '@/components/atoms/VText';
import { VTitle } from '@/components/atoms/VTitle';
import * as React from 'react'
import { Text, RichText, Image, types, Link, Repeater } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'

export interface IVRBProductViewProps {
  label: string
  title: string
  subtitle: string
  image: string
}

const VRBProductView: types.Brick<IVRBProductViewProps> = ({
  title,
  subtitle,
  image,
  label,
  ...rest
}) => {
  return (
    <Link {...rest}>
    <div className='flex w-full justify-center items-center flex-wrap sm:flex-row flex-col-reverse px-vsm'>
      <div className='flex justify-center sm:w-[60%] w-full h-auto flex-col py-vsm px-[5px] gap-vsm'>
        <div className='w-auto flex'>
          <VLabel>{label}</VLabel>
        </div>
        <VTitle type='h1'>{title}</VTitle>
        <VText  size='lg'>{subtitle}</VText>
      </div>
      <div className='flex sm:w-[40%] w-full h-full flex-col'>
        <div className='sm:max-w-[790px] w-auto h-full flex justify-center z-10 p-vsm'>
            <Image
              propName="image"
              alt="image"
              useWebP={false}
              noLazyLoad
              useNativeLazyLoading={false}
              renderWrapper={({ children }) => {
                return (
                  <div className={'w-full h-full min-w-[200px] min-h-[200px]'}>
                    {children}
                  </div>
                )
              }}
              imageClassName="h-full w-full mb-0 ml-2 origin-center animate-brightGlowSlow"
            />
      </div>
      </div>
    </div>
    </Link>
  )
}

VRBProductView.schema = {
  name: blockNames.VRBProductView,
  label: 'Product View Rb',
  category: 'vidya elements',
  hideFromAddMenu: true,
  getDefaultProps: () => ({
    label: 'One and only',
    title: 'Product View',
    subtitle: 'break your toes',
    image: ''
  }),
  sideEditProps: [
   {
      name: 'label',
      label: 'Label',
      type: types.SideEditPropType.Text,
   },
   {
      name: 'title',
      label: 'Title',
      type: types.SideEditPropType.Text,
   },
   {
      name: 'subtitle',
      label: 'Subtitle',
      type: types.SideEditPropType.Textarea,
   }
  ],
}

export default VRBProductView