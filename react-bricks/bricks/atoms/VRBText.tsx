import * as React from 'react'
import classNames from 'classnames'
import { Text, types, Link } from 'react-bricks/frontend'
import { blockNames } from '../blockNames'
import { VText } from '@/components/atoms/VText';
import VRBRichText from './VRBRichText';

export interface VRBTextProps {
  propName: string,
  size: 'sm' | 'md' | 'lg'
  className?: string
  overrideTextColor?: boolean
  spacing?: 'sm' | 'md' | 'lg'
}

const VRBText: types.Brick<VRBTextProps> = ({
  size,
  propName,
  className,
  spacing,
  overrideTextColor,
  ...rest
}) => {
  return (
    <div className='w-full'>
      <VRBRichText
        spacing={spacing}
        isTitle={false}
        size={size}
        className={className}
        overrideTextColor={overrideTextColor}
        propName={propName}
      {...rest}/>
    </div>
  )
}

VRBText.schema = {
  name: blockNames.Text,
  label: 'Text',
  category: 'vidya atoms',
  hideFromAddMenu: true,
  getDefaultProps: () => ({
    size: 'sm',
    overrideTextColor: false,

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