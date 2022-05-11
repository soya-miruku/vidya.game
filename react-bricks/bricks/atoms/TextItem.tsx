import * as React from 'react'
import classNames from 'classnames'
import { Text, types, Link, RichText } from 'react-bricks/frontend'
import { blockNames } from '../blockNames'
import { VText } from '../../../components/VText'

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
            <VText className="text-center" {...props.attributes}>
              {props.children}
            </VText>
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
  name: blockNames.RichText,
  label: 'Rich Text',
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