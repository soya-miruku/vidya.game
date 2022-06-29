import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { classNames } from '@/common/helpers'
import { blockNames } from '../blockNames'
import { bgColors, DefaultColors } from '../Shared/colors';
import Columns from '../Layout/Columns';
import Section, { SectionProps } from '../Layout/Section';
import { DefaultLayoutProps, LayoutProp } from '../Shared/LayoutProps';
import { Gap, NumColumns, Padding, Round } from '../Shared/additional';

//=============================
// Local Types
//=============================
type TextPosition = 'left' | 'right'
type TextPositions = 'left' | 'center' | 'right'
type ImageSizes = 'small' | 'medium' | 'large'
type FontFamily = 'sans-serif' | 'serif' | 'mono' | 'thin' | 'Saira SemiCondensed' | 'Nunito' | 'roboto' | 'poppins'

interface CallHeroUnitProps extends SectionProps {
  badgeText?: string
  propName?: string
  fontFamily?: FontFamily
  background?: boolean
  image?: string
  title?: string
  text?: string
  gap: Gap
  columns?: NumColumns
}

const CallHeroColumn: types.Brick<CallHeroUnitProps> = ({ propName, gap, bg, bgImage, enableParallax, parallaxSpeed, blur, height, paddingX, paddingY, background, className, rounded }) => {
  return (
    <Section className={className} bg={bg} bgImage={bgImage}  parallaxSpeed={parallaxSpeed} enableParallax={enableParallax} blur={blur} height={height} paddingX={paddingX} paddingY={paddingY} rounded={rounded}>
       <Repeater propName={propName || 'columns'} renderItemWrapper={(item, index) => {
          return (
            <div style={{zIndex: 100}} key={index}>
              {item}
            </div>
          )
       }} itemProps={{overrideTextColor: background === true}} renderWrapper={(items) => {
          return (
            <Columns gap={gap} cols={items?.props?.children?.length} className={classNames("text-light-100 items-start", 's-items-end', background ? 'bg-primary-100 w-full rounded-xl my-auto mx-auto  right-0 left-0 z-0' : '')}>
              {/* {background && <div className='bg-primary-100 w-full rounded-xl my-auto mx-auto right-0 left-0 z-0' >{items}</div>} */}
              {items}
            </Columns>
          )
        }}>
      </Repeater>
    </Section>
  )
}

CallHeroColumn.schema = {
  name: blockNames.CallHeroText,
  label: 'Call Hero Columns Unit',
  category: 'TeamOs-Molecules',

  getDefaultProps: () => ({
    gap: 'lg',
    paddingX: 'lg',
    paddingY: 'lg',
    ...DefaultLayoutProps,
    columns: [
      {
        items: [
          {
            type: blockNames.Button,
            name: `btn_0`,
            show: true,
            order: 0,
            inline: false,
            itemProp: {},
          }
        ],
        size: 'sm',
        type: 'h2',
      }
    ],
    headerButtons: [
      {
        children: 'Button 1',
      }
    ],
    badgeLabels: [
      {
        label: 'programs',
      }
    ],
    background: false,
  }),
  repeaterItems: [
    {
      name: 'columns',
      itemType: blockNames.Column,
      itemLabel: 'Column',
      min: 1,
      max: 4 
    },
  ],
  sideEditProps: [
    LayoutProp({ colors: DefaultColors }),
    {
      name: 'background',
      label: 'Background',
      type: types.SideEditPropType.Boolean,
    },
    {
      name: 'gap',
      label: 'Gap',
      type: types.SideEditPropType.Select,
      selectOptions: {
        display: types.OptionsDisplay.Select,
        options: [
          { label: 'Small', value: 'sm' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' },
        ]
      }
    }
  ],
}

export default CallHeroColumn
