import React from 'react'
import { types, Repeater, useVisualEdit } from 'react-bricks/frontend';
import { classNames } from '@/common/helpers'
import { blockNames } from '../blockNames'
import { IVideoHeroProps, VideoHero } from '@/components/organisms/videoHero';
import { useAdminContext } from 'react-bricks/frontend';

const VideoHeroUnit: types.Brick<IVideoHeroProps> = ({ hideTitleWhenPlaying, fetchTitleFromVideo, videoDesc, videoId, videoTitle }) => {
  const { isAdmin, previewMode } = useAdminContext();

  let id = videoId;
  try {
    const url = new URL(videoId)
    id = url.searchParams.get('v')
  }
  catch(err) {
    id = videoId;
  }

  return (
    <div className='bg-zinc-800 w-full h-full prose'>
      <VideoHero hideTitleWhenPlaying={hideTitleWhenPlaying} fetchTitleFromVideo={fetchTitleFromVideo} videoId={id} videoTitle={videoTitle} videoDesc={videoDesc} canEdit={isAdmin}/>
    </div>
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
    fetchTitleFromVideo: true,
    hideTitleWhenPlaying: true
  }),
  sideEditProps: [
    {
      name: 'videoId',
      label: 'Video Src',
      type: types.SideEditPropType.Text
    },
    {
      name: 'fetchTitleFromVideo',
      label: 'Fetch Title From Video',
      type: types.SideEditPropType.Boolean
    },
    {
      name: 'hideTitleWhenPlaying',
      label: 'Hide Title When Playing',
      type: types.SideEditPropType.Boolean
    }
  ],
}

export default VideoHeroUnit
