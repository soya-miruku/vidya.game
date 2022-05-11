import React, { Children } from 'react'
import { Text, RichText, Image, types, Repeater } from 'react-bricks/frontend';
import { classNames } from '../../../common/helpers'
import { VButton } from '../../../components/VButton'
import { VLabel } from '../../../components/VLabel'
import { VText } from '../../../components/VText'
import { VTitle } from '../../../components/VTitle'
import VRBText from '../atoms/VRBText'
import { blockNames } from '../blockNames'

//=============================
// Local Types
//=============================
type Padding = 'x-large' | 'big' | 'small'
type ImagePositions = 'left' | 'right'
type TextPositions = 'left' | 'center' | 'right'
type ImageSizes = 'small' | 'medium' | 'large'
type FontFamily = 'sans-serif' | 'serif' | 'mono' | 'thin' | 'Saira SemiCondensed' | 'Nunito' | 'roboto' | 'poppins'

interface CallHeroUnitProps {
  padding: Padding
  badgeText: string
  imagePosition: ImagePositions
  fontFamily: FontFamily
  textAlign: TextPositions
  imageSize: ImageSizes
  background: boolean
  image: string
  title: string
  text: string
}

const CallHeroUnit: types.Brick<CallHeroUnitProps> = ({ padding, textAlign, imagePosition, fontFamily, background }) => {
  return (
    <div className={classNames(padding === 'x-large' ? 'sm:py-8 py-3 xs:px-40 md:px-24 px-8' : padding === 'big' ? 'sm:py-2 py-1 sm:px-4 px-1' : 'sm:py-1 sm:px-2 px-1', 
    'w-full flex flex-row justify-center', 'prose')}>
      <div className='w-full h-full p-2'>
        <div className={classNames('', `flex ${imagePosition === 'right' ? 'sm:flex-row-reverse flex-col': 'sm:flex-row flex-col'} justify-end items-center`)}>
        <div className='sm:w-1/2 w-full h-full p-[30px] flex justify-center z-10'>
          <Image
            propName="image"
            alt="image"
            containerClassName='w-full h-full min-w-[200px] min-h-[200px] '
            imageClassName="h-full mb-5 ml-2"
          />
        </div>
        { background && <div className='absolute bg-primary-100 w-[90%] rounded-xl px-8 py-12 mt-32 mx-auto right-0 left-0 z-0' style={{height: '375px'}}></div>}
        <div className='sm:w-1/2 w-full p-[30px] flex flex-col justify-start items-start z-10'>
          <div className='w-full flex justify-start items-start py-4'>
          <Repeater propName='badgeLabels' renderWrapper={(items) => {
            return (
              <div className="flex flex-wrap justify-start items-center flex-col sm:flex-row mt-6 space-x-2 w-full h-full">
                {items}
              </div>
            )
          }}>

          </Repeater>
          </div>
          <Text
            renderBlock={(props) => (
              <VTitle overrideTextColor={background} className='mb-3' type='h2'>{props.children}</VTitle>
            )}
            renderPlaceholder={(props) => (
              <span className="opacity-30">{props.children}</span>
            )}
            placeholder="Type a title..."
            propName="title"
          />
          <RichText
            renderBlock={(props) => (
              <VText overrideTextColor={background} size='lg' className='mt-4'>
                {props.children}
              </VText>
            )}
            placeholder="Type a text..."
            propName="text"
            allowedFeatures={[
              types.RichTextFeatures.Bold,
              types.RichTextFeatures.Italic,
              types.RichTextFeatures.Highlight,
              types.RichTextFeatures.Code,
              types.RichTextFeatures.Link,
            ]}
            renderCode={(props) => (
              <code className="text-sm py-1 px-2 bg-gray-200 dark:bg-gray-700 rounded">
                {props.children}
              </code>
            )}
        />
        <div className='w-full flex justify-start'>
          <Repeater propName='headerButtons' renderWrapper={(items) => {
            return (
              <div className="flex flex-wrap justify-start items-center flex-col sm:flex-row mt-6 space-x-2 w-full h-full">
                {items}
              </div>
            )
          }}>
          </Repeater>
          </div>
          {/* <VButton primary>Primary</VButton> */}
        </div>
        </div>
      </div>
    </div>
  )
}

CallHeroUnit.schema = {
  name: blockNames.CallHeroUnit,
  label: 'Call Hero Unit',
  category: 'TeamOs-Basics',
  getDefaultProps: () => ({
    headerButtons: [
      {
        label: 'Button 1',
      }
    ],
    badgeLabels: [
      {
        label: 'programs',
      }
    ],
    background: true,
    padding: 'big',
    textAlign: 'left',
    imagePosition: 'right',
    badgeText: 'Programs',
    fontFamily: 'sans',
    title: 'This is a custom Hero Unit',
    text: "We are a hi-tech web development company committed to deliver great products on time. We love to understand our customers' needs and exceed expectations.",
  }),
  repeaterItems: [
    {
      name: 'headerButtons',
      itemType: blockNames.Button,
      itemLabel: 'Button',
      min: 0,
      max: 2 
    },
    {
      name: 'badgeLabels',
      itemType: blockNames.Label,
      itemLabel: 'Label',
      min: 0,
      max: 1
    }
  ],
  sideEditProps: [
    {
      name: 'background',
      label: 'Background',
      type: types.SideEditPropType.Boolean,
    },
    {
      name: 'padding',
      label: 'Padding',
      type: types.SideEditPropType.Select,
      selectOptions: {
        display: types.OptionsDisplay.Select,
        options: [
          { value: 'x-large', label: 'X Large Padding' },
          { value: 'big', label: 'Big Padding' },
          { value: 'small', label: 'Small Padding' },
        ],
      },
    },
    {
      name: 'textAlign',
      label: 'Text Align',
      type: types.SideEditPropType.Select,
      selectOptions: {
        display: types.OptionsDisplay.Select,
        options: [
          { value: 'left', label: 'Left' },
          { value: 'center', label: 'Center' },
          { value: 'right', label: 'Right' },
        ],
      },
    },
    {
      name: 'imagePosition',
      label: 'Image Position',
      type: types.SideEditPropType.Select,
      selectOptions: {
        display: types.OptionsDisplay.Select,
        options: [
          { value: 'left', label: 'Left' },
          { value: 'right', label: 'Right' },
        ],
      },
    },
    {
      name: 'fontFamily',
      label: 'Font Family',
      type: types.SideEditPropType.Select,
      selectOptions: {
        display: types.OptionsDisplay.Select, 
        options: [
          { value: 'sans', label: 'Sans' },
          { value: 'serif', label: 'Serif' },
          { value: 'mono', label: 'Mono' },
          { value: 'thin', label: 'Thin' },
          { value: 'saira', label: 'Saira SemiCondensed' },
          { value: 'nunito', label: 'Nunito' },
          { value: 'roboto', label: 'Roboto' },
          { value: 'poppins', label: 'Poppins' },
        ],
      },
    }
  ],
}

export default CallHeroUnit
