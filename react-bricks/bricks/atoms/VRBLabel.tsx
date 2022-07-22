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
  className?: string,
  hasBg?: boolean,
}

const VRBLabel: types.Brick<VRBLabelProps> = ({
  secondary,
  propName,
  label,
  className,
  hasBg,
  ...rest
}) => {
  return (
    <Link {...rest}>
      <VLabel padding className={className} secondary={secondary} overrideColors={hasBg}>
        <VRBText propName={blockNames.Label} size="md" overrideTextColor={hasBg}>
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