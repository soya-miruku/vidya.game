import * as React from 'react'
import classNames from 'classnames'
import { Text, types, } from 'react-bricks/frontend'
import { blockNames } from '../blockNames'
import { VText } from '../../../components/VText'

export interface VRBTextProps {
  propName: string,
  size: 'sm' | 'md' | 'lg'
  className?: string
}

const VRBText: types.Brick<VRBTextProps> = ({
  size,
  propName,
  className,
  ...rest
}) => {
  return (
    <Text
      renderBlock={(props) => (
        <VText size={size} className={className}>
          {props.children}
        </VText>
      )}
      renderPlaceholder={(props) => (
        <span className="opacity-30">{props.children}</span>
      )}
      placeholder="Type text..."
      propName={propName}
    {...rest}/>
  )
}

VRBText.schema = {
  name: blockNames.Text,
  label: 'Text',
  category: 'vidya atoms',
  hideFromAddMenu: true,
  getDefaultProps: () => ({
    size: 'sm',
  }),
  sideEditProps: [
    {
      name: 'size',
      label: 'Font Size',
      defaultOpen: true,
      type: types.SideEditPropType.Select,
      selectOptions: {
        display: types.OptionsDisplay.Select,
        options: [
          { label: 'Small', value: 'sm' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' },
        ],
      }
    }
  ],
}

export default VRBText