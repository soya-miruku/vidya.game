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
            label: 'darkmode',
            value: '-ic-darkmode'
          },
          {
            label: 'lightmode',
            value: '-ic-lightmode'
          },
          {
            label: 'swap',
            value: '-ic-swap'
          },
          {
            label: 'menu',
            value: '-ic-menu'
          },
          {
            label: 'close',
            value: '-ic-close'
          },
          {
            label: 'settings',
            value: '-ic-settings'
          },
          {
            label: 'up-arrow',
            value: '-ic-up-arrow'
          },
          {
            label: 'down-arrow',
            value: '-ic-down-arrow'
          },
          {
            label: 'chevron',
            value: '-ic-chevron'
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