import React from 'react'
import { types } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'
import { bgColors } from '../Shared/colors';
import { DefaultLayoutProps, LayoutProp } from '../Shared/LayoutProps';
import Section, { SectionProps } from '../Layout/Section';
import { ISwapSectionProps, SwapSection } from '@/components/molecules/SwapSection';
import VRBTitle from '../atoms/VRBTitle';
import { useDetectIsMobileView } from '@/hooks/useDetectIsMobileView';

interface ISwapUnit extends SectionProps, ISwapSectionProps {
  height?: string
  pageTitle?: string
  pageSubtitle?: string
}

const SwapUnit: types.Brick<ISwapUnit> = ({ enableParallax, parallaxSpeed, blur, rounded, bg, bgImage, height, paddingX, paddingY, defaultToken0, defaultToken1 }) => {
  const { isMobileView } = useDetectIsMobileView();
  return (
    <Section parallaxSpeed={parallaxSpeed} enableParallax={enableParallax} blur={blur} rounded={rounded} bg={bg} bgImage={bgImage} height={height} paddingX={paddingX} paddingY={paddingY} className='prose'>
        <div className='flex max-w-page w-full justify-start items-center mb-8 mt-[100px]'>
          <div className='max-w-[500px] flex flex-col justify-start items-center gap-y-2'>
            <VRBTitle overrideTextColor type={isMobileView ? 'h2' : 'h1'} className='mr-4' propName='pageTitle'></VRBTitle>
            <VRBTitle overrideTextColor type='h5' className='font-roboto font-normal tracking-normal leading-tight normal-case' propName='pageSubtitle'></VRBTitle>
          </div>
        </div>
      <SwapSection defaultToken0={defaultToken0?.toLocaleUpperCase()} defaultToken1={defaultToken1?.toLocaleUpperCase()}></SwapSection>
    </Section>
  )
}

SwapUnit.schema = {
  name: blockNames.SwapUnit,
  label: 'SwapUnit Unit',
  category: 'TeamOs-Molecules',

  getDefaultProps: () => ({
    ...DefaultLayoutProps,
    defaultToken0: 'ETH',
    defaultToken1: 'VIDYA',
    pageTitle: 'A REAL GAME',
    pageSubtitle: 'Tired of the same game? Swap it out for a new one! try it now!',
  }),
  sideEditProps: [
    LayoutProp({ colors: [bgColors.none, bgColors.dark, bgColors.light, bgColors.gray] }),
    {
      name: 'defaultToken0',
      label: 'Default Token 0',
      type: types.SideEditPropType.Text,
    },
    {
      name: 'defaultToken1',
      label: 'Default Token 1',
      type: types.SideEditPropType.Text,
    }
  ],
}

export default SwapUnit
