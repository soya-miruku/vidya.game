import { useContext, useEffect, useRef, useState } from "react";
import VRBTitle from '../../react-bricks/bricks/atoms/VRBTitle';
import VRBText from '../../react-bricks/bricks/atoms/VRBText';
import { VText } from "../atoms/VText";
import { VTitle } from "../atoms/VTitle";
import { VMouseIcon } from "../atoms/VMouseIcon";
import { useDarkMode } from "@/hooks/useDarkMode";
import { classNames } from "@/common/helpers";
import { LazyVideo } from "../atoms/LazyVideo";

export interface IVideoHeroProps {
  videoUrl: string;
  videoTitle: string;
  videoDesc: string;
  canEdit?: boolean;
  centerTxt?: boolean;
  showMouseIndicator?: boolean;
  showGradientOverlay?: boolean;
  autoplay?: boolean;
  placeholderImage?: any;
}

export const VideoHero = ({videoDesc, videoTitle, videoUrl, canEdit, centerTxt, showMouseIndicator, showGradientOverlay, autoplay=true, placeholderImage}: IVideoHeroProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const { isDarkMode } = useDarkMode();

  return (
    <div className="w-full h-full prose relative hover:cursor-pointer" onClick={() => !canEdit && setIsMuted(!isMuted)}>
      {showGradientOverlay && <div className="absolute w-full h-full bg-gradient-to-t dark:from-dark-200 from-light-200 to-[rgba(40,40,40,0)] z-[1]"/>}
      <div className={classNames('absolute w-full h-[90%] flex justify-end px-vmd flex-col z-[1]', centerTxt ? 'items-center': 'items-start')}>
        {canEdit || typeof(videoTitle) !== 'string' ? <VRBTitle overrideTextColor={isDarkMode ? true: false} type='h1' className="tracking-cta opacity-40" propName='videoTitle' ></VRBTitle> : <VTitle className="tracking-cta" overrideTextColor={isDarkMode ? true: false} type='title'>{videoTitle}</VTitle>}
        {canEdit || typeof(videoDesc !== 'string') ? <VRBText overrideTextColor={isDarkMode ? true: false} size='lg' propName='videoDesc'></VRBText> :<VText className="w-full" overrideTextColor={isDarkMode ? true: false} size='lg'>{videoDesc}</VText>}
        {showMouseIndicator && <VMouseIcon className='py-2 !h-auto' overrideColor={isDarkMode ? true: false}/>}
      </div>
      <LazyVideo autoPlay={autoplay} placeholderImage={placeholderImage?.src} muted={isMuted} loop className='h-full w-full object-cover' src={videoUrl}/>
    </div>
  )
}