import React from 'react'
import { Text, RichText, Image, types, Repeater } from 'react-bricks/frontend';
import { classNames } from '@/common/helpers'
import { VText } from '@/components/atoms/VText'
import { VTitle } from '@/components/atoms/VTitle'
import { blockNames } from '../blockNames'
import { DefaultColors } from '../Shared/colors';
import Section, {SectionProps} from '../Layout/Section';
import { DefaultLayoutProps, LayoutProp } from '../Shared/LayoutProps';
import { PageViewSize } from '@/components/atoms/PageViewSize';
import { useDetectIsMobileView } from '@/hooks/useDetectIsMobileView';
import { ParallaxWrapper } from '../Layout/ParallaxWrapper';

//=============================
// Local Types
//=============================
type ImagePositions = 'left' | 'right'
type TextPositions = 'left' | 'center' | 'right'
type ImageSizes = 'small' | 'medium' | 'large'

export interface ICallHeroUnitProps extends SectionProps {
  badgeText: string
  imagePosition: ImagePositions
  textAlign: TextPositions
  imageSize: ImageSizes
  headerButtons?: any
  image: string
  title: string
  text: string
}

const CallHeroUnit: types.Brick<ICallHeroUnitProps> = ({ imagePosition, headerButtons, ...sectionProps }) => {
  const { isMobileView } = useDetectIsMobileView();
  const hasBg = (!!sectionProps.bgImage || sectionProps.bg.color !== 'transparent');
  return (
    <Section {...sectionProps}>
      <PageViewSize enabled={!sectionProps.bgImage}>
        <div className={classNames('max-w-page w-full h-full flex flex-row justify-center p-0', 'prose')}>
          <div className='w-auto h-full p-0'>
            <div className={classNames('h-full', `flex ${imagePosition === 'right' ? 'sm:flex-row-reverse flex-col': 'sm:flex-row flex-col'} justify-center`, hasBg ? 'items-center' : ' items-end')}>
            <ParallaxWrapper disabled={isMobileView} translateX={imagePosition === 'left' ? [-15, 0] : [15, 0]} shouldAlwaysCompleteAnimation>
              <div className='sm:max-w-[490px] w-full h-full flex justify-center z-10 p-vsm'>
                  <Image
                    propName="image"
                    alt="image"
                    useWebP={true}
                    useNativeLazyLoading={true}
                    renderWrapper={({ children }) => {
                      return (
                        <div className={'w-full h-full min-w-[200px] min-h-[200px]'}>
                          {children}
                        </div>
                      )
                    }}
                    imageClassName="h-full mb-0 ml-2"
                  />
              </div>
            </ParallaxWrapper>
            <div className="sm:w-[60%] w-full h-full p-vmd flex flex-col justify-center items-center z-10 gap-vsm">
              <ParallaxWrapper disabled={hasBg} className='w-full' translateY={[0, -60]} shouldAlwaysCompleteAnimation>
                <Repeater propName='badgeLabels' itemProps={{
                  hasBg
                }} renderWrapper={(items) => {
                  return (
                    <div className="flex flex-wrap justify-start items-center m-0 w-full p-0">
                      {items}
                    </div>
                  )
                }}>
                </Repeater>
              </ParallaxWrapper>
              <div className={classNames('flex flex-col justify-center h-full w-full', hasBg ? '': ' pt-vlrg')}>
                <ParallaxWrapper disabled={hasBg} translateY={[0, -60]} shouldAlwaysCompleteAnimation >
                    <Text
                      renderBlock={(props) => (
                        <VTitle overrideTextColor={hasBg} className='m-0' type={isMobileView ? 'h3' : 'h2'}>{props.children}</VTitle>
                      )}
                      renderPlaceholder={(props) => (
                        <span className="opacity-30">{props.children}</span>
                      )}
                      placeholder="Type a title..."
                      propName="title"
                    />
                  </ParallaxWrapper>

                  <ParallaxWrapper disabled={hasBg} translateY={[0, -50]} shouldAlwaysCompleteAnimation >
                    <RichText
                      renderBlock={(props) => (
                        <VText overrideTextColor={hasBg} size='lg' className='m-0'>
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
                  </ParallaxWrapper>

              </div>
              { headerButtons?.length > 0 && headerButtons?.[0]?.props?.children &&
                <Repeater propName='headerButtons' itemProps={{background: hasBg}} renderWrapper={(items) => {
                  return (
                    <div className="w-full flex flex-wrap justify-start items-center sm:flex-row m-0 sm:gap-x-vlrg gap-x-vmd">
                      {items}
                    </div>
                  )
                }}>
                </Repeater>
            }
              </div>
            </div>
          </div>
        </div>
      </PageViewSize>
    </Section>
  )
}

CallHeroUnit.schema = {
  name: blockNames.CallHeroImage,
  label: 'Call Hero Image Unit',
  category: 'TeamOs-Molecules',
  getDefaultProps: () => ({
    ...DefaultLayoutProps,
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
    LayoutProp({ colors: DefaultColors }),
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
