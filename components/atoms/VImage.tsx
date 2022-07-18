import React, { useEffect, useState } from 'react';
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
  loading?: "eager" | "lazy";
  loader?: any;
  rest?: any;
  priority?: boolean;
}

export const VImage: React.FC<IVImageProps> = ({src, alt, loader, priority, loading="eager", className, style, width, height, objectFit, layout, ...rest}) => {
  const [errorImage, setErrorImage] = useState(false);
  const placeholderUrl = `/placeholders/img.png`;
  const url = errorImage ? placeholderUrl : src;

  useEffect(() => {
    return () => {
      setErrorImage(false);
    }
  }, []);

  return (
    <Image
      onError={(e) => {
        e.preventDefault();
        setErrorImage(true);
      }}
      placeholder='blur'
      blurDataURL={placeholderUrl}
      src={url || placeholderUrl}
      width={width}
      style={style}
      height={height}
      alt={alt || 'image'}
      layout={layout}
      objectFit={objectFit}
      loading={loading}
      priority={priority}
      loader={loader}
      className={classNames(className, '')}
      {...rest}
    />
  );
};