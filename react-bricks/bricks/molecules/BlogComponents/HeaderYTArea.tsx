import React from 'react'
import { types, Repeater, useAdminContext } from 'react-bricks/frontend';
import { blockNames } from '../../blockNames'
import { DefaultColors } from '../../Shared/colors';
import { DefaultLayoutProps, LayoutProp } from '../../Shared/LayoutProps';
import Section, { SectionProps } from '../../Layout/Section';
import { PageViewSize } from '@/components/atoms/PageViewSize';
import VRBTitle from '../../atoms/VRBTitle';
import VRBText from '../../atoms/VRBText';
import VRBImage from '../../atoms/VRBImage';
import { YTVideo } from '@/components/atoms/YTVideo';

interface IHeaderYTAreaProps extends SectionProps {
  title?: string
  paragraph?: string
  width?: string
  height?: string
  videoId?: string
}

const HeaderYTArea: types.Brick<IHeaderYTAreaProps> = ({title, paragraph, videoId, width, height, ...sectionProps}) => {
  const { isAdmin } = useAdminContext();
  return (
    <Section {...sectionProps} className="prose">
      <PageViewSize enabled={!sectionProps.bgImage} className='w-full !max-w-blog justify-center items-center !gap-vmd'>
        {(isAdmin || (!isAdmin && title)) && <VRBTitle type='h3' propName='title'></VRBTitle>}
        {(isAdmin || (!isAdmin && paragraph))&& <VRBText size='lg' propName='paragraph'></VRBText>}
        <div  style={{
          width: width,
          height: height,
          // maxWidth: maxWidth,
          // maxHeight: maxHeight,
        }} className='relative p-[5px]'>
        <YTVideo className='h-full' videoId={videoId}></YTVideo>
        <VRBText size='sm' textAlign='center' className='!opacity-80' propName='description'></VRBText>
      </div>
      </PageViewSize>
    </Section>
  )
}

HeaderYTArea.schema = {
  name: blockNames.HeaderYTArea,
  label: 'YT Video with Rich Text',
  category: 'TeamOs-Blog-elements',

  getDefaultProps: () => ({
    ...DefaultLayoutProps,
    height: '500px',
    width: '100%',
    videoId: 'd8fgnPOihUQ',
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
    },
    {
      name: 'videoId',
      label: 'Video Id',
      type: types.SideEditPropType.Text
    }
  ],
}

export default HeaderYTArea
