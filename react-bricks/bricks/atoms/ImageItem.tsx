import * as React from 'react'
import classNames from 'classnames'
import { types, Link, Image } from 'react-bricks/frontend'
import { blockNames } from '../blockNames'

export interface ImageProps {
  image: string
  imageWidth: number
  imageHeight: number
  padding: 'normal' | 'small'
  className?: string
}

const ImageItem: types.Brick<ImageProps> = ({
  image,
  imageWidth,
  imageHeight,
  padding = 'normal',
  className,
  ...rest
}) => {
  console.log(imageWidth)
  return (
    <Link {...rest}>
      <div style={{
        width: `${imageWidth ?? 100}px`,
        height: `${imageHeight ?? 100}px`,
      }}>
        <Image propName='image' 
          alt="image"
          imageClassName={classNames("h-full mb-5 ml-5", 
          imageWidth ? `w-[${imageWidth ?? 200}px]` : 'w-[200px]',
          imageHeight ? `h-[${imageHeight ?? 200}px]` : '',
          )}
        >
        </Image>
      </div>
      </Link>
  )
}

ImageItem.schema = {
  name: blockNames.Image,
  label: 'Text',
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
        min: 100,
        max: 1000,
        step: 10,
      },
    },
    {
      name: 'imageHeight',
      label: 'Image Height',
      defaultOpen: true,
      type: types.SideEditPropType.Range,
      rangeOptions: {
        min: 100,
        max: 1000,
        step: 10,
      },
    }
  ],
}

export default ImageItem