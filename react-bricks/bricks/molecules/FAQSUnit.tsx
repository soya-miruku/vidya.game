import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'
import { DefaultColors } from '../Shared/colors';
import { DefaultLayoutProps, LayoutProp } from '../Shared/LayoutProps';
import Section, { SectionProps } from '../Layout/Section';
import { PageViewSize } from '@/components/atoms/PageViewSize';

interface IFAQSUnitProps extends SectionProps {
}

const FAQSUnit: types.Brick<IFAQSUnitProps> = ({...sectionProps}) => {
  return (
    <Section {...sectionProps} className="prose">
      <PageViewSize enabled={true}>
        <Repeater propName="faqs" renderWrapper={(items) => {
            return (
              <div className='flex flex-col w-full h-auto justify-center p-vmd gap-vmd'>{items}</div>
            )
          }}></Repeater>
      </PageViewSize>
    </Section>
  )
}

FAQSUnit.schema = {
  name: blockNames.FAQSUnit,
  label: 'FAQS Unit',
  category: 'TeamOs-Molecules',

  getDefaultProps: () => ({
    ...DefaultLayoutProps,
  }),

  repeaterItems: [
    {
      name: 'faqs',
      itemType: blockNames.Accordion,
      itemLabel: 'FAQ Item',
      min: 1,
      max: 100,
    },
  ],

  sideEditProps: [
    LayoutProp({ colors: DefaultColors }),
  ],
}

export default FAQSUnit
