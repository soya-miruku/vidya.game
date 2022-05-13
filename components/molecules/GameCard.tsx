import React from 'react';
import { Card, ICardProps } from './Card';

export const GameCard: React.FC<ICardProps> = ({label, title, subtitle, image, url}) => {
  return <Card label={label} title={title} subtitle={subtitle} image={image} url={url} long={true} wide={false}></Card>
}