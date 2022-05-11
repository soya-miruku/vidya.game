import * as React from 'react'
import classNames from 'classnames'
import { Text, types, } from 'react-bricks/frontend'
import { blockNames } from '../blockNames'
import { VText } from '../../../components/VText'
import { VLabel } from '../../../components/VLabel'
import VRBText from './VRBText'

export interface VRBLabelProps {
  propName: string,
  label: string,
  secondary: boolean,
  className?: string
}

const VRBLabel: types.Brick<VRBLabelProps> = ({
  secondary,
  propName,
  label,
  className,
  ...rest
}) => {
  return (
    <VLabel className={className} secondary={secondary} {...rest}>
      <VRBText propName={blockNames.Label} size="sm" >
        {label}
      </VRBText>
    </VLabel>
  )
}

VRBLabel.schema = {
  name: blockNames.Label,
  label: 'Label',
  category: 'vidya atoms',
  hideFromAddMenu: true,
  getDefaultProps: () => ({
    secondary: false,
  }),
  sideEditProps: [
    {
      name: 'secondary',
      label: 'Is Secondary?',
      defaultOpen: true,
      type: types.SideEditPropType.Boolean
    }
  ],
}

export default VRBLabel