import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'
import { DefaultColors } from '../Shared/colors';
import { DefaultLayoutProps, LayoutProp } from '../Shared/LayoutProps';
import Section, { SectionProps } from '../Layout/Section';
import { PageViewSize } from '@/components/atoms/PageViewSize';

const PDFCollapseListUnit: types.Brick<SectionProps> = ({...sectionProps}) => {
  return (
    <Section {...sectionProps} className="prose">
      <PageViewSize enabled={true}>
        <Repeater propName="audits" renderWrapper={(items) => {
            return (
              <div className='flex flex-col w-full h-auto justify-center p-vmd gap-vmd'>{items}</div>
            )
          }}></Repeater>
      </PageViewSize>
    </Section>
  )
}

PDFCollapseListUnit.schema = {
  name: blockNames.FAQSUnit,
  label: 'PDF List Unit',
  category: 'TeamOs-Molecules-Document',

  getDefaultProps: () => ({
    ...DefaultLayoutProps,
  }),

  repeaterItems: [
    {
      name: 'audits',
      itemType: blockNames.VRBPdfItem,
      itemLabel: 'PDF Item',
      min: 1,
      max: 100,
    },
  ],

  sideEditProps: [
    LayoutProp({ colors: DefaultColors }),
  ],
}

export default PDFCollapseListUnit
