import { classNames } from '@/common/helpers';
import styled, { keyframes } from 'styled-components'

export type Padding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface IGradientBorderProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  bgColor?: string;
  padding?: Padding;
  borderRadius?: number;
  gradientColors?: string [];
}

const animateGradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const GradientDiv = styled.div`
  background-color: ${(props: IGradientBorderProps) => props.bgColor || 'transparent'};
  position: relative;
  border-radius: ${(props: IGradientBorderProps) => props.borderRadius || 0}rem;
  :after {
    content: '';
    position: absolute;
    top: ${(props: IGradientBorderProps) => `calc(-1 * ${props.borderRadius+1 || 3}px)`};
    left: ${(props: IGradientBorderProps) => `calc(-1 * ${props.borderRadius+1 || 3}px)`};
    height: ${(props: IGradientBorderProps) => `calc(100% + ${props.borderRadius + 1 || 3}px * 2)`};
    width: ${(props: IGradientBorderProps) => `calc(100% + ${props.borderRadius + 1 || 3}px * 2)`};
    border-radius: ${(props: IGradientBorderProps) => `calc(1 * ${props.borderRadius || 0}rem);`};
    z-index: -10;
    animation-name: ${animateGradient};
    background: linear-gradient(60deg, ${(props: IGradientBorderProps) => props.gradientColors?.join(', ') || 'transparent'});
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: alternate;
    background-size: 300% 300%;
  }
  `

export const GradientBorder = ({ className, style, bgColor='#000', padding='md', borderRadius=3, gradientColors=['#f79533', '#f37055', '#ef4e7b', '#a166ab', '#5073b8', '#1098ad', '#07b39b', '#6fba82'], children }: IGradientBorderProps) => {
  if(gradientColors.length < 2) {
    gradientColors.push(gradientColors[0])
  }

  return (
    <GradientDiv className={classNames('flex justify-center items-center w-full h-full', padding === 'sm' ? 'p-vsm' : padding === 'md' ? 'p-vmd' : padding === 'lg' ? 'p-vlg' : padding === 'xl' ? 'p-vxl' : '', className)}
    style={style} bgColor={bgColor} gradientColors={gradientColors} borderRadius={borderRadius}>
      {children}
    </GradientDiv>
  )
}