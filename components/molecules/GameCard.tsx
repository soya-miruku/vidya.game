import React from 'react';
import { Card, ICardProps } from './Card';

export const GameCard: React.FC<ICardProps> = ({bordered=true, label, title, subtitle, image, url}) => {
  return <Card bordered={bordered} label={label} title={title} subtitle={subtitle} image={image} url={url} long={true} wide={false}></Card>
}