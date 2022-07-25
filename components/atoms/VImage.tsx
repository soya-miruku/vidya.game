import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { classNames } from '@/common/helpers';
import { useIsMounted } from '@/hooks/useIsMounted';

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
  placeholder?: string;
  usePlaceholder?: boolean;
}

export const VImage: React.FC<IVImageProps> = ({src, alt, loader, priority, loading="eager", className, style, width, height, placeholder, usePlaceholder=true, objectFit, layout, ...rest}) => {
  const { isMounted } = useIsMounted();
  const [errorImage, setErrorImage] = useState(false);
  const placeholderUrl = `/placeholders/img.png`;
  const url = errorImage ? placeholderUrl : src;

  if(!isMounted) return null;

  return (
    <Image
      onError={(e) => {
        e.preventDefault();
        setErrorImage(true);
      }}
      placeholder={usePlaceholder && placeholder ? 'blur' : 'empty'}
      blurDataURL={placeholder}
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
      className={classNames(className)}
      {...rest}
    />
  );
};