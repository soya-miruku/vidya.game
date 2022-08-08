import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { blockNames } from '../../blockNames'
import { DefaultColors } from '../../Shared/colors';
import { DefaultLayoutProps, LayoutProp } from '../../Shared/LayoutProps';
import Section, { SectionProps } from '../../Layout/Section';
import { PageViewSize } from '@/components/atoms/PageViewSize';
import VRBTitle from '../../atoms/VRBTitle';
import VRBText from '../../atoms/VRBText';
import VRBImage from '../../atoms/VRBImage';
import { useDetectIsMobileView } from '@/hooks/useDetectIsMobileView';

interface IHeaderImageAreaProps extends SectionProps {
  title?: string
  paragraph?: string
  width?: string
  height?: string
}

const HeaderImageArea: types.Brick<IHeaderImageAreaProps> = ({width, height, ...sectionProps}) => {
  const { isMobileView } = useDetectIsMobileView();
  width = isMobileView ? '100%' : width;
  height = isMobileView ? '100%' : height;
  return (
    <Section {...sectionProps} className="prose px-vsm">
      <PageViewSize enabled={!sectionProps.bgImage} className='w-full !max-w-blog justify-center items-center !gap-vmd'>
        <VRBTitle type='h3' propName='title'></VRBTitle>
        <VRBText size='lg' propName='paragraph'></VRBText>
        <div  style={{
          width: width,
          height: height,
        }} className='relative p-[5px]'>
        <VRBImage propName='image' renderWrapper={({children}) => {
            return <div className="w-full h-full justify-center items-center flex">{children}</div>
          }} imageWidth={width} imageHeight={height}/>
      </div>
      <VRBText size='sm' textAlign='center' className='!opacity-80' propName='description'></VRBText>
      </PageViewSize>
    </Section>
  )
}

HeaderImageArea.schema = {
  name: blockNames.HeaderImageArea,
  label: 'Image with Rich Text',
  category: 'TeamOs-Blog-elements',

  getDefaultProps: () => ({
    ...DefaultLayoutProps,
    height: '100%',
    width: '100%',
  }),
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
    }
  ],
}

export default HeaderImageArea
