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
import { useFetchTemplates, useGetAllTemplateIds } from '@/hooks/dapps/inventory/useGetAllTemplates';

interface IInventoryListUnitProps extends SectionProps {
  label?: string;
  title?: string;
  description?: string;
  items?: any[];
}

const InventoryListUnit: types.Brick<IInventoryListUnitProps> = ({label, title, description, items, ...sectionProps}) => {
  // const { tokenIds } = useGetAllTemplateIds({limit: 12, startFrom: 1});
  const { templates } = useFetchTemplates([1, 3, 7, 9,11,12,13,23,30,31]);
  return (
    <Section {...sectionProps} className='prose'>
      <PageViewSize enabled={!sectionProps.bgImage}>
        <div className='flex flex-col w-full justify-center items-center gap-vxl px-vmd'>
          <div className='flex sm:w-1/2 w-full justify-center items-start flex-col gap-vmd'>
            <VRBLabel propName='label' text={label} secondary={false}></VRBLabel>
            <VRBTitle propName='title' type='h2'></VRBTitle>
            <VRBText propName='description' size='lg'></VRBText>
          </div>
          <div className='w-full justify-center items-center p-vsm flex flex-col h-[500px] rounded-xl relative border-[1px] dark:border-light-300/40 border-dark-200/20'>
            <DeckBase className='!w-52 !h-96' itemClassName='!bg-light-100 !border-accent-dark-200/70 !max-h-96 shadow-[0_25px_20px_-15px_rgba(0,0,0,0.13)]' itemRender={(item) => {
              return (
                <div className='p-vmd flex flex-col gap-vsm relative !font-bold'>
                  <div className='absolute w-full h-full z-[100]'></div>
                  <VLabel className="!text-dark-100 uppercase">{item.label}</VLabel>
                  <VImage objectFit='contain' src={item.image} width={100} height={150}></VImage>
                  <VTitle className='!text-dark-100 ' type='h5'>{item.title}</VTitle>
                  <VText size='md' className="!text-dark-100 ">{item.description}</VText>
                </div>
              )
            }} items={(templates||[]).map((template) => {
              return {
                label: 'Inventory V2',
                image: template.image,
                title: template.name,
                description: template.description
              }
            })}></DeckBase>
            <VText className='opacity-70' size='sm'>Flick to the left or right to navigate</VText>
          </div>
        </div>
      </PageViewSize>
    </Section>
  )
}

InventoryListUnit.schema = {
  name: blockNames.InventoryListUnit,
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
