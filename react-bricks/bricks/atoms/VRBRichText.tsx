import * as React from 'react'
import classNames from 'classnames'
import { RichTextExt, types, Link, RichText, plugins, markPluginConstructor, blockPluginConstructor, useAdminContext } from 'react-bricks/frontend'
import { blockNames } from '../blockNames'
import { VText } from '@/components/atoms/VText'
import { TitleType, VTitle } from '@/components/atoms/VTitle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDollarToSlot, faIcons, faParagraph, faSquare } from '@fortawesome/pro-regular-svg-icons'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

export interface VRBRichTextProps {
  text?: string
  href?: string
  fontSize?: number
  fontColor?: string
  className?: string,
  overrideTextColor?: boolean
  type?: TitleType
  textAlign?: AlignSetting
  size?: 'sm' | 'md' | 'lg' | 'xl'
  propName: string
  isTitle?: boolean
  spacing?: 'sm' | 'md' | 'lg' 
}

export const DefinedPlugins = () => {
  const { bold, italic, unorderedList, link, quote, heading1, heading2, heading3, heading4, heading5, heading6, highlight, code } = plugins
  return [
    markPluginConstructor({
      name: 'drop-shadow',
      hotKey: 'mod+s+h',
      render: (props) => <span style={{textShadow: '1px 1px 9px #000'}} className="inline">{props.children}</span>,
      icon: <FontAwesomeIcon className='text-light-200 w-5 h-5' icon={faSquare} />,
      
    }),
    markPluginConstructor({
      name: 'arcade-classic-font',
      hotKey: 'mod+s+i',
      render: (props) => <span style={{fontFamily: 'arcade-classic'}} className="inline">{props.children}</span>,
      icon: <FontAwesomeIcon className='text-light-200 w-5 h-5' icon={faIcons} />,
    }),
    markPluginConstructor({
      name: 'white',
      hotKey: 'mod+w',
      render: (props) => <strong className='text-light-200'>{props.children}</strong>,
      icon: <FontAwesomeIcon className='text-light-200 w-5 h-5' icon={faCircle}></FontAwesomeIcon>
    }),
    markPluginConstructor({
      name: 'teal',
      hotKey: 'mod+t',
      render: (props) => <strong className='text-aimbotsGreen-100'>{props.children}</strong>,
      icon: <FontAwesomeIcon className='text-aimbotsGreen-100 w-5 h-5' icon={faCircle}></FontAwesomeIcon>
    }),
    markPluginConstructor({
      name: 'red',
      hotKey: 'mod+r',
      render: (props) => <strong className='text-aimbotsRed-100'>{props.children}</strong>,
      icon: <FontAwesomeIcon className='text-aimbotsRed-100 w-5 h-5' icon={faCircle}></FontAwesomeIcon>
    }),
    markPluginConstructor({
      name: 'primary',
      hotKey: 'mod+alt+p',
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
  ]
}

const VRBRichText: types.Brick<VRBRichTextProps> = ({
  text,
  href,
  fontSize,
  fontColor,
  className,
  overrideTextColor,
  type,
  spacing,
  size,
  isTitle=false,
  textAlign,
  propName,
  ...rest
}) => {
  const aRef = React.useRef<HTMLAnchorElement>(null);

  React.useEffect(() => {
    if(!aRef.current) return;
    const child: any = aRef?.current?.children[0];
    if(!child) return;
    child.style.width = '100%';
  }, [aRef.current])

  return (
    <>
    <a ref={aRef} {...rest} className={classNames('w-full flex flex-col', textAlign === 'center' ? 'items-center justify-center text-center' : textAlign === 'end' ? 'items-end justify-end text-right' : 'items-start justify-start text-left')}>
      <RichTextExt
      plugins={DefinedPlugins()}   
      propName={propName || 'richtext'}
      renderBlock={(props: any) => {
        return (
        isTitle 
        ? 
        <VTitle type={type} overrideTextColor={overrideTextColor} className={className} {...props.attributes}>
          {props.children}
        </VTitle> 
        : <VText spacing={spacing} size={size} overrideTextColor={overrideTextColor} fontSize={fontSize} fontColor={fontColor} className={className} {...props.attributes}>{props.children}</VText>
      )}}
      placeholder="Type a text..."
      
    />
    </a>
    </>
  )
}

VRBRichText.schema = {
  name: blockNames.RichText,
  label: 'Rich Text',
  category: 'vidya elements',
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