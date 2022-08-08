import * as React from 'react'
import classNames from 'classnames'
import { Link, types, } from 'react-bricks/frontend'
import { blockNames } from '../blockNames'
import { VText } from '@/components/atoms/VText'
import { VLabel } from '@/components/atoms/VLabel'
import VRBText from './VRBText'

export interface VRBLabelProps {
  propName: string,
  text: string,
  secondary: boolean,
  className?: string,
  hasBg?: boolean,
}

const VRBLabel: types.Brick<VRBLabelProps> = ({
  secondary,
  propName,
  text,
  className,
  hasBg,
  ...rest
}) => {
  return (
    <Link {...rest}>
      <VLabel padding={!secondary} className={className} secondary={secondary} overrideColors={hasBg}>
        {text}
      </VLabel>
    </Link>
  )
}

VRBLabel.schema = {
  name: blockNames.Label,
  label: 'Label',
  category: 'vidya elements',
  hideFromAddMenu: true,
  getDefaultProps: () => ({
    secondary: false,
    label: 'LABEL',
  }),
  sideEditProps: [
    {
      name: 'secondary',
      label: 'Is Secondary?',
      defaultOpen: true,
      type: types.SideEditPropType.Boolean
    },
    {
      name: 'text',
      label: 'Text',
      type: types.SideEditPropType.Text
    }
  ],
}

export default VRBLabel