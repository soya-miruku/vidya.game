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
      }} className="max-w-[130px] max-h-[130px] sm:max-w-[350px] sm:max-h-[350px]">
        <Image propName='image' 
          alt="image"
          imageStyle={{
            width: `${imageWidth ?? 100}px`,
            height: `${imageHeight ?? 100}px`,
          }}
          imageClassName={classNames("h-full mb-5 max-w-[130px] max-h-[130px] sm:max-w-[350px] sm:max-h-[350px]", 
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

export default ImageItem