import * as React from 'react'
import classNames from 'classnames'
import { Link, types, } from 'react-bricks/frontend'
import { blockNames } from '../blockNames'
import { VText } from '@/components/atoms/VText'
import { VLabel } from '@/components/atoms/VLabel'
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
    <Link {...rest}>
      <VLabel className={className} secondary={secondary}>
        <VRBText propName={blockNames.Label} size="sm" >
          {label}
        </VRBText>
      </VLabel>
    </Link>
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