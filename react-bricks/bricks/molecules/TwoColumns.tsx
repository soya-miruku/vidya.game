import React, { Children } from 'react'
import { Text, RichText, Image, types, Repeater } from 'react-bricks/frontend'
import { classNames } from '../../../common/helpers'
import { blockNames } from '../blockNames'

//=============================
// Local Types
//=============================
type Padding = 'big' | 'small'
type Rounded = 'xl' | 'lg' | 'sm' | 'xs'

interface TwoColumnsUnitProps {
  padding: Padding
  rounded: Rounded
  bgColor: string
  divideColor: string
  divideWidth: string
  title: string
  text: string
}

//=============================
// Component to be rendered
//=============================
const TwoColumnsUnit: types.Brick<TwoColumnsUnitProps> = ({ padding, rounded, bgColor, divideColor, divideWidth }) => {
  return (
    <div className='w-full flex justify-center items-center'>
      <div style={{
        backgroundColor: bgColor,
      }} className={classNames(
      `${padding === 'big' ? 'py-12' : 'py-2'}`,
      rounded ? `rounded-${rounded}` : 'rounded-lg',
      divideColor ? `divide-[${divideColor}]` : 'divide-true-dark-100',
      divideWidth ? `divide-x-1` : 'divide-x-[1px]',
      'shadow-2xl mb-44 py-12 w-11/12  h-full min-h-[120px]  px-6', 
      'flex flex-row flex-wrap justify-start space-x-1')}>
        
        <div className={classNames('w-1/3', 'flex flex-wrap flex-col justify-start items-center space-x-2')}>
          <Repeater propName='col1Buttons' 
          renderWrapper={(items) => {
            return (
              <div className="flex flex-wrap justify-center items-center flex-col sm:flex-row mt-6 space-x-2 w-full h-full">
                {items}
              </div>
            )
          }}/>
        <Repeater propName='col1Text' 
          renderWrapper={(items) => {
            return (
              <div className="flex flex-wrap justify-center items-center flex-col sm:flex-row mt-6 space-x-2 w-full h-full">
                {items}
              </div>
            )
          }}/>
          <Repeater propName='col1Image' 
            renderWrapper={(items) => {
              return (
                <div className="flex flex-wrap justify-center items-center flex-col sm:flex-row mt-2 w-full h-full">
                  {items}
                </div>
              )
            }}/>
        </div>
        <div className={classNames('w-1/3', 'flex flex-wrap flex-col justify-start items-center space-x-2')}>
        <Repeater propName='col2Buttons' 
          renderWrapper={(items) => {
            return (
              <div className="flex flex-wrap justify-center items-center flex-col sm:flex-row mt-6 space-x-2 w-full h-full">
                {items}
              </div>
            )
          }}/>

          <Repeater propName='col2Text' 
          renderWrapper={(items) => {
            return (
              <div className="flex flex-wrap justify-center items-center flex-col sm:flex-row mt-6 space-x-2 w-full h-full">
                {items}
              </div>
            )
          }}/>

            <Repeater propName='col2Image' 
            renderWrapper={(items) => {
              return (
                <div className="flex flex-wrap justify-center items-center flex-col sm:flex-row mt-6 w-full h-full">
                  {items}
                </div>
              )
            }}/>
        </div>
      </div>
    </div>
  )
}

//=============================
// Brick Schema
//=============================
TwoColumnsUnit.schema = {
  name: blockNames.TwoColumnsUnit,
  label: 'Two Columns Unit',
  category: 'TeamOs-Basics',

  getDefaultProps: () => ({
    padding: 'big',
    rounded: 'xl',
    bgColor: '#ffffff',
    divideColor: '#00000',
    divideWidth: 1,
    col1Buttons: [
      {
        text: 'Button 1',
      },
      {
        text: 'Button 2',
      }
    ],
    col2Buttons: [
      {
        text: 'Button x1',
      }
    ],
    col1Text: [
      {
        text: 'Text 1',
      },
    ],
    col2Text: [
      {
        text: 'Text 2',
      }
    ],
    col1Image: [
      {
        image: 'https://via.placeholder.com/300x200',
      },
      {
      }
    ],
    col2Image: [
      {
        image: 'https://via.placeholder.com/300x200',
      }
    ],

  }),
  repeaterItems: [
    {
      name: 'col1Text',
      itemType: blockNames.Text,
      itemLabel: 'Add Text Col1',
      min: 0,
      max: 2
    },
    {
      name: 'col2Text',
      itemType: blockNames.Text,
      itemLabel: 'Add Text Col2',
      min: 0,
      max: 2
    },
    {
      name: 'col1Image',
      itemType: blockNames.Image,
      itemLabel: 'Add Image Col1',
      min: 0,
      max: 2
    },
    {
      name: 'col2Image',
      itemType: blockNames.Image,
      itemLabel: 'Add Image Col2',
      min: 0,
      max: 2
    },
    {
      name: 'col1Buttons',
      itemType: blockNames.Button,
      itemLabel: 'Column 1 Button',
      min: 0,
      max: 4
    },
    {
      name: 'col2Buttons',
      itemType: blockNames.Button,
      itemLabel: 'Column 2 Button',
      min: 0,
      max: 4
    }
  ],
  sideEditProps: [
    {
      name: 'padding',
      label: 'Padding',
      type: types.SideEditPropType.Select,
      selectOptions: {
        display: types.OptionsDisplay.Select,
        options: [
          {
            label: 'Big',
            value: 'big'
          },
          {
            label: 'Small',
            value: 'small'
          }
        ]
      },
    },
    {
      name: 'rounded',
      label: 'Rounded',
      type: types.SideEditPropType.Select,
      selectOptions: {
        display: types.OptionsDisplay.Select,
        options: [
          {
            label: 'XLarge',
            value: 'xl'
          },
          {
            label: 'Large',
            value: 'lg'
          },
          {
            label: 'Small',
            value: 'sm'
          }
        ]
      },
    },
    {
      name: 'bgColor',
      label: 'Background Color',
      type: types.SideEditPropType.Select,
      selectOptions: {
        display: types.OptionsDisplay.Color,
      }
    },
    {
      name: 'textColor',
      label: 'Text Color',
      type: types.SideEditPropType.Select,
      selectOptions: {
        display: types.OptionsDisplay.Color,
      }
    },
    {
      name: 'divideColor',
      label: 'Divider Color',
      type: types.SideEditPropType.Select,
      selectOptions: {
        display: types.OptionsDisplay.Color, 
      }
    },
    {
      name: 'divideWidth',
      label: 'Divider Width',
      type: types.SideEditPropType.Range,
      rangeOptions: {
        min: 0,
        max: 10,
        step: 1
      }
    }
  ]
}

export default TwoColumnsUnit
