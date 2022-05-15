import * as React from 'react'
import classNames from 'classnames'
import { Link, types } from 'react-bricks/frontend'
import { blockNames } from '../blockNames'
import { VButton, ButtonProps } from '@/components/atoms/VButton'
import { VText } from '@/components/atoms/VText'


const VRBButton: types.Brick<ButtonProps> = ({
  children:text,
  primary=true,
  special,
  secondary,
  onClick,
  rounded,
  ...rest
}) => {
  return (
    <Link {...rest}>
      <div>
        <VButton primary={primary} special={special} secondary={secondary} rounded={rounded}>
          {typeof(text) === 'string' ?<VText size='sm' overrideTextColor={true}>
            {text}
          </VText>
        :text  }
        </VButton>
      </div>
    </Link>
  )
}

VRBButton.schema = {
  name: blockNames.Button,
  label: 'Button',
  category: 'vidya atoms',
  hideFromAddMenu: true,
  getDefaultProps: () => ({
    children: 'Something',
    rounded: true,
    primary: true,
    special: false,
    secondary: false,

  }),
  sideEditProps: [
    {
      name: 'children',
      label: 'Button text',
      type: types.SideEditPropType.Text,
    },
    {
      name: 'primary',
      label: 'Primary',
      type: types.SideEditPropType.Boolean,
    },
    {
      name: 'special',
      label: 'Special',
      type: types.SideEditPropType.Boolean,
    },
    {
      name: 'secondary',
      label: 'Secondary',
      type: types.SideEditPropType.Boolean,
    },
    {
      name: 'rounded',
      label: 'Rounded',
      type: types.SideEditPropType.Boolean,
    }
  ],
}

export default VRBButton