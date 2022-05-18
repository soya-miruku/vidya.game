import { classNames } from '@/common/helpers'
import { IconCard } from '@/components/molecules/IconCard'
import * as React from 'react'
import { types, Link } from 'react-bricks/frontend'
import { blockNames } from '../blockNames'

export interface IVRBIconCardProps {
  icon?:string,
  bordered?: boolean
  label?: string
}

const VRBIconCard: types.Brick<IVRBIconCardProps> = ({
  icon,
  bordered = true,
  label,
  ...rest
}) => {
  return (
    <Link {...rest}>
      <IconCard icon={<i className={classNames(icon, 'text-[5rem]')}></i>} label={label} bordered={bordered} />
    </Link>
  )
}

VRBIconCard.schema = {
  name: blockNames.IconCard,
  label: 'Icon Card',
  category: 'vidya atoms',
  hideFromAddMenu: true,
  getDefaultProps: () => ({
    bordered: true,
    label: 'LABEL',
    icon: '-ic-darkmode'
  }),
  sideEditProps: [
    {
      name: 'icon',
      label: 'Icon',
      defaultOpen: true,
      type: types.SideEditPropType.Select,
      selectOptions: {
        display: types.OptionsDisplay.Select,
        options: [
          {
            label: '-ic-darkmode',
            value: '-ic-darkmode'
          },
          {
            label: '-ic-lightmode',
            value: '-ic-lightmode'
          }
        ]
      }
    },
    {
      name: 'label',
      label: 'Label',
      defaultOpen: true,
      type: types.SideEditPropType.Text
    },
    {
      name: 'bordered',
      label: 'Bordered',
      defaultOpen: true,
      type: types.SideEditPropType.Boolean
    }
  ],
}

export default VRBIconCard