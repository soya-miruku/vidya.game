import { useEffect, useState } from "react";
import { isTablet } from "react-device-detect";
import { isMobileSmall } from "../common/helpers";

export const useDetectIsMobileView = (maxWidth:number=640) => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [isTabletView, setIsTabletView] = useState(false);

  useEffect(() => {
    if(innerWidth < maxWidth) {
      setIsMobileView(true);
    }

    const handleResize = () => {
      if(innerWidth < maxWidth || isMobileView) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [])

  useEffect(() => {
    if(isMobileSmall() !== isMobileView) {
      setIsMobileView(isMobileSmall());
    }
    if(isTablet) {
      setIsTabletView(true);
    }
  }, [isMobileSmall]);

  return {isMobileView, isTabletView};
}