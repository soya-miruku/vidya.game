import { useState, createContext } from "react"

export interface IVideoContext {
  shouldPause: boolean;
  setShouldPause: (shouldPause: boolean) => void;
}

export const VideoContext = createContext<IVideoContext>(null);

export const VideoProvider = ({ children }) => {
  const [shouldPause, setShouldPause] = useState(false);
  return (
    <VideoContext.Provider value={{ shouldPause, setShouldPause }}>
      {children}
    </VideoContext.Provider>
  )
}