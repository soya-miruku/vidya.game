import React from 'react';
import { BasicCard, IBasicCardProps } from './BasicCard';


export interface IStatCardProps extends IBasicCardProps {
  long?: boolean
  md?: boolean
}

export const StatCard: React.FC<IStatCardProps> = ({bordered=true, center, long, md, title, label, dropShadow=true}) => {
  return (
    <BasicCard dropShadow={dropShadow} center={center} bordered={bordered} title={title} label={label} length={long ? 'xl' : md ? 'md' : 'xs'}></BasicCard>
  )
}