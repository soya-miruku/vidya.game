import React from 'react';
import { Card, ICardProps } from './Card';

export const ProgramCard: React.FC<ICardProps> = ({title, subtitle, image, url}) => {
  return <Card title={title} subtitle={subtitle} image={image} url={url} long={true} wide={false}></Card>
}