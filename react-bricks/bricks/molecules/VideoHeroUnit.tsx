import React from 'react'
import { types, useAdminContext } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'
import { FpsFileUploader } from '../Shared/FpsFileUploader';
import { IVideoHeroProps, VideoHero } from '@/components/organisms/videoHero';
import Section, { SectionProps } from '../Layout/Section';
import { DefaultLayoutProps, LayoutProp } from '../Shared/LayoutProps';
import { DefaultColors } from '../Shared/colors';

export interface IVideoHeroUnitProps extends SectionProps, IVideoHeroProps {
}


const VideoHeroUnit: types.Brick<IVideoHeroUnitProps> = ({ videoDesc, videoUrl, label, videoTitle, centerTxt, showMouseIndicator, showGradientOverlay, placeholderImage, ...sectionProps }) => {
  const {isAdmin, previewMode} = useAdminContext();
  return (
    <Section {...sectionProps} style={{
      height: sectionProps.height ? sectionProps.height : 'auto',
    }} className="h-full">
      <VideoHero label={label} autoplay={!isAdmin} placeholderImage={placeholderImage} videoDesc={videoDesc} videoUrl={videoUrl} videoTitle={videoTitle} canEdit={isAdmin && !previewMode} centerTxt={centerTxt} showMouseIndicator={showMouseIndicator} showGradientOverlay={showGradientOverlay}></VideoHero>  
    </Section>
  )
}

VideoHeroUnit.schema = {
  name: blockNames.VideoHero,
  label: 'Video Hero Unit',
  category: 'TeamOs-Molecules',

  getDefaultProps: () => ({
    ...DefaultLayoutProps,
    videoId: 'dRKZJo5tmqs',
    videoTitle: 'Video Title',
    videoDesc: 'Video Description',
    label: 'PROGRAM',
    centerTxt: false,
    showMouseIndicator: false,
    fetchTitleFromVideo: true,
    hideTitleWhenPlaying: true,
    showGradientOverlay: true,
  }),
  sideEditProps: [
    LayoutProp({ colors: DefaultColors }),
    {
      name: 'videoUrl',
      label: 'Background Video',
      type: types.SideEditPropType.Custom,
      component: (props) => FpsFileUploader({ ...props}),
    },
    {
      name: 'videoUrl',
      label: 'Background Video',
      type: types.SideEditPropType.Custom,
      component: (props) => FpsFileUploader({ ...props}),
    },
    {
      name: 'label',
      label: 'Label',
      type: types.SideEditPropType.Text,
    },
    {
      name: 'centerTxt',
      label: 'Center Text',
      type: types.SideEditPropType.Boolean,
    },
    {
      name: 'showMouseIndicator',
      label: 'Show Mouse Indicator',
      type: types.SideEditPropType.Boolean,
    },
    {
      name: 'showGradientOverlay',
      label: 'Show Gradient Overlay',
      type: types.SideEditPropType.Boolean,
    },
    {
      name: 'placeholderImage',
      label: 'Placeholder Image',
      type: types.SideEditPropType.Image
    }
  ],
}

export default VideoHeroUnit
