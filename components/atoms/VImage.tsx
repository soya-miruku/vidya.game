import React, { useState } from 'react';
import Image from 'next/image';
import { classNames } from '@/common/helpers';

export interface IVImageProps {
  src?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: string | number;
  height?: string | number;
  layout?: "fill" | "fixed" | "intrinsic" | "responsive";
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  rest?: any;
}

export const VImage: React.FC<IVImageProps> = ({src, alt, className, style, width, height, objectFit, layout, ...rest}) => {
  const [errorImage, setErrorImage] = useState(false);
  const placeholderUrl = `/placeholders/img.png`;
  console.log(src);
  const url = errorImage ? placeholderUrl : src;
  return (
    <Image
      onError={(e) => setErrorImage(true)}
      placeholder='empty'
      blurDataURL={placeholderUrl}
      src={url || placeholderUrl}
      width={width}
      style={style}
      height={height}
      alt={alt || 'image'}
      layout={layout}
      objectFit={objectFit}
      className={classNames(className ? className : '')}
    />
  );
};