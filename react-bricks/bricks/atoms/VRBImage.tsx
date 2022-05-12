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
  containerClassName?: string
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
  propName,
  containerClassName,
  ...rest
}) => {
  return (
    <Link {...rest}>
        <Image propName={propName || 'image'} 
          alt="image"
          containerClassName={containerClassName}
          imageClassName={classNames(imageClassName ? imageClassName : "h-full mb-5 ml-2")}
        >
        </Image>
      {/* <div 
      style={{
        width: `${ typeof(imageWidth) === 'string' ? `${imageWidth}` : `${imageWidth ?? 100}px`}`,
        height: `${ typeof(imageHeight) === 'string' ? `${imageHeight}` : `${imageHeight ?? 100}px`}`,
      }} 
      className="w-full h-full flex justify-end z-10">

      </div> */}
      </Link>
  )
}

VRBImage.schema = {
  name: blockNames.Image,
  label: 'Imagfe',
  category: 'vidya atoms',
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