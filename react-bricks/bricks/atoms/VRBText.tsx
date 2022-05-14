import * as React from 'react'
import classNames from 'classnames'
import { Text, types, } from 'react-bricks/frontend'
import { blockNames } from '../blockNames'
import { VText } from '@/components/atoms/VText';
import VRBRichText from './VRBRichText';

export interface VRBTextProps {
  propName: string,
  size: 'sm' | 'md' | 'lg'
  className?: string
  overrideTextColor?: boolean
}

const VRBText: types.Brick<VRBTextProps> = ({
  size,
  propName,
  className,
  overrideTextColor,
  ...rest
}) => {
  return (
    <VRBRichText
      isTitle={false}
      size={size}
      className={className}
      overrideTextColor={overrideTextColor}
      propName={propName}
    {...rest}/>
  )
}

VRBText.schema = {
  name: blockNames.Text,
  label: 'Text',
  category: 'vidya atoms',
  hideFromAddMenu: true,
  getDefaultProps: () => ({
    size: 'sm',
    overrideTextColor: false
  }),
  sideEditProps: [
    {
      name: 'size',
      label: 'Font Size',
      defaultOpen: true,
      type: types.SideEditPropType.Select,
      selectOptions: {
        display: types.OptionsDisplay.Select,
        options: [
          { label: 'Small', value: 'sm' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' },
        ],
      }
    }
  ],
}

export default VRBText