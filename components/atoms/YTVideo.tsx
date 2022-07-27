import YouTube, { YouTubeProps } from "react-youtube";

export const YTVideo = ({videoId, className, ...rest}: YouTubeProps) => {
  const videoConfig = {
    height: '100%',
    width: '100%',
    playerVars: {
      // modestbranding: 0,
      autoplay: false,
      cc_load_policy: 0,
      enablejsapi:0,
      disablekb:1,
      // controls: 0,
      rel: 0,
    }
  }
  return (<YouTube className={className} loading="lazy" videoId={videoId} opts={videoConfig} {...rest}/>)
}