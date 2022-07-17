import { useEffect, useState } from "react";
import { isTablet } from "react-device-detect";
import { isMobileSmall } from "@/common/helpers";
import {TABLET_WIDTH, MOBILE_WIDTH, DESKTOP_WIDTH} from '@/common/constants';

export const useDetectDeviceSize = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [isTabletView, setIsTabletView] = useState(false);
  const [isWideTabletView, setIsWideTabletView] = useState(false);

  useEffect(() => {
    const handleResise = () => {
      if((innerWidth <= TABLET_WIDTH) || isTablet) {
        setIsTabletView(true);
      }
      else {
        setIsTabletView(false);
      }

      if((innerWidth <= MOBILE_WIDTH) || isMobileSmall()) {
        setIsMobileView(true);
      }
      else {
        setIsMobileView(false);
      }

      if(innerWidth <= DESKTOP_WIDTH && innerWidth > TABLET_WIDTH) {
        setIsWideTabletView(true);
      }
      else {
        setIsWideTabletView(false);
      }
      
    }

    handleResise();

    window.addEventListener('resize', handleResise);

    return () => {
      window.removeEventListener('resize', handleResise);
    }

  }, [])


  return {isMobileView, isTabletView, isWideTabletView}
}

export const useDetectIsMobileView = (maxWidth:number=640) => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [isTabletView, setIsTabletView] = useState(false);

  useEffect(() => {
    if(innerWidth < maxWidth) {
      setIsMobileView(true);
    }

    const handleResize = () => {
      if(innerWidth <= maxWidth || isMobileView) {
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

  // useEffect(() => {
  //   if(isMobileSmall() !== isMobileView) {
  //     setIsMobileView(isMobileSmall());
  //   }
  //   if(isTablet) {
  //     setIsTabletView(true);
  //   }
  // }, [isMobileView]);

  return {isMobileView, isTabletView: isTablet};
}