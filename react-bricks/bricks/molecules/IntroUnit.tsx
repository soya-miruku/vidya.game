import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { classNames } from '@/common/helpers'
import { blockNames } from '../blockNames'
import { bgColors } from '../Shared/colors';
import { LayoutProp } from '../Shared/LayoutProps';
import VRBColumn from '../atoms/VRBColumn';
import Section, { Border } from '../Layout/Section';
import CallHeroColumn from './CallHeroColumn';

interface IntroProps {
  bg?: { color: string; className: string }
  borderTop?: Border
  borderBottom?: Border
}

const IntroUnit: types.Brick<IntroProps> = ({ bg, borderTop, borderBottom }) => {
  return (
    <div className='w-full h-full flex flex-col gap-y-[30px] max-w-[800px] m-auto'>
      <CallHeroColumn className='m-0' propName='header' columns={1} gap='sm' bg={bg} borderBottom={borderBottom} borderTop={borderTop} paddingX="none" paddingY='none' rounded='none'></CallHeroColumn>
      <CallHeroColumn propName='body' columns={2} gap='sm' bg={bg} borderBottom={borderBottom} borderTop={borderTop} paddingX="none" paddingY='none'></CallHeroColumn>
      <CallHeroColumn className='m-0' propName='footer' columns={1} gap='sm' bg={bg} borderBottom={borderBottom} borderTop={borderTop} paddingX="none" paddingY='none'></CallHeroColumn>
    </div>
  )
}

IntroUnit.schema = {
  name: blockNames.IntroUnit,
  label: 'Intro Unit',
  category: 'TeamOs-Molecules',

  getDefaultProps: () => ({
    bg: {
      color: '#',
      className: 'bg-gray-100 dark:bg-dark-200 bg-light-200',
    },
    borderTop: 'none',
    borderBottom: 'none',
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
    LayoutProp({ colors: [bgColors.none, bgColors.dark, bgColors.light, bgColors.gray] }),
  ],
}

export default IntroUnit
