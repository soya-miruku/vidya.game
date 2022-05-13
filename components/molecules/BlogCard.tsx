import React from 'react';
import { Card, ICardProps } from './Card';

export const BlogCard: React.FC<ICardProps> = ({label, title, subtitle, footer, image, url, avatar}) => {
  return <Card label={label} title={title} subtitle={subtitle} footer={footer} image={image} url={url} avatar={avatar || '/placeholders/img.png'} long={false} wide={false}></Card>
}