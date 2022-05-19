import { classNames } from '@/common/helpers'
import { StatCard } from '@/components/molecules/StatCard'
import * as React from 'react'
import { types, Link } from 'react-bricks/frontend'
import { blockNames } from '../blockNames'

export interface IVRBDetailCardProps {
  bordered?: boolean
  label?: string
  title?: string
}

const VRBDetailCard: types.Brick<IVRBDetailCardProps> = ({
  bordered = true,
  label,
  title,
  ...rest
}) => {
  return (
    <Link {...rest}>
      <StatCard title={title} label={label} bordered={bordered} />
    </Link>
  )
}

VRBDetailCard.schema = {
  name: blockNames.DetailCard,
  label: 'Detail Card',
  category: 'vidya atoms',
  hideFromAddMenu: true,
  getDefaultProps: () => ({
    bordered: true,
    label: 'LABEL',
    title: 'TITLE'
  }),
  sideEditProps: [
    {
      name: 'bordered',
      label: 'Bordered',
      type: types.SideEditPropType.Boolean,
    },
    {
      name: 'label',
      label: 'LABEL',
      type: types.SideEditPropType.Text,
    },
    {
      name: 'title',
      label: 'Title',
      type: types.SideEditPropType.Text,
    }
  ],
}

export default VRBDetailCard