import React, { useState } from 'react';
import YouTube from "react-youtube";

export interface IVideoHeroProps {
  videoId?: string;
  videoTitle?: string;
  videoDesc?: string;
}

export const VideoHero: React.FC<IVideoHeroProps> = ({ videoId, videoTitle, videoDesc}) => {
  const [title, setVideoTitle] = useState();
  const videoConfig = {
    height: '100%',
    width: '100%',
    playerVars: {
      modestbranding: 1,
      autoplay: false,
      cc_load_policy: 0,
      enablejsapo:0,
      disablekb:1,
      controls: 2,
      rel: 0,
    }
  }

  return (
    <div className='w-full min-h-[700px] bg-black h-full flex justify-center items-center'>
      <YouTube style={{width: '100%', height: '700px'}} loading="lazy" videoId={videoId} opts={videoConfig}  onReady={(e) => {
        setVideoTitle(e.target.getVideoData().title);
      }}/>
    </div>
  )
}