import * as React from 'react'
import classNames from 'classnames'
import { Text, types, Link, RichText } from 'react-bricks/frontend'
import { blockNames } from '../blockNames'

export interface TextProps {
  text: string
  href: string
  fontSize: number
  fontColor: string
  className?: string
}

const TextItem: types.Brick<TextProps> = ({
  text,
  href,
  fontSize,
  fontColor,
  className,
  ...rest
}) => {
  return (
    <Link {...rest}>
      <RichText
          renderBlock={(props: any) => (
            <p style={{ 
              fontSize: `${fontSize ?? 12}px`,
              color: fontColor,
            }} className="text-center" {...props.attributes}>
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
    fontSize: 16,
    fontColor: '#000',
  }),
  sideEditProps: [
    {
      name: 'fontSize',
      label: 'Font size',
      defaultOpen: true,
      type: types.SideEditPropType.Range,
      rangeOptions: {
        min: 10,
        max: 100,
        step: 1,
      }
    },
    {
      name: 'fontColor',
      label: 'Font color',
      defaultOpen: true,
      type: types.SideEditPropType.Select,
      selectOptions: {
        display: types.OptionsDisplay.Color,
      }
    }
  ],
}

export default TextItem