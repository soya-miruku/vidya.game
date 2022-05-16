import React, { useState } from 'react';

export interface ITabsProps {
  children?: React.ReactNode;
}

export interface ITabProps {
  label?: string;
  active?: boolean;
}

export const VTab: React.FC<ITabProps> = ({ label, active }) => {
  return (
    <div></div>
  )
}

export const VTabs: React.FC<ITabsProps> = ({ children }) => {
  return (
    <div className='flex w-full gap-x-2'>

    </div>
  )
}