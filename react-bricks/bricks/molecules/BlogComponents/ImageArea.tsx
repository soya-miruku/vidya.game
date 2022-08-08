import React from 'react'
import { types, useAdminContext } from 'react-bricks/frontend';
import { blockNames } from '../../blockNames'
import { DefaultColors } from '../../Shared/colors';
import { DefaultLayoutProps, LayoutProp } from '../../Shared/LayoutProps';
import Section, { SectionProps } from '../../Layout/Section';
import { PageViewSize } from '@/components/atoms/PageViewSize';
import VRBImage from '../..//atoms/VRBImage';
import VRBText from '../../atoms/VRBText';
import { IsTextEmpty } from '../..//Shared/helper';

export interface IImageAreaProps extends SectionProps {
  image?: string;
  width?: string;
  height?: string;
  description?: string;
  objectFit?: 'contain' | 'cover' | 'fill';
}

const ImageArea: types.Brick<IImageAreaProps> = ({width, height, description, objectFit, ...sectionProps}) => {
  const { isAdmin } = useAdminContext();
  
  return (
    <Section {...sectionProps} className="prose px-vsm">
      <PageViewSize enabled={!sectionProps.bgImage} className="w-full !max-w-blog !h-auto justify-center items-center">
      <div  style={{
          width: width,
          height: height,
        }} className='relative p-[5px]'>
        <VRBImage propName='image' renderWrapper={({children}) => {
            return <div className="w-full h-full justify-center items-center flex">{children}</div>
          }} imageWidth={width} imageHeight={height}/>
      </div>
      {(isAdmin || (!isAdmin && !IsTextEmpty(description)))&&<VRBText size='sm' textAlign='center' className='!opacity-80' propName='description'></VRBText>}
      </PageViewSize>
    </Section>
  )
}

ImageArea.schema = {
  name: blockNames.ImageArea,
  label: 'Image Area',
  category: 'TeamOs-Blog-elements',

  getDefaultProps: () => ({
    ...DefaultLayoutProps,
    width: '100%',
    height: '500px',
    objectFit: 'contain',
  }),
  // repeaterItems: [
  //   {
  //     name: 'image',
  //     itemType: blockNames.SimpleImage,
  //     min: 1,
  //     max: 12,
  //   }
  // ],
  sideEditProps: [
    LayoutProp({ colors: DefaultColors }),
    {
      name: 'width',
      label: 'Width',
      type: types.SideEditPropType.Text
    },
    {
      name: 'height',
      label: 'Height',
      type: types.SideEditPropType.Text
    },
    {
      name: 'objectFit',
      label: 'Object Fit',
      type: types.SideEditPropType.Select,
      selectOptions: {
        display: types.OptionsDisplay.Select,
        options: [
          {
            label: 'Contain',
            value: 'contain'
          },
          {
            label: 'Cover',
            value: 'cover'
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

export default ImageArea
