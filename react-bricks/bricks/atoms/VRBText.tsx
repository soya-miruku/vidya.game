import * as React from 'react'
import { types } from 'react-bricks/frontend'
import { blockNames } from '../blockNames'
import VRBRichText from './VRBRichText';

export interface VRBTextProps {
  propName: string,
  size: 'sm' | 'md' | 'lg'
  textAlign?: AlignSetting
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
  textAlign,
  ...rest
}) => {
  return (
    <div className='w-full'>
      <VRBRichText
        textAlign={textAlign}
        spacing={spacing}
        isTitle={false}
        size={size}
        className={className}
        overrideTextColor={overrideTextColor}
        propName={propName || 'text'}
      {...rest}/>
    </div>
  )
}

VRBText.schema = {
  name: blockNames.Text,
  label: 'Text',
  category: 'vidya elements',
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