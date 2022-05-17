import * as React from 'react'
import classNames from 'classnames'

import { Repeater, types, useAdminContext } from 'react-bricks/frontend'
import {blockNames} from '../blockNames'
import { bgColors } from '../Shared/colors'
import Section, { Border } from '../Layout/Section'
import Container, { Size } from '../Layout/Container'
import { LayoutProp } from '../Shared/LayoutProps'
import { VTitle } from '@/components/atoms/VTitle'
import { Padding } from '../Shared/additional'
import { VCarousel } from '@/components/atoms/VCarousel'
import { useDetectIsMobileView } from 'hooks/useDetectIsMobileView'

export interface CustomersProps {
  bg?: { color: string; className: string }
  borderTop?: Border;
  borderBottom?: Border;
  paddingX?: Padding;
  paddingY?: Padding;
  size?: 'medium' | 'large'
  width?: Size
  grayscale?: boolean
}

const Customers: types.Brick<CustomersProps> = ({
  bg = bgColors.white.value,
  borderTop = 'none',
  borderBottom = 'none',
  grayscale = true,
  paddingX,
  paddingY
}) => {
  const { isAdmin } = useAdminContext();
  const { isMobileView } = useDetectIsMobileView();
  return (
    <Section paddingX={paddingX} paddingY={paddingY} bg={bg} borderTop={borderTop} borderBottom={borderBottom} className="w-full">
      <Repeater propName="customers" itemProps={{ grayscale }} renderWrapper={(items) => {
        return (
          <div className='prose flex flex-col justify-center items-center gap-y-12'>
            <VTitle type='h5'>Featured In</VTitle>
            <VCarousel slidesPerView={isMobileView ? 3 : 5} navigation={isAdmin} slides={items.props.children}></VCarousel>
          </div>
        )
      }}></Repeater>
    </Section>
  )
}

Customers.schema = {
  name: blockNames.Customers,
  label: 'Customers',
  category: 'TeamOs-Basics',
  playgroundLinkLabel: 'View source code on Github',
  playgroundLinkUrl:
    'https://github.com/ReactBricks/react-bricks-ui/blob/master/src/website/Customers/Customers.tsx',

  getDefaultProps: () => ({
    bg: {
      color: '#',
      className: 'bg-gray-100 dark:bg-dark-200 bg-light-200',
    },
    borderTop: 'none',
    borderBottom: 'none',
    width: 'lg',
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
    LayoutProp({ colors: [bgColors.none, bgColors.white, bgColors.dark, bgColors.light, bgColors.gray] }),
    {
      name: 'grayscale',
      label: 'Greyscale',
      type: types.SideEditPropType.Boolean,
    },
  ],
}

export default Customers