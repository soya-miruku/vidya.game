import { classNames } from '@/common/helpers'
import { IconCard } from '@/components/molecules/IconCard'
import * as React from 'react'
import { types, Link } from 'react-bricks/frontend'
import { blockNames } from '../blockNames'

export interface IVRBPriceCardProps {
  icon?:string,
  bordered?: boolean
  label?: string
}

const VRBPriceCard: types.Brick<IVRBPriceCardProps> = ({
  icon,
  bordered = true,
  label,
  ...rest
}) => {
  return (
    <Link {...rest}>
      <IconCard icon={<i className={classNames(icon)}></i>} label={label} bordered={bordered} />
    </Link>
  )
}

VRBPriceCard.schema = {
  name: blockNames.PriceCard,
  label: 'Price Card',
  category: 'vidya elements',
  hideFromAddMenu: true,
  getDefaultProps: () => ({
    bordered: true,
    label: 'LABEL',
    icon: '-ic-darkmode'
  }),
  sideEditProps: [

  ],
}

export default VRBPriceCard