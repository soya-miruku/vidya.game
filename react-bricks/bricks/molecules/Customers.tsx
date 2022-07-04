import * as React from 'react'
import classNames from 'classnames'

import { Repeater, types, useAdminContext } from 'react-bricks/frontend'
import {blockNames} from '../blockNames'
import { bgColors, DefaultColors } from '../Shared/colors'
import Section, { SectionProps } from '../Layout/Section'
import { Size } from '../Layout/Container'
import { DefaultLayoutProps, LayoutProp } from '../Shared/LayoutProps'
import { VTitle } from '@/components/atoms/VTitle'
import { Padding } from '../Shared/additional'
import { VCarousel } from '@/components/atoms/VCarousel'
import { useDetectDeviceSize } from 'hooks/useDetectIsMobileView'
import { PageViewSize } from '@/components/atoms/PageViewSize'

export interface CustomersProps extends SectionProps {
  size?: 'medium' | 'large'
  width?: Size
  grayscale?: boolean
}

const Customers: types.Brick<CustomersProps> = ({ grayscale = true, ...sectionProps}) => {
  const { isAdmin } = useAdminContext();
  const { isMobileView } = useDetectDeviceSize();
  return (
    <Section {...sectionProps}>
      <PageViewSize enabled={!sectionProps.bgImage}>
        <Repeater propName="customers" itemProps={{ grayscale }} renderWrapper={(items) => {
          return (
            <div className='prose flex flex-col justify-center items-center gap-y-12 h-full'>
              <VTitle type='h5'>As Featured In</VTitle>
              <VCarousel slidesPerView={isMobileView ? 2 : 5} navigation={true} slides={items.props.children}></VCarousel>
            </div>
          )
        }}></Repeater>
      </PageViewSize>
    </Section>
  )
}

Customers.schema = {
  name: blockNames.Customers,
  label: 'Customers',
  category: 'TeamOs-Molecules',
  playgroundLinkLabel: 'View source code on Github',
  playgroundLinkUrl:
    'https://github.com/ReactBricks/react-bricks-ui/blob/master/src/website/Customers/Customers.tsx',

  getDefaultProps: () => ({
    width: 'lg',
    ...DefaultLayoutProps,
    grayscale: false,
    customers: [
      {
        image: {
          src: 'https://images.reactbricks.com/original/55a585f2-0092-499a-88e7-6f6e72870382.svg',
          placeholderSrc:
            'https://images.reactbricks.com/original/55a585f2-0092-499a-88e7-6f6e72870382.svg',
          srcSet: '',
          alt: 'Airbnb',
          seoName: 'airbnb',
        },
      },
      {
        image: {
          src: 'https://images.reactbricks.com/original/df0214c6-7feb-4037-921f-985bdf584ed7.svg',
          placeholderSrc:
            'https://images.reactbricks.com/original/df0214c6-7feb-4037-921f-985bdf584ed7.svg',
          srcSet: '',
          alt: 'Dribble',
          seoName: 'dribble',
        },
      },
      {
        image: {
          src: 'https://images.reactbricks.com/original/44dd50bd-9401-47bb-a248-56192cb0da03.svg',
          placeholderSrc:
            'https://images.reactbricks.com/original/44dd50bd-9401-47bb-a248-56192cb0da03.svg',
          srcSet: '',
          alt: 'Netflix',
          seoName: 'netflix',
        },
      },
      {
        image: {
          src: 'https://images.reactbricks.com/original/5bea2f55-07ea-47fb-b638-bedaa6c2275f.svg',
          placeholderSrc:
            'https://images.reactbricks.com/original/5bea2f55-07ea-47fb-b638-bedaa6c2275f.svg',
          srcSet: '',
          alt: 'Pinterest',
          seoName: 'pinterest',
        },
      },
      {
        image: {
          src: 'https://images.reactbricks.com/original/52f81cf1-01bc-43d0-9428-995351146c2a.svg',
          placeholderSrc:
            'https://images.reactbricks.com/original/52f81cf1-01bc-43d0-9428-995351146c2a.svg',
          srcSet: '',
          alt: 'Next.js',
          seoName: 'next-js',
        },
      },
    ],
  }),
  repeaterItems: [
    {
      name: 'customers',
      itemType: blockNames.Customer,
      itemLabel: 'Customer',
      // addItemText: 'Add customer',
      // removeItemText: 'Remove customer',
      min: 0,
      max: 12,
    },
  ],
  sideEditProps: [
    LayoutProp({ colors: DefaultColors }),
    {
      name: 'grayscale',
      label: 'Greyscale',
      type: types.SideEditPropType.Boolean,
    },
  ],
}

export default Customers