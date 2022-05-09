import React, { Children } from 'react'
import { Text, RichText, Image, types } from 'react-bricks/frontend'

//=============================
// Local Types
//=============================
type Padding = 'x-large' | 'big' | 'small'
type ImagePositions = 'left' | 'right'
type TextPositions = 'left' | 'center' | 'right'
type ImageSizes = 'small' | 'medium' | 'large'
type FontFamily = 'sans-serif' | 'serif' | 'mono' | 'thin'

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
    <div className={`${ padding === 'x-large' ? 'py-24 px-44' : padding === 'big' ? 'py-12 px-44' : 'py-2 px-20' }`}>
      <div className={`flex ${imagePosition === 'right' ? 'flex-row-reverse': ''} flex-auto justify-start items-center`}>
        <div className='w-1/3'>
          <Image
            propName="icon"
            alt="Icon"
            maxWidth={100}
            imageClassName="w-full mb-5"
          />
        </div>
        <div className='w-2/3 flex flex-col justify-start items-center'>
          <div className='w-full flex justify-start items-start py-4'>
            <div className='border-2 py-2 px-4 rounded-2xl border-[#651AB7] '>
              <Text
                renderBlock={(props) => (
                  <h1 className={`font-[${fontFamily ?? 'mono'}] text-true-dark-100 dark:text-white`}>
                    {props.children}
                  </h1>
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
              <h1 className={`text-3xl sm:text-[80px] font-${fontFamily ?? 'mono'} font-bold text-[${textAlign ?? 'left'}] text-true-dark-100 dark:text-white leading-tight mb-3`}>
                {props.children}
              </h1>
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
  )
}

CallHeroUnit.schema = {
  name: 'call-hero-unit',
  label: 'Call Hero Unit',
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
        ],
      },
    }
  ],
}

export default CallHeroUnit
