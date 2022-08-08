import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { blockNames } from '../../blockNames'
import { DefaultColors } from '../../Shared/colors';
import { DefaultLayoutProps, LayoutProp } from '../../Shared/LayoutProps';
import Section, { SectionProps } from '../../Layout/Section';
import { PageViewSize } from '@/components/atoms/PageViewSize';
import VRBImage from '../..//atoms/VRBImage';
import VRBText from '../../atoms/VRBText';

export interface IMultiImageAreaProps extends SectionProps {
  image?: string;
  maxWidth?: string;
  maxHeight?: string;
  description?: string;
}

const MultiImageArea: types.Brick<IMultiImageAreaProps> = ({maxHeight, maxWidth, ...sectionProps}) => {
  return (
    <Section {...sectionProps} className="prose px-vsm">
      <PageViewSize enabled={!sectionProps.bgImage} className="w-full !max-w-blog !h-auto justify-center items-center">
      <Repeater propName='images' renderWrapper={(items) => {
          return <div className="gap-vsm justify-center items-center flex flex-wrap">{items}</div>
        }
      }>
      </Repeater>
      <VRBText size='sm' textAlign='center' className='!opacity-80' propName='description'></VRBText>
      </PageViewSize>
    </Section>
  )
}

MultiImageArea.schema = {
  name: blockNames.MultiImageArea,
  label: 'Multi Image Area',
  category: 'TeamOs-Blog-elements',

  getDefaultProps: () => ({
    ...DefaultLayoutProps,
    maxWidth: '100%',
    maxHeight: '500px',
  }),
  repeaterItems: [
    {
      name: 'images',
      itemType: blockNames.SimpleImage,
      min: 1,
      max: 12,
    }
  ],
  sideEditProps: [
    LayoutProp({ colors: DefaultColors }),
  ],
}

export default MultiImageArea
