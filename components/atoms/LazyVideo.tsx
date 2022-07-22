import { DetailedHTMLProps, useEffect, useRef, VideoHTMLAttributes } from "react"
import { useInView } from "react-intersection-observer"

export interface ILazyVideoProps extends DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement> {
  placeholderImage?: string
}

export const LazyVideo = ({ placeholderImage, muted, autoPlay, loop, className, src, ...rest }: ILazyVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const {ref, inView, entry} = useInView({
    triggerOnce: false,
    rootMargin: '0px 0px',
    threshold: 0
  });

  useEffect(() => {
    if(!videoRef.current) return;
    if(inView) {
      videoRef.current.play();
    }
    else {
      videoRef.current.pause();
    }
  }
  , [inView]);

  return (
  <div ref={ref} className="w-full h-full relative">
    {!inView && <div className="absolute w-full h-full bg-center bg-cover" style={{backgroundImage: `url(${placeholderImage})`}}/>}
    <video poster={placeholderImage} preload="none" ref={videoRef} muted={muted} autoPlay={autoPlay} loop={loop} className={className} src={src} playsInline {...rest} />
  </div>)
}