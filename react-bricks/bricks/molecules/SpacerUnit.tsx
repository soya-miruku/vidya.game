import React, { useEffect } from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { classNames } from '@/common/helpers'
import { blockNames } from '../blockNames'
import { useDetectDeviceSize } from 'hooks/useDetectIsMobileView';

interface ISpacerUnitProps {
  size?: 'lgr' | 'med' | 'sm';
}

const SpacerUnit: types.Brick<ISpacerUnitProps> = ({ size }) => {
  const { isMobileView, isTabletView} = useDetectDeviceSize();

  if(isMobileView && !isTabletView) {
    return (
      <div className={classNames('w-full', size === 'lgr' ? 'h-[50px]' :  size === 'med' ? 'h-[25px]' : 'h-[10px]')}/>
    )
  }
  else if(isTabletView) {
    return (
      <div className={classNames('w-full', size === 'lgr' ? 'h-[100px]' : size === 'med' ? 'h-[50px]' : 'h-[25px]')}/>
    )
  }
  else {
    return (
      <div className={classNames('w-full', size === 'lgr' ? 'h-[200px]' : size === 'med' ? 'h-[100px]' :  'h-[50px]')}/>
    )
  }
}

SpacerUnit.schema = {
  name: blockNames.SpacerUnit,
  label: 'Spacer Unit',
  category: 'TeamOs-Basics',

  getDefaultProps: () => ({
    size: 'lgr'
  }),
  sideEditProps: [
    {
      name: 'size',
      label: 'Size',
      type: types.SideEditPropType.Select,
      defaultOpen: true,
      selectOptions: {
        display: types.OptionsDisplay.Select,
        options: [
          { label: 'LGR', value: 'lgr' },
          { label: 'MED', value: 'med' },
          { label: 'SM', value: 'sm' },
        ],
      }
    }
  ],
}

export default SpacerUnit
