import React from 'react';
import { BasicCard, IBasicCardProps } from './BasicCard';


export const StatCard: React.FC<IBasicCardProps> = ({bordered=true, title, label}) => {
  return (
    <BasicCard center bordered={bordered} title={title} label={label}></BasicCard>
  )
}