import React from 'react'
import { Text, RichText, Image, types, Repeater } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'
import { DefaultColors } from '../Shared/colors';
import { DefaultLayoutProps, LayoutProp } from '../Shared/LayoutProps';
import Section, { SectionProps } from '../Layout/Section';
import { PageViewSize } from '@/components/atoms/PageViewSize';
import { VTab, VTabs } from '@/components/atoms/VTabs';
import { VText } from '@/components/atoms/VText';
import { VTitle } from '@/components/atoms/VTitle';
import VRBTitle from '../atoms/VRBTitle';

interface IHeroWithTabsUnitProps extends SectionProps {
  heroTitle: string;
}

const HeroWithTabsUnit: types.Brick<IHeroWithTabsUnitProps> = ({heroTitle, ...sectionProps}) => {
  return (
    <Section {...sectionProps} className="prose relative">
      <PageViewSize enabled={!sectionProps.bgImage} className="">
        <div className='flex justify-center w-full items-center text-center px-vsm'>
          <div>
            <VRBTitle type='h3' propName="heroTitle"></VRBTitle>
          </div>
        </div>
        <Repeater propName="weapons" renderWrapper={(items) => {
          return (
            <div className='w-full justify-start flex overflow-x-auto sm:px-0 px-[5px]'>
            <VTabs rounded={true} defaultActiveIndex={0}>
              {items.props.children.map((item, index) => {
                const title = item?.props?.value?.values?.title || 'product'
                return (
                  <VTab title={title} key={index} icon=''>
                    {item}
                  </VTab>
                )
              }
              )}
            </VTabs>
            </div>
          )
        }}></Repeater>
      </PageViewSize>
    </Section>
  )
}

HeroWithTabsUnit.schema = {
  name: blockNames.HeroWithTabsUnit,
  label: 'Hero With Tabs Unit',
  category: 'TeamOs-Molecules',

  getDefaultProps: () => ({
    ...DefaultLayoutProps,
  }),
  repeaterItems: [
    {
      name: 'weapons',
      itemType: blockNames.VRBProductView,
      itemLabel: 'Weapons',
      min: 0,
      max: 12,
    },
  ],
  sideEditProps: [
    LayoutProp({ colors: DefaultColors }),
  ],
}

export default HeroWithTabsUnit
