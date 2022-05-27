import Image from 'next/image';
import React from 'react';
import { VItemContainer } from '../atoms/VItemContainer';
import { Card, ICardProps } from './Card';

export const ProgramCard: React.FC<ICardProps> = ({bordered=true, title, subtitle, image, url}) => {
  // return (
  //   <VItemContainer showBorder heightSize='vsm' widthSize='vsm'></VItemContainer>
  // )
  return <Card sameType={true} bordered={bordered} title={title} subtitle={subtitle} image={image} url={url} long={true} wide={false} popoutImage={true}></Card>
}