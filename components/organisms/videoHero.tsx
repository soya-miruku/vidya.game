import { classNames } from '@/common/helpers';
import React, { useState } from 'react';
import VRBText from '../../react-bricks/bricks/atoms/VRBText';
import VRBTitle from '../../react-bricks/bricks/atoms/VRBTitle';
import YouTube from "react-youtube";
import { VText } from '../atoms/VText';
import { VTitle } from '../atoms/VTitle';
import { useDetectDeviceSize } from 'hooks/useDetectIsMobileView';

export interface IVideoHeroProps {
  videoId?: string;
  videoTitle?: string;
  videoDesc?: string;
  canEdit?: boolean;
  fetchTitleFromVideo?: boolean;
  hideTitleWhenPlaying?: boolean;
}

export const VideoHero: React.FC<IVideoHeroProps> = ({ hideTitleWhenPlaying, fetchTitleFromVideo, videoId, videoTitle, videoDesc, canEdit}) => {
  const { isMobileView } = useDetectDeviceSize();
  const [title, setVideoTitle] = useState();
  const [hideTitle, setHideTitle] = useState(false);

  const videoConfig = {
    height: '100%',
    width: '100%',
    playerVars: {
      modestbranding: 1,
      autoplay: false,
      cc_load_policy: 0,
      enablejsapi:0,
      disablekb:1,
      controls: 0,
      rel: 0,
    }
  }

  return (
    <div className={classNames('sm:min-h-[800px] min-h-[700px] bg-black h-full flex justify-start items-end prose', canEdit ? 'w-[95%]' : 'w-screen')}>
      {hideTitle && hideTitleWhenPlaying ? <></> :  <div className='absolute w-[90%] sm:mb-[150px] mb-[50px] sm:px-14 px-2'>
        <div className='flex flex-col sm:space-y-4 space-y-0'>
          {(canEdit && !fetchTitleFromVideo) || typeof(videoTitle) !== 'string' ? <VRBTitle overrideTextColor={true} type='h3' propName='videoTitle' ></VRBTitle> : <VTitle overrideTextColor={true} type='h3'>{fetchTitleFromVideo ? title : videoTitle}</VTitle>}
          {(canEdit && !fetchTitleFromVideo) || typeof(videoDesc !== 'string') ? <VRBText overrideTextColor={true} size='lg' propName='videoDesc'></VRBText> :<VText overrideTextColor={true} size='lg'>{videoDesc}</VText>}
        </div>
      </div>}
      <YouTube className={classNames('w-full sm:h-[800px] h-[700px]')} loading="lazy" videoId={videoId} opts={videoConfig} 
        onPlay={(s) => setHideTitle(true)} 
        onPause={(s) => setHideTitle(false)} 
        onError={(s) => setHideTitle(false)} 
        onEnd={() => setHideTitle(false)} onReady={(e) => {
        setVideoTitle(e.target.getVideoData().title);
      }}/>
    </div>
  )
}