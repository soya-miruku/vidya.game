import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { classNames } from '@/common/helpers'
import { blockNames } from '../blockNames'
import { IVideoHeroProps, VideoHero } from '@/components/organisms/videoHero';

const VideoHeroUnit: types.Brick<IVideoHeroProps> = ({ videoDesc, videoId, videoTitle }) => {
  console.log(new URLSearchParams(videoId))
  let id = videoId;
  try {
    const url = new URL(videoId)
    id = url.searchParams.get('v')
    console.log(id, url)
  }
  catch(err) {
    id = videoId;
  }

  return (
    <VideoHero videoId={id} videoTitle={videoTitle} videoDesc={videoDesc}/>
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
  }),
  sideEditProps: [
    {
      name: 'videoId',
      label: 'Video Src',
      type: types.SideEditPropType.Text

    }
  ],
}

export default VideoHeroUnit
