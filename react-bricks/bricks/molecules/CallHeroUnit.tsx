import React, { Children } from 'react'
import { Text, RichText, Image, types } from 'react-bricks/frontend'
import { classNames } from '../../../common/helpers'
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
  image: string
  title: string
  text: string
}

const CallHeroUnit: types.Brick<CallHeroUnitProps> = ({ padding, textAlign, imagePosition, fontFamily }) => {
  return (
    <div className={classNames(padding === 'x-large' ? 'sm:py-24 py-2 xs:px-44 md:px-24 px-8' : padding === 'big' ? 'sm:py-12 py-1 sm:px-44 px-1' : 'sm:py-2 sm:px-20 px-8', 
    'w-full flex flex-row justify-center', 'prose')}>
      <div className='w-full h-full p-2'>
        <div className={classNames('', `flex ${imagePosition === 'right' ? 'sm:flex-row-reverse flex-col': 'sm:flex-row flex-col'} flex-auto justify-start items-center`)}>
        <div className='sm:w-1/2 w-full h-full p-4 flex justify-center z-10'>
          <Image
            propName="image"
            alt="image"
            imageClassName="w-[400px] h-full mb-5 ml-5"
          />
        </div>
        {/* <h1>HELLO THERE MY FRIENDS</h1> */}
        {/* <div className='absolute bg-primary-100 w-[90%] h-[500px] rounded-xl px-8 py-12 mt-10 mx-auto right-0 left-0 z-0'></div> */}
        <div className='sm:w-1/2 w-full flex flex-col justify-start items-center z-10'>
          <div className='w-full flex justify-start items-start py-4'>
            <div className='border-2 ml-1 py-2 px-4 rounded-xl border-[#651AB7] '>
              <Text
                renderBlock={(props) => (
                  <p className={`font-[${fontFamily ?? 'mono'}] text-true-dark-100 dark:text-white`}>
                    {props.children}
                  </p>
                )}
                renderPlaceholder={(props) => (
                  <span className="opacity-30">{props.children}</span>
                )}
                placeholder="Type a title..."
                propName="badgeText"
              />
            </div>
          </div>
          <Text
            renderBlock={(props) => (
              <h2 className={`sm:text-[80px] font-${fontFamily ?? 'mono'} font-black text-[${textAlign ?? 'left'}] text-true-dark-100 dark:text-white leading-tight mb-3`}>
                {props.children}
              </h2>
            )}
            renderPlaceholder={(props) => (
              <span className="opacity-30">{props.children}</span>
            )}
            placeholder="Type a title..."
            propName="title"
          />
          <RichText
          renderBlock={(props) => (
            <p className={`text-base font-${fontFamily ?? 'mono'} text-[${textAlign ?? 'left'}] leading-relaxed text-true-dark-100 dark:text-gray-100`}>
              {props.children}
            </p>
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
    padding: 'big',
    textAlign: 'left',
    imagePosition: 'right',
    badgeText: 'Programs',
    fontFamily: 'sans',
    title: 'This is a custom Hero Unit',
    text: "We are a hi-tech web development company committed to deliver great products on time. We love to understand our customers' needs and exceed expectations.",
  }),
  sideEditProps: [
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
