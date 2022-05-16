import React from 'react';
import { Card, ICardProps } from './Card';

export const BlogCard: React.FC<ICardProps> = ({bordered=true, label, title, subtitle, footer, image, url, avatar}) => {
  console.log(image, 'image')
  return <Card bordered={bordered} label={label} title={title} subtitle={subtitle} footer={footer} image={image} url={url} avatar={avatar || '/placeholders/img.png'} long={false} wide={false}></Card>
}