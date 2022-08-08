import * as React from 'react'
import classNames from 'classnames'
import { types, Link, Image } from 'react-bricks/frontend'
import { blockNames } from '../blockNames'

export interface ImageProps {
  image?: string
  imageWidth?: number | string
  propName: string
  imageHeight?: number | string
  imageClassName?: string
  imageStyle?: React.CSSProperties
  containerClassName?: string
  renderWrapper?:any
  padding?: 'normal' | 'small'
  className?: string
}

const VRBImage: types.Brick<ImageProps> = ({
  image,
  imageWidth,
  imageHeight,
  padding = 'normal',
  className,
  imageClassName,
  imageStyle,
  propName,
  renderWrapper,
  ...rest
}) => {
  return (
    <Link {...rest}>
      <Image 
        noLazyLoad={false} propName={propName || 'image'}
        useNativeLazyLoading
        useWebP
        alt="image"
        renderWrapper={renderWrapper}
        imageClassName={classNames(imageClassName ? imageClassName : "h-full mb-5 ml-2")}
        imageStyle={imageStyle ? imageStyle : {
          width: `${imageWidth}`,
          height: `${imageHeight}`,
        }}
      >
      </Image>
    </Link>
  )
}

VRBImage.schema = {
  name: blockNames.Image,
  label: 'Image',
  category: 'vidya elements',
  hideFromAddMenu: true,
  getDefaultProps: () => ({
    imageWidth: 250,
    imageHeight: 250,
    padding: 'normal',

  }),
  sideEditProps: [
    {
      name: 'imageWidth',
      label: 'Image Width',
      defaultOpen: true,
      type: types.SideEditPropType.Range,
      rangeOptions: {
        min: 50,
        max: 350,
        step: 10,
      },
    },
    {
      name: 'imageHeight',
      label: 'Image Height',
      defaultOpen: true,
      type: types.SideEditPropType.Range,
      rangeOptions: {
        min: 50,
        max: 350,
        step: 10,
      },
    }
  ],
}

export default VRBImage