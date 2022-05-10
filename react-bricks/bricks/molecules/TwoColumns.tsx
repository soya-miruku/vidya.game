import React, { Children } from 'react'
import { Text, RichText, Image, types, Repeater } from 'react-bricks/frontend'
import { classNames } from '../../../common/helpers'
import { blockNames } from '../blockNames'

//=============================
// Local Types
//=============================
type Padding = 'big' | 'small'

interface TwoColumnsUnitProps {
  padding: Padding
  title: string
  text: string
}

//=============================
// Component to be rendered
//=============================
const TwoColumnsUnit: types.Brick<TwoColumnsUnitProps> = ({ padding }) => {
  return (
    <div className={classNames('text-white w-full h-full min-h-[120px] mx-auto px-6', 'flex flex-row divide-x-2 divide-slate-50 justify-center justify-items-center items-center')}>
      <div className={classNames('w-1/2', 'flex flex-col items-center')}>
        <Repeater propName='col1Buttons' 
        renderWrapper={(items) => {
          return (
            <div className="flex justify-center items-center flex-col sm:flex-row mt-6 space-x-2">
              {items}
             </div>
          )
        }}/>
      <Repeater propName='col1Text' 
        renderWrapper={(items) => {
          return (
            <div className="flex justify-center items-center flex-col sm:flex-row mt-6 space-x-2">
              {items}
             </div>
          )
        }}/>
      <Repeater propName='col1Image' 
        renderWrapper={(items) => {
          return (
            <div className="flex justify-center items-center flex-col sm:flex-row mt-6 space-x-2">
              {items}
             </div>
          )
        }}/>
      </div>
      <div className={classNames('w-1/2', 'flex flex-col items-center')}>
      <Repeater propName='col2Buttons' 
        renderWrapper={(items) => {
          return (
            <div className="flex justify-center items-center flex-col sm:flex-row mt-6 space-x-2">
              {items}
             </div>
          )
        }}/>

        <Repeater propName='col2Text' 
        renderWrapper={(items) => {
          return (
            <div className="flex justify-center items-center flex-col sm:flex-row mt-6 space-x-2">
              {items}
             </div>
          )
        }}/>
        <Repeater propName='col2Image' 
        renderWrapper={(items) => {
          return (
            <div className="flex justify-center items-center flex-col sm:flex-row mt-6 space-x-2">
              {items}
             </div>
          )
        }}/>
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
}

export default TwoColumnsUnit
