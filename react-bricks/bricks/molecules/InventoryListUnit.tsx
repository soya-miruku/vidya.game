import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'
import { DefaultColors } from '../Shared/colors';
import { DefaultLayoutProps, LayoutProp } from '../Shared/LayoutProps';
import Section, { SectionProps } from '../Layout/Section';
import { PageViewSize } from '@/components/atoms/PageViewSize';
import VRBLabel from '../atoms/VRBLabel';
import VRBTitle from '../atoms/VRBTitle';
import VRBText from '../atoms/VRBText';
import { DeckBase } from '@/components/atoms/DeckBase';
import { VText } from '@/components/atoms/VText';
import { VLabel } from '@/components/atoms/VLabel';
import { VTitle } from '@/components/atoms/VTitle';
import { VImage } from '@/components/atoms/VImage';

interface IInventoryListUnitProps extends SectionProps {
  label?: string;
  title?: string;
  description?: string;
  items?: any[];
}

const InventoryListUnit: types.Brick<IInventoryListUnitProps> = ({label, title, description, items, ...sectionProps}) => {
  return (
    <Section {...sectionProps} className='prose'>
      <PageViewSize enabled={!sectionProps.bgImage}>
        <div className='flex flex-col w-full justify-center items-center gap-vxl px-vmd'>
          <div className='flex sm:w-1/2 w-full justify-center items-start flex-col gap-vmd'>
            <VRBLabel propName='label' text={label} secondary={false}></VRBLabel>
            <VRBTitle propName='title' type='h2'></VRBTitle>
            <VRBText propName='description' size='lg'></VRBText>
          </div>
          <div className='w-full flex h-[500px] rounded-xl relative border-[1px]'>
            <DeckBase className='!w-52 !h-96' itemClassName='!bg-light-100 !border-none !max-h-96 shadow-btn-dark' itemRender={(item) => {
              return (
                <div className='p-vmd flex flex-col gap-vsm relative !font-bold'>
                  <div className='absolute w-full h-full z-[100]'></div>
                  <VLabel className="!text-dark-100 uppercase">{item.label}</VLabel>
                  <VImage objectFit='contain' src={item.image} width={100} height={150}></VImage>
                  <VTitle className='!text-dark-100' type='h5'>{item.title}</VTitle>
                  <VText size='md' className="!text-dark-100">{item.description}</VText>
                </div>
              )
            }} items={[
              {
                label: 'inventory v2',
                title: 'Santa Hat',
                image: 'https://lh3.googleusercontent.com/7udMBUMxXyPoo4j18PkF7bd9ngxYralPMOzs8C8zAZDOGDnEmS9IRhQlaFkaQMxRSuWkv5ZNki3y6p8nnc89bLogKKT5nct0dPA9',
                description: 'it&apos;s a santa hat',
              },
              {
                label: 'inventory v2',
                title: 'Hardware wallet',
                image: 'https://lh3.googleusercontent.com/C_AXP0yc4v_5pdEabZwrh-TJ5FK_bfT9tNO_-lxLGldiTrOQ8_RWxD8K-aGzMazH6YQ2I_IsYHGEWT-6hrlIBNhL',
                description: 'They&apos;re gonna have to torture me for this one',
              },
              {
                label: 'inventory v2',
                title: 'Skull of the elder',
                image: 'https://lh3.googleusercontent.com/w-lPm4lJXJF5vBAonI6HtsXnYdFYlK9R3cN9TTpgYxjBY8UHLvPcjq06CaK9s_nu3ldX-Nxoi73zqQLBdTbiNNQ',
                description: 'Somehow this feels oddly familiar...',
              },
              {
                label: 'inventory v2',
                title: 'Sword of Damocles',
                image: 'https://lh3.googleusercontent.com/w0mWCjw5rXctp6QqUQmQkdCD-iO-ZtWDMu_4MlLp2K7LJAv65w_uvEg1jJ91yHNrsJvLSX07wghEEsheuNfblW2Z',
                description: 'Literally hanging by a thread',
              },
              {
                label: 'inventory v2',
                title: 'Unicorn&apos;s head',
                image: 'https://lh3.googleusercontent.com/TRunk47cN-U4SU5xeG-C1_FuNLBBOXSCkUUUZo_aKPF1rHYcyFUhpCYikO1zoWnUkZn24ezDdmurpcgFA550bYfb',
                description: 'Why take the horn when you can have the whole head?',
              }
            ]}></DeckBase>
          </div>
        </div>
      </PageViewSize>
    </Section>
  )
}

InventoryListUnit.schema = {
  name: blockNames.EmptySection,
  label: 'Inventory List Unit',
  category: 'TeamOs-Aimbots',

  getDefaultProps: () => ({
    ...DefaultLayoutProps,
    label: 'Inventory List',
  }),
  sideEditProps: [
    LayoutProp({ colors: DefaultColors }),
    {
      label: 'Label',
      name: 'label',
      type: types.SideEditPropType.Text,
    }
  ],
}

export default InventoryListUnit
