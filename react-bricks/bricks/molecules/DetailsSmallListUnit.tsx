import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'
import { bgColors, DefaultColors } from '../Shared/colors';
import { DefaultLayoutProps, LayoutProp } from '../Shared/LayoutProps';
import Section, { SectionProps } from '../Layout/Section';
import { Padding } from '../Shared/additional';
import VRBTitle from '../atoms/VRBTitle';

interface IFeaturesSmallListUnitProps extends SectionProps {
  title?: string;
  items?: any[];
}

const FeaturesSmallListUnit: types.Brick<IFeaturesSmallListUnitProps> = ({ ...sectionProps }) => {
  return (
    <Section {...sectionProps} className='px-4 sm:gap-y-8 gap-y-4 prose flex flex-col justify-start items-start mb-[60px]'>
      <VRBTitle className='ml-4' propName='title' type='h5'></VRBTitle>
      <Repeater propName='members' renderWrapper={(items) => {
        return (
          <div className="flex justify-center items-center gap-vxl flex-wrap">
            {items}
          </div>
        )
      }}></Repeater>
    </Section>
  )
}

FeaturesSmallListUnit.schema = {
  name: blockNames.FeaturesSmallUnit,
  label: 'Features Small List Unit',
  category: 'TeamOs-Molecules',

  getDefaultProps: () => ({
    ...DefaultLayoutProps,
    title: 'Core Team',
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
    LayoutProp({ colors: DefaultColors }),
  ],
}

export default FeaturesSmallListUnit
