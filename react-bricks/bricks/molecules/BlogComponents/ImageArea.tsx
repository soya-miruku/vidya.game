import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { blockNames } from '../../blockNames'
import { DefaultColors } from '../../Shared/colors';
import { DefaultLayoutProps, LayoutProp } from '../../Shared/LayoutProps';
import Section, { SectionProps } from '../../Layout/Section';
import { PageViewSize } from '@/components/atoms/PageViewSize';
import VRBImage from '../..//atoms/VRBImage';
import VRBText from '../../atoms/VRBText';
import { classNames } from '@/common/helpers';

export interface IImageAreaProps extends SectionProps {
  image?: string;
  maxWidth?: string;
  maxHeight?: string;
  description?: string;
  objectFit?: 'contain' | 'cover' | 'fill';
}

const ImageArea: types.Brick<IImageAreaProps> = ({maxHeight, objectFit, maxWidth, ...sectionProps}) => {
  return (
    <Section {...sectionProps} className="prose">
      <PageViewSize enabled={!sectionProps.bgImage} className="w-full !max-w-blog !h-auto justify-center items-center">
      <div  style={{
          width: '63vw',
          height: '80vw',
          maxWidth: maxWidth,
          maxHeight: maxHeight,
        }} className='relative'>
      <VRBImage propName='image' imageClassName={classNames('h-full mb-5 ml-2', objectFit === 'contain' ? 'object-contain': objectFit === 'fill' ? 'object-fill' : 'object-cover' )} renderWrapper={({children}) => {
            return <div className="w-full h-full justify-center items-center flex">{children}</div>
          }} imageWidth="100%" imageHeight="100%"/>
      </div>
      <VRBText size='sm' textAlign='center' className='!opacity-80' propName='description'></VRBText>
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
    maxWidth: '100%',
    maxHeight: '500px',
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
      name: 'maxWidth',
      label: 'Max Width',
      type: types.SideEditPropType.Text
    },
    {
      name: 'maxHeight',
      label: 'Max Height',
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
