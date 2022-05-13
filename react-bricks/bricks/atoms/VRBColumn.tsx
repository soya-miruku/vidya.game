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
import { getColumnItems } from '../Shared/ColumnProps';
import VRBButton from './VRBButton';
import VRBLabel from './VRBLabel';
import VRBText from './VRBText';
import VRBTitle from './VRBTitle';
import { SortableItemProps, SortableListComponent } from '../Shared/sortableItem';
import VRBImage from './VRBImage';

export interface VRBColumnProps {
  className?: string;
  children: React.ReactNode;
  text?: string;
  showTitle?: boolean;
  showText?: boolean;
  showBadge?: boolean;
  showImage?: boolean;
  badgeOrder?: number;
  titleOrder?: number;
  textOrder?: number;
  imageOrder?: number;
  label?: string;
  title?: string;
  size?: Size;
  type?: TitleType,
  overrideTextColor?: boolean;
  items?: [SortableItemProps]
}

const VRBColumn : types.Brick<VRBColumnProps> = ({items, overrideTextColor, badgeOrder, titleOrder, textOrder, imageOrder, size, type, label, title, showBadge, showImage, showText, showTitle, ...rest}) => {
  
  const renderItems = (items ?? getColumnItems()).sort((a,b) => a.order - b.order).map((item, index) => {
    return {
      ...item,
      content: item.type === 'VRBLabel' 
      ? item.show && <VRBLabel propName={item.name} secondary={false} label={label} className="w-[110px] mb-2"></VRBLabel> 
      : item.type === 'VRBTitle' 
      ? item.show && <VRBTitle overrideTextColor={overrideTextColor} propName={item.name} type={type}/>
      : item.type === 'VRBText'
      ? item.show && <VRBText overrideTextColor={overrideTextColor} size={size} propName={item.name}></VRBText>
      : item.type === 'VRBImage' 
      ? item.show && <VRBImage containerClassName='w-full h-full min-w-[200px] min-h-[200px]' imageHeight="100%" imageWidth="100%" propName={item.name}></VRBImage>
      : item.type === 'VRBButton'
      ? item.show && <VRBButton {...item.props}>
        <VRBText propName={`${item.name}_btn`} size='sm'></VRBText>
      </VRBButton>
      : null
    }
  })
  return (
    <Link {...rest}>
      <Column className={classNames('text-white flex flex-wrap justify-start items-center no-underline gap-x-4 space-y-8 pt-[10px] px-[25px] w-full h-full')}>
        {renderItems.sort((a, b) => a.order - b.order).filter(v=>v.show).map((item, index) =>
         <div className={classNames(item.inline ? 'w-full' : '', 'flex flex-row items-center justify-start')} key={`${item.name}-${index}`}>{(item as any).content}</div>)}
        {((items as any || getColumnItems()).every(v=>!v.show)) && <div className='w-52 h-52 bg-transparent'></div>}
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
    items: getColumnItems(),
    text: 'hello world',
    title: 'H2 Heading',
    size: 'sm',
    type: 'h2',
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
    },
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
      component: (props) => SortableListComponent({initialItems: getColumnItems(), itemProps: [
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
    ], props}),
    },
  ],
}

export default VRBColumn;