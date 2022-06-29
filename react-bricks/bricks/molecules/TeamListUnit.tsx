import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'
import { bgColors } from '../Shared/colors';
import { LayoutProp } from '../Shared/LayoutProps';
import Section, { SectionProps } from '../Layout/Section';
import VRBTitle from '../atoms/VRBTitle';

interface ITeamListUnitProps extends SectionProps {
  title?: string;
  items?: any[];
}

const TeamListUnit: types.Brick<ITeamListUnitProps> = ({ bg, bgImage, parallaxSpeed, enableParallax, blur, rounded, paddingX, paddingY}) => {
  return (
    <Section bg={bg} bgImage={bgImage} parallaxSpeed={parallaxSpeed} enableParallax={enableParallax} blur={blur} rounded={rounded} paddingX={paddingX} paddingY={paddingY} className='px-4 sm:gap-y-8 gap-y-4 prose flex flex-col justify-start items-start mb-[60px]'>
      <VRBTitle className='ml-4' propName='title' type='h5'></VRBTitle>
      <Repeater propName='members' renderWrapper={(items) => {
        return (
          <div className="flex justify-center items-center gap-4 flex-wrap">
            {items}
          </div>
        )
      }}></Repeater>
    </Section>
  )
}

TeamListUnit.schema = {
  name: blockNames.TeamListUnit,
  label: 'Team List Unit',
  category: 'TeamOs-Molecules',

  getDefaultProps: () => ({
    title: 'Core Team',
    bg: bgColors.none,
    members: [
      {

      }
    ]
  }),
  repeaterItems: [
    {
      name: 'members',
      itemType: blockNames.TeamCard,
      itemLabel: 'Team',
      min: 1,
      max: 20
    },
  ],
  sideEditProps: [
    LayoutProp({ colors: [bgColors.none, bgColors.dark, bgColors.light, bgColors.gray] }),
  ],
}

export default TeamListUnit
