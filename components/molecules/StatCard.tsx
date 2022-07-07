import React from 'react';
import { BasicCard, IBasicCardProps } from './BasicCard';


export interface IStatCardProps extends IBasicCardProps {
  long?: boolean
}

export const StatCard: React.FC<IStatCardProps> = ({bordered=true, center, long, title, label}) => {
  return (
    <BasicCard center={center} bordered={bordered} title={title} label={label} length={long ? 'xl' : 'xs'}></BasicCard>
  )
}