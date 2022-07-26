import { classNames } from '@/common/helpers'
import { VTitle } from '@/components/atoms/VTitle'
import { StatCard } from '@/components/molecules/StatCard'
import * as React from 'react'
import { types, Link } from 'react-bricks/frontend'
import { blockNames } from '../blockNames'

export interface IVRBDetailCardProps {
  bordered?: boolean
  label?: string
  title?: string
  center?: boolean
}

const VRBDetailCard: types.Brick<IVRBDetailCardProps> = ({
  bordered = true,
  label,
  title,
  center,
  ...rest
}) => {
  return (
    <Link {...rest}>
      <StatCard center={center} title={<VTitle className={classNames('min-h-[30px]', center ? 'w-full text-center' : '')} type='h6'>{title}</VTitle>} label={label} bordered={bordered} />
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
    title: 'TITLE',
    center: false,
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
    },
    {
      name: 'center',
      label: 'Center',
      type: types.SideEditPropType.Boolean,
    }
  ],
}

export default VRBDetailCard