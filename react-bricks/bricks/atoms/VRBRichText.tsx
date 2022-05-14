import * as React from 'react'
import classNames from 'classnames'
import { RichTextExt, types, Link, RichText, plugins, markPluginConstructor, blockPluginConstructor } from 'react-bricks/frontend'
import { blockNames } from '../blockNames'
import { VText } from '@/components/atoms/VText'
import { VTitle } from '@/components/atoms/VTitle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDollarToSlot, faSquare } from '@fortawesome/pro-regular-svg-icons'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

export interface VRBRichTextProps {
  text?: string
  href?: string
  fontSize?: number
  fontColor?: string
  className?: string,
  overrideTextColor?: boolean
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size?: 'sm' | 'md' | 'lg'
  propName: string
  isTitle?: boolean
}

const VRBRichText: types.Brick<VRBRichTextProps> = ({
  text,
  href,
  fontSize,
  fontColor,
  className,
  overrideTextColor,
  type,
  size,
  isTitle=false,
  propName,
  ...rest
}) => {
  const { bold, italic, unorderedList, link, quote, heading1, heading2, heading3, heading4, heading5, heading6, highlight, code } = plugins

  return (
    <Link {...rest}>
      <RichTextExt
          plugins={[
            markPluginConstructor({
              name: 'drop-shadow',
              hotKey: 'mod+s+h',
              render: (props) => <h1 style={{textShadow: '1px 1px 9px #000'}} className="inline">{props.children}</h1>,
              icon: <FontAwesomeIcon className='text-true-light-200 w-5 h-5' icon={faSquare} />,
            }),
            markPluginConstructor({
              name: 'teal',
              hotKey: 'mod+r',
              render: (props) => <strong className='text-true-teal-100'>{props.children}</strong>,
              icon: <FontAwesomeIcon className='text-true-teal-100 w-5 h-5' icon={faCircle}></FontAwesomeIcon>
            }),
            markPluginConstructor({
              name: 'red',
              hotKey: 'mod+r',
              render: (props) => <strong className='text-true-red-100'>{props.children}</strong>,
              icon: <FontAwesomeIcon className='text-true-red-100 w-5 h-5' icon={faCircle}></FontAwesomeIcon>
            }),
            markPluginConstructor({
              name: 'primary',
              hotKey: 'mod+r',
              render: (props) => <strong className='text-primary-100'>{props.children}</strong>,
              icon: <FontAwesomeIcon className='text-primary-100 w-5 h-5' icon={faCircle}></FontAwesomeIcon>
            }),
            markPluginConstructor({
              name: 'peach',
              hotKey: 'mod+r',
              render: (props) => <strong className='text-tertiary-100'>{props.children}</strong>,
              icon: <FontAwesomeIcon className='text-tertiary-100 w-5 h-5' icon={faCircle}></FontAwesomeIcon>
            }),
            {
              ...bold,
              renderElement: ({children, attributes}) => {
                return(
                  <b className="font-bold text-gray-900" {...attributes}>
                    {children}
                  </b>
                )
              }
            },
            italic, 
            unorderedList, 
            link, 
            quote, 
            heading1, 
            heading2, 
            heading3, 
            heading4,
            heading5,
            heading6,
            highlight,
            code
          ]}
          propName={propName}
          renderBlock={(props: any) => (
            isTitle 
            ? 
            <VTitle type={type} overrideTextColor={overrideTextColor} className={className} {...props.attributes}>
              {props.children}
            </VTitle> 
            : <VText size={size} overrideTextColor={overrideTextColor} fontSize={fontSize} fontColor={fontColor} className={className} {...props.attributes}>{props.children}</VText>
          )}
          placeholder="Type a text..."
        />
      </Link>
  )
}

VRBRichText.schema = {
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

export default VRBRichText