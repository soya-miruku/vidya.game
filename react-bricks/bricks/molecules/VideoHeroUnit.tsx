import React from 'react'
import { types, useAdminContext } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'
import { VideoFileViewer } from '../Shared/VideoFileViewer';
import { IVideoHeroProps, VideoHero } from '@/components/organisms/videoHero';

const VideoHeroUnit: types.Brick<IVideoHeroProps> = ({ videoDesc, videoUrl, videoTitle, centerTxt, showMouseIndicator, showGradientOverlay }) => {
  const {isAdmin, previewMode} = useAdminContext();
  return (
    <VideoHero videoDesc={videoDesc} videoUrl={videoUrl} videoTitle={videoTitle} canEdit={isAdmin && !previewMode} centerTxt={centerTxt} showMouseIndicator={showMouseIndicator} showGradientOverlay={showGradientOverlay}></VideoHero>  
  )
}

VideoHeroUnit.schema = {
  name: blockNames.VideoHero,
  label: 'Video Hero Unit',
  category: 'TeamOs-Molecules',

  getDefaultProps: () => ({
    videoId: 'dRKZJo5tmqs',
    videoTitle: 'Video Title',
    videoDesc: 'Video Description',
    centerTxt: false,
    showMouseIndicator: false,
    fetchTitleFromVideo: true,
    hideTitleWhenPlaying: true,
    showGradientOverlay: true,
  }),
  sideEditProps: [
    {
      name: 'videoUrl',
      label: 'Background Video',
      type: types.SideEditPropType.Custom,
      component: (props) => VideoFileViewer({ ...props}),
    },
  ],
}

export default VideoHeroUnit
