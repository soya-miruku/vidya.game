import * as React from 'react'
import classNames from 'classnames'
import { Text, types, Link, RichText } from 'react-bricks/frontend'
import { blockNames } from '../blockNames'

export interface TextProps {
  text: string
  href: string
  isTargetBlank: boolean
  isBigButton: boolean
  variant?: 'pink' | 'azure'
  type?: 'solid' | 'outline'
  padding: 'normal' | 'small'
  className?: string
}

const TextItem: types.Brick<TextProps> = ({
  text,
  href,
  isTargetBlank = false,
  isBigButton = false,
  variant = 'pink',
  type = 'solid',
  padding = 'normale',
  className,
  ...rest
}) => {
  return (
    <Link {...rest}>
      <RichText
          renderBlock={(props: any) => (
            <p className=" text-center" {...props.attributes}>
              {props.children}
            </p>
          )}
          placeholder="Type a text..."
          propName="text"
          allowedFeatures={[
            types.RichTextFeatures.Bold,
            types.RichTextFeatures.Italic,
            types.RichTextFeatures.Code,
            types.RichTextFeatures.Highlight,
            types.RichTextFeatures.Link,
            types.RichTextFeatures.UnorderedList,
            types.RichTextFeatures.Quote,
          ]}
          renderBold={({ children, attributes }) => (
            <b className="font-bold text-gray-900" {...attributes}>
              {children}
            </b>
          )}
        />
      </Link>
  )
}

TextItem.schema = {
  name: blockNames.Text,
  label: 'Text',
  category: 'vidya atoms',
  hideFromAddMenu: true,
  getDefaultProps: () => ({
    fontSize: '16',
  }),
  sideEditProps: [
    {
      name: 'fontSize',
      label: 'Font size',
      defaultOpen: true,
      type: types.SideEditPropType.Number
    },
  ],
}

export default TextItem