import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { classNames } from '@/common/helpers'
import { blockNames } from '../blockNames'
import { bgColors } from '../Shared/colors';
import { LayoutProp } from '../Shared/LayoutProps';
import Section, { Border } from '../Layout/Section';
import { Padding } from '../Shared/additional';
import { VTitle } from '@/components/atoms/VTitle';
import VRBTitle from '../atoms/VRBTitle';

interface ITeamListUnitProps {
  title?: string;
  items?: any[];
  bg?: { color: string; className: string };
  borderTop?: Border;
  borderBottom?: Border;
  paddingX?: Padding
  paddingY?: Padding
}

const TeamListUnit: types.Brick<ITeamListUnitProps> = ({ bg, borderTop, borderBottom, paddingX, paddingY}) => {
  return (
    <Section bg={bg} borderTop={borderTop} borderBottom={borderBottom} paddingX={paddingX} paddingY={paddingY} className='px-4 sm:gap-y-8 gap-y-4 prose flex flex-col justify-start items-start'>
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
