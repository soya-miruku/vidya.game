import * as React from 'react'
import { Image, ReactBricksContext, types } from 'react-bricks/frontend'
import {blockNames} from '../blockNames'

export interface CustomerProps {
  grayscale?: boolean
  link?: string
  isAdmin?: boolean
}

const VRBCustomer: types.Brick<CustomerProps> = ({
  grayscale = true,
  isAdmin,
  link,
  ...rest
}) => {
  const { isDarkColorMode } = React.useContext(ReactBricksContext)
  return (
    <a href={!isAdmin && link} target="_blank" rel="noopener noreferrer"
      className="flex justify-center items-center text-gray-300"
      {...rest}
    >
      <Image
        noLazyLoad={false}
        propName="image"
        alt="customer"
        imageClassName="w-[190px] h-full"
        imageStyle={
          grayscale
            ? isDarkColorMode
              ? { filter: 'opacity(1) grayscale(100%) invert(1)' } //grayscale and darkmode
              : { filter: 'opacity(1) grayscale(100%)' } //only grayscale
            : {}
        }
      />
    </a>
  )
}

VRBCustomer.schema = {
  name: blockNames.Customer,
  label: 'Customer',
  category: 'vidya elements',
  hideFromAddMenu: true,
  playgroundLinkLabel: 'View source code on Github',
  playgroundLinkUrl:
    'https://github.com/ReactBricks/react-bricks-ui/blob/master/src/website/Customers/CustomerItem.tsx',

  getDefaultProps: () => ({
    image: {
      src:
        'https://images.reactbricks.com/original/3c4b1f31-16ec-417f-ab2d-d734632bdeb8.svg',
      placeholderSrc:
        'https://images.reactbricks.com/original/3c4b1f31-16ec-417f-ab2d-d734632bdeb8.svg',
      srcSet: '',
      alt: 'React Bricks Icon',
      seoName: 'react-bricks-icon',
    },
    link: 'https://vidya.game'
  }),
  sideEditProps: [
    {
      label: 'Link',
      name: 'link',
      type: types.SideEditPropType.Text
    }
  ]
}

export default VRBCustomer