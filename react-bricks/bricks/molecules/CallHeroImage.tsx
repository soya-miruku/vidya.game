import React, { Children } from 'react'
import { Text, RichText, Image, types, Repeater } from 'react-bricks/frontend';
import { classNames } from '@/common/helpers'
import { VButton } from '@/components/atoms/VButton'
import { VLabel } from '@/components/atoms/VLabel'
import { VText } from '@/components/atoms/VText'
import { VTitle } from '@/components/atoms/VTitle'
import { blockNames } from '../blockNames'
import { bgColors } from '../Shared/colors';
import Section, {Border} from '../Layout/Section';
import { LayoutProp } from '../Shared/LayoutProps';
import { Padding, Round } from '../Shared/additional';

//=============================
// Local Types
//=============================
type ImagePositions = 'left' | 'right'
type TextPositions = 'left' | 'center' | 'right'
type ImageSizes = 'small' | 'medium' | 'large'

export interface ICallHeroUnitProps {
  badgeText: string
  imagePosition: ImagePositions
  textAlign: TextPositions
  imageSize: ImageSizes
  background: boolean
  image: string
  title: string
  text: string
  bg?: { color: string; className: string }
  paddingX?: Padding
  paddingY?: Padding
  borderTop?: Border
  rounded?: Round
  borderBottom?: Border
}

const CallHeroUnit: types.Brick<ICallHeroUnitProps> = ({ rounded, bg, borderTop, borderBottom, imagePosition, paddingX, paddingY, background }) => {
  return (
    <Section bg={bg} borderTop={borderTop} borderBottom={borderBottom} paddingX={paddingX} paddingY={paddingY} rounded={rounded}>
      <div className={classNames('w-full flex flex-row justify-center px-[20px]', 'prose')}>
        <div className='w-full h-full p-2'>
          <div className={classNames('', `flex ${imagePosition === 'right' ? 'sm:flex-row-reverse flex-col': 'sm:flex-row flex-col'} justify-end items-center`)}>
          <div className='sm:w-1/2 w-full h-full flex justify-center z-10'>
            <Image
              propName="image"
              alt="image"
              containerClassName='w-full h-full min-w-[200px] min-h-[200px] '
              imageClassName="h-full mb-5 ml-2"
            />
          </div>
          { background && <div className='absolute bg-primary-100 w-page rounded-lgr px-8 py-14 mt-12 mx-auto right-0 left-0 z-0' style={{height: '375px'}}></div>}
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
                <div className="flex flex-wrap justify-start items-center flex-col sm:flex-row mt-6 space-x-7 w-full h-full">
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
    </Section>
  )
}

CallHeroUnit.schema = {
  name: blockNames.CallHeroImage,
  label: 'Call Hero Image Unit',
  category: 'TeamOs-Molecules',
  getDefaultProps: () => ({
    bg: {
      color: '#',
      className: 'bg-gray-100 dark:bg-dark-200 bg-light-200',
    },
    borderTop: 'none',
    borderBottom: 'none',
    headerButtons: [
      {
        children: 'Button 1',
        secondary:true
      }
    ],
    badgeLabels: [
      {
        label: 'programs',
      }
    ],
    background: false,
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
    LayoutProp({ colors: [bgColors.none, bgColors.dark, bgColors.light, bgColors.gray] }),
    {
      name: 'grayscale',
      label: 'Greyscale',
      type: types.SideEditPropType.Boolean,
    },
    {
      name: 'background',
      label: 'Background',
      type: types.SideEditPropType.Boolean,
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
    // {
    //   name: 'fontFamily',
    //   label: 'Font Family',
    //   type: types.SideEditPropType.Select,
    //   selectOptions: {
    //     display: types.OptionsDisplay.Select, 
    //     options: [
    //       { value: 'sans', label: 'Sans' },
    //       { value: 'serif', label: 'Serif' },
    //       { value: 'mono', label: 'Mono' },
    //       { value: 'thin', label: 'Thin' },
    //       { value: 'saira', label: 'Saira SemiCondensed' },
    //       { value: 'nunito', label: 'Nunito' },
    //       { value: 'roboto', label: 'Roboto' },
    //       { value: 'poppins', label: 'Poppins' },
    //     ],
    //   },
    // }
  ],
}

export default CallHeroUnit
