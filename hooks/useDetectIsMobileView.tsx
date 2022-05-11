import { useEffect, useState } from "react";
import { isMobileSmall } from "../common/helpers";

export const useDetectIsMobileView = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const MIN_WIDTH = 900;

  useEffect(() => {
    if(innerWidth < MIN_WIDTH) {
      setIsMobileView(true);
    }

    const handleResize = () => {
      if(innerWidth < MIN_WIDTH || isMobileView) {
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
  }, [isMobileSmall]);

  return {isMobileView};
}