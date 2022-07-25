import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { arrayMoveImmutable } from "array-move";
import { Link, Repeater, types, Image } from 'react-bricks/frontend'
import { classNames } from '@/common/helpers';
import { TitleType } from '@/components/atoms/VTitle';
import { blockNames } from '../blockNames';
import Column from '../Layout/Column';
import { Size } from '../Shared/additional';
import { getColumnItems, IColumnItemSettingsProp } from '../Shared/ColumnProps';
import VRBButton from './VRBButton';
import VRBLabel from './VRBLabel';
import VRBText from './VRBText';
import VRBTitle from './VRBTitle';
import { SortableItemProps, SortableListComponent } from '../Shared/sortableItem';
import VRBImage from './VRBImage';
import { VText } from '@/components/atoms/VText';

export interface VRBColumnProps {
  className?: string;
  children: React.ReactNode;
  label?: string;
  type?: TitleType,
  overrideTextColor?: boolean;
  items?: [SortableItemProps];
  initialItems?: [IColumnItemSettingsProp]
}

const VRBColumn : types.Brick<VRBColumnProps> = ({items, initialItems, overrideTextColor, type, label,  ...rest}) => {
  const renderItems = (items ?? getColumnItems(initialItems)).sort((a,b) => a.order - b.order).map((item, index) => {
    return {
      ...item,
      content: item.type === 'VRBLabel' 
      ? item.show && <VRBLabel propName={item.name} secondary={false} text={label} className="w-[110px] mb-2"></VRBLabel> 
      : item.type === 'VRBTitle' 
      ? item.show && <VRBTitle overrideTextColor={overrideTextColor} propName={item.name} type={type} className="w-full"/>
      : item.type === 'VRBText'
      ? item.show && <VRBText overrideTextColor={overrideTextColor} propName={item.name} {...item.itemProp} className="w-full"></VRBText>
      : item.type === 'VRBImage' 
      ? item.show && <VRBImage renderWrapper={({children}) => (<div className='w-full h-full min-w-[200px] min-h-[200px]'>{children}</div>)} imageHeight="100%" imageWidth="100%" propName={item.name}></VRBImage>
      : item.type === 'VRBButton'
      ? item.show && <VRBButton primary={false} secondary={false} special={false} { ...item.itemProp}>
        <VText overrideTextColor={item.itemProp?.primary === true || item.itemProp?.special === true} spacing="md" size='md'>{item.itemProp?.btnText}</VText>
      </VRBButton>
      : null
    }
  })
  return (
    <Link {...rest}>
      <Column className={classNames('text-white flex flex-wrap justify-start items-center no-underline gap-x-4 gap-y-8 pt-[0] px-[0] w-full h-full')}>
        {renderItems.sort((a, b) => a.order - b.order).filter(v=>v.show).map((item, index) =>
         <div className={classNames((item.inline || item.type ==='VRBTitle' || item.type ==='VRBText') ? 'w-full' : 'w-auto', 'flex flex-row items-center justify-start')} key={`${item.name}-${index}`}>{(item as any).content}</div>)}
        {/* {((items as any || getColumnItems(initialItems)).every(v=>!v.show)) && <div className='w-52 h-52 bg-transparent'></div>} */}
      </Column>
    </Link>
  )
}

VRBColumn.schema = {
  name: blockNames.Column,
  label: 'Column',
  category: 'vidya atoms',
  hideFromAddMenu: true,
  getDefaultProps: () => ({
    initialItems: [
      {
        type: blockNames.Button,
        name: `btn_0`,
        show: true,
        order: 0,
        inline: false,
        itemProp: {},
      }
    ],
    items: [
      {
        type: blockNames.Button,
        name: `btn_0`,
        show: true,
        order: 0,
        inline: false,
        itemProp: {},
      }
    ],
    size: 'sm',
    type: 'h2',
  }),
  sideEditProps: [
    {
      name: 'type',
      label: 'Title Type',
      defaultOpen: true,
      type: types.SideEditPropType.Select,
      selectOptions: {
        display: types.OptionsDisplay.Select,
        options: [
          { label: 'H1 Heading', value: 'h1' },
          { label: 'H2 Heading', value: 'h2' },
          { label: 'H3 Heading', value: 'h3' },
          { label: 'H4 Heading', value: 'h4' },
          { label: 'H5 Heading', value: 'h5' },
          { label: 'H6 Heading', value: 'h6' },
        ],
      }
    },
    {
      name: 'items',
      label: 'Items',
      type: types.SideEditPropType.Custom,
      component: (props) => SortableListComponent({ itemProps: [
        {
          name: blockNames.Text,
          propName: 'size',
          label: 'Font Size',
          type: types.SideEditPropType.Select,
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' }, 
            { label: 'X Large', value: 'xl' }, 
          ]
        },
        {
          name: blockNames.Button,
          propName: 'btnLink',
          label: 'Button Link',
          type: types.SideEditPropType.Text
        },
        {
          name: blockNames.Button,
          propName: 'btnText',
          label: 'Button Text',
          type: types.SideEditPropType.Text
        },
        {
          name: blockNames.Button,
          propName: 'primary',
          label: 'Button',
          type: types.SideEditPropType.Boolean,
        },
        {
          name: blockNames.Button,
          propName: 'secondary',
          label: 'Button',
          type: types.SideEditPropType.Boolean,
        },
        {
          name: blockNames.Button,
          propName: 'special',
          label: 'Button',
          type: types.SideEditPropType.Boolean,
        }
    ], props, maxAddPerItem: 3}),
    },
  ],
}

export default VRBColumn;