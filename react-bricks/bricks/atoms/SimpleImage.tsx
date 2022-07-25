import * as React from 'react'
import classNames from 'classnames'
import { types, Link } from 'react-bricks/frontend'
import { blockNames } from '../blockNames'
import { VImage } from '@/components/atoms/VImage'
import { FpsFileUploader } from '../Shared/FpsFileUploader'

export interface ISimpleImageProps {
  imageSrc?: string
  imageWidth?: number | string
  imageHeight?: number | string
  imageClassName?: string
  containerClassName?: string
  className?: string
}

const SimpleImage: types.Brick<ISimpleImageProps> = ({
  imageSrc,
  imageWidth,
  imageHeight,
  className,
  imageClassName,
  containerClassName,
  ...rest
}) => {
  return (
    <Link {...rest}>
      <div className={classNames(containerClassName, 'relative w-52 h-52')}>
        <VImage src={imageSrc} width={imageWidth} height={imageHeight} className={imageClassName} layout='fill' objectFit='contain'/>
      </div>
    </Link>
  )
}

SimpleImage.schema = {
  name: blockNames.SimpleImage,
  label: 'Simple Image',
  category: 'vidya atoms',
  hideFromAddMenu: true,
  getDefaultProps: () => ({
    imageWidth: 250,
    imageHeight: 250,
    padding: 'normal',
    imgSrc: null,
  }),
  sideEditProps: [
    {
      name: 'imageSrc',
      label: 'Image Src',
      defaultOpen: true,
      type: types.SideEditPropType.Custom,
      component: (props) => FpsFileUploader({ ...props}),
    },
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

export default SimpleImage