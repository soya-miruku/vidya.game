import React from 'react';
import { Card, ICardProps } from './Card';

export const BlogCard: React.FC<ICardProps> = ({bordered=true, label, title, subtitle, footer, image, placeholderSrc, url, avatar}) => {
  return <Card bordered={bordered} label={label} title={title} subtitle={subtitle} footer={footer} image={image} url={url} avatar={avatar || '/placeholders/img.png'} long={false} wide={false}></Card>
}