import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'
import { DefaultColors } from '../Shared/colors';
import { DefaultLayoutProps, LayoutProp } from '../Shared/LayoutProps';
import Section, { SectionProps } from '../Layout/Section';
import { PageViewSize } from '@/components/atoms/PageViewSize';
import { GeneratingStakingInfo } from '@/components/organisms/GeneratorStakingInfo';
import VRBRichText from '../atoms/VRBRichText';

interface IGeneratorStakingUnitProps extends SectionProps {
  subtitle?: string
  disclaimer?: string
}

const GeneratorStakingInfoUnit: types.Brick<IGeneratorStakingUnitProps> = ({subtitle, disclaimer, ...sectionProps}) => {
  return (
    <Section {...sectionProps}>
      <PageViewSize enabled={!sectionProps.bgImage} className="flex justify-center items-center text-center gap-y-vxl">
        <VRBRichText isTitle={false} size='xl' textAlign='center' propName='subtitle' text={subtitle} className=" px-[180px] lg:px-[180px] tablet:px-[60px] md:px-[60px] sm:px-[25px] mobile:px-[25px]"> </VRBRichText>
        <GeneratingStakingInfo/>
        <VRBRichText isTitle={false} size='sm' textAlign='center' propName='disclaimer' text={disclaimer} className="px-[120px] lg:px-[120px] tablet:px-[40px] md:px-[40px] sm:px-[15px] mobile:px-[15px]"> </VRBRichText>
      </PageViewSize>
    </Section>
  )
}

GeneratorStakingInfoUnit.schema = {
  name: blockNames.GeneratingStakingInfoUnit,
  label: 'Generator Staking Info Unit',
  category: 'TeamOs-Molecules-Generator',

  getDefaultProps: () => ({
    ...DefaultLayoutProps,
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
    disclaimer: 'Maecenas venenatis id libero eget dapibus. Mauris ullamcorper maximus enim, et finibus tortor blandit quis. Sed est eros, dignissim et egestas id, convallis a mauris. Mauris in venenatis velit.'
  }),
  sideEditProps: [
    LayoutProp({ colors: DefaultColors }),
  ],
}

export default GeneratorStakingInfoUnit
