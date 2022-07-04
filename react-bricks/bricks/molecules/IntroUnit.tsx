import React from 'react'
import { types } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'
import { bgColors, DefaultColors } from '../Shared/colors';
import { DefaultLayoutProps, LayoutProp } from '../Shared/LayoutProps';
import CallHeroColumn from './CallHeroColumn';
import Section, { SectionProps } from '../Layout/Section';
import { PageViewSize } from '@/components/atoms/PageViewSize';

interface IntroProps extends SectionProps {
}

const IntroUnit: types.Brick<IntroProps> = ({ ...sectionProps }) => {
  return (
    <Section {...sectionProps}>
      <PageViewSize enabled={!sectionProps.bgImage}>
        <CallHeroColumn className='m-0 sm:px-vlrg px-vmd w-auto' propName='header' columns={1} gap='sm' bg={bgColors.none.value} paddingX={0} paddingTop={1} paddingBottom={1} rounded={'none'}></CallHeroColumn>
        <CallHeroColumn className='m-0 sm:px-vlrg px-vmd w-auto' propName='body' columns={2} gap='sm' bg={bgColors.none.value} paddingX={0} paddingTop={2} paddingBottom={2} rounded={'none'}></CallHeroColumn>
        <CallHeroColumn className='m-0 sm:px-vlrg px-vmd pt-0 w-auto' propName='footer' columns={1} gap='sm' bg={bgColors.none.value} paddingX={0} paddingTop={2} paddingBottom={2} rounded={'none'}></CallHeroColumn>
      </PageViewSize>
    </Section>
  )
}

IntroUnit.schema = {
  name: blockNames.IntroUnit,
  label: 'Intro Unit',
  category: 'TeamOs-Molecules',

  getDefaultProps: () => ({
    ...DefaultLayoutProps,
    header: 
    [
      {
        items: [
          {
            type: blockNames.Text,
            name: `btn_header_0`,
            show: true,
            order: 0,
            inline: false,
            itemProp: {
              'size': 'xl'
            },
          }
        ],
      }
  ],
    body: [
      {
        items: [
          {
            type: blockNames.Text,
            name: `btn_body_0`,
            show: true,
            order: 0,
            inline: false,
            itemProp: {
              size: 'lg'
            },
          }
        ],
      },
      {
        items: [
          {
            type: blockNames.Text,
            name: `btn_body_1`,
            show: true,
            order: 0,
            inline: false,
            itemProp: {
              size: 'lg'
            },
          }
        ],
      }
    ],
    footer: [
      {
        items: [
          {
            type: blockNames.Button,
            name: `btn_footer_0`,
            show: true,
            order: 0,
            inline: false,
            itemProp: {
              primary: true,
              btnLink: ''
            },
          },
          {
            type: blockNames.Button,
            name: `btn_footer_1`,
            show: true,
            order: 0,
            inline: false,
            itemProp: {
              special: true,
              btnLink: ''

            },
          },
          {
            type: blockNames.Button,
            name: `btn_footer_2`,
            show: true,
            order: 0,
            inline: false,
            itemProp: {
              secondary: true,
              btnLink: ''

            },
          }
        ],
        size: 'sm',
        type: 'h2',
      }
    ]
  }),
  repeaterItems: [
    {
      name: 'header',
      itemType: blockNames.Column,
      itemLabel: 'Add Header Column',
      min: 1,
      max: 1 
    },
    {
      name: 'body',
      itemType: blockNames.Column,
      itemLabel: 'Add Body Column',
      min: 2,
      max: 2
    },
    {
      name: 'footer',
      itemType: blockNames.Column,
      itemLabel: 'Add Footer Column',
      min: 1,
      max: 1
    }
  ],
  sideEditProps: [
    LayoutProp({ colors: DefaultColors }),
  ],
}

export default IntroUnit
