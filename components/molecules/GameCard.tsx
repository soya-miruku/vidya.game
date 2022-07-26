import React from 'react';
import { Card, ICardProps } from './Card';

export const GameCard: React.FC<ICardProps> = ({bordered=true, label, title, subtitle, placeholderSrc, image, url}) => {
  return <Card sameType={false} bordered={bordered} label={label} title={title} subtitle={subtitle} placeholderSrc={placeholderSrc} image={image} url={url} long={true} wide={false}></Card>
}