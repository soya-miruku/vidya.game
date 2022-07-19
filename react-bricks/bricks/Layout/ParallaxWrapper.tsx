import { PropsWithChildren } from "react";
import { useAdminContext } from "react-bricks";
import { Parallax } from "react-scroll-parallax";
import { ParallaxProps } from "react-scroll-parallax/dist/components/Parallax/types";

export const ParallaxWrapper: React.FC<PropsWithChildren<ParallaxProps>> = ({children, ...props}) => {
  const { isAdmin } = useAdminContext();

  if(isAdmin) {
    return <>{children}</>;
  }

  return <Parallax {...props}>{children}</Parallax>;
}