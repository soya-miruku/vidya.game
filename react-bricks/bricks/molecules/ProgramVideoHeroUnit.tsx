import React from 'react'
import { types, Repeater, useAdminContext } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'
import { DefaultColors } from '../Shared/colors';
import { DefaultLayoutProps, LayoutProp } from '../Shared/LayoutProps';
import Section, { SectionProps } from '../Layout/Section';
import { PageViewSize } from '@/components/atoms/PageViewSize';
import { IVideoHeroProps, VideoHero } from '@/components/organisms/videoHero';
import { VideoFileViewer } from '../Shared/VideoFileViewer';

interface IProgramVideoHeroUnitProps extends SectionProps, IVideoHeroProps {
}

const ProgramVideoHeroUnit: types.Brick<IProgramVideoHeroUnitProps> = ({videoUrl, videoDesc, videoTitle, centerTxt, showMouseIndicator, showGradientOverlay, ...sectionProps}) => {
  const {isAdmin, previewMode} = useAdminContext();
  return (
    <Section {...sectionProps} style={{
      height: sectionProps.height ? sectionProps.height : 'auto',
    }} className="h-full">
      <VideoHero videoDesc={videoDesc} videoUrl={videoUrl} videoTitle={videoTitle} canEdit={isAdmin && !previewMode} centerTxt={centerTxt} showMouseIndicator={showMouseIndicator} showGradientOverlay={showGradientOverlay}></VideoHero>  
    </Section>
  )
}

ProgramVideoHeroUnit.schema = {
  name: blockNames.ProgramVideoHeroUnit,
  label: 'Program Video Hero Unit',
  category: 'TeamOs-Molecules',

  getDefaultProps: () => ({
    ...DefaultLayoutProps,
    videoDesc: 'Video Description',
    videoTitle: 'Video Title',
    videoUrl: 'https://ipfs.infura.io/ipfs/QmQs11WHGqir3kD6gzYhh8FFJaYKc4achFj73N3RrU8tCa',
    centerTxt: true,
    showMouseIndicator: true,
    showGradientOverlay: true,
  }),
  sideEditProps: [
    LayoutProp({ colors: DefaultColors }),
    {
      name: 'videoUrl',
      label: 'Background Video',
      type: types.SideEditPropType.Custom,
      component: (props) => VideoFileViewer({ ...props}),
    },
  ],
}

export default ProgramVideoHeroUnit
