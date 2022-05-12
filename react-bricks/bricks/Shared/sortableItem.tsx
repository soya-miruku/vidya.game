import { types } from "react-bricks";
import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";
import { blockNames } from "../blockNames";

export interface SortableItemProps {
  type: string,
  name: string,
  order: number,
  show: boolean,
  inline?: boolean,
  props?: any
}

export interface SortableListComponentProps {
  initialItems: SortableItemProps[],
  props: any,
  itemProps: [any]
}

export const SortableListComponent: React.FC<SortableListComponentProps> = ({initialItems, itemProps, props}) => {
  const { value, onChange } = props;
  const items = value || initialItems;

  const DragHandle:any = SortableHandle(() => <div className="drag absolute flex justify-center items-center" 
    style={{backgroundColor: '#030303', color:"white", boxShadow: '0px 0px 2px rgba(0,0,0,0.5)', width: '32px', height: '32px', right:'15px', borderRadius:'100%'}}>
    <span className=' ' >⇕</span>
  </div>)

  const renderItemProps = (item: SortableItemProps, itemProps: [any]) => {
    const renders = [];

    for (let i = 0; i < itemProps.length; i++) {
      const prop:any = itemProps[i];
      console.log(item.type, prop.name)
      if(item.type !== prop.name) return null;
      switch(prop.type) {
        case types.SideEditPropType.Boolean:
          renders.push(
            <div key={prop.propName} className="flex justify-start space-x-2">
              <label className="flex items-center">
                <input type="checkbox" checked={item[prop.propName]} onChange={(e) => {
                  const tmp = items[item.order];
                  item.props = {
                    ...item.props,
                    [prop.propName]: e.target.checked
                  }
                  tmp[prop.propName] = e.target.checked;
                  items[item.order] = tmp;
                  onChange(items);
                }
                } />
                <span className="ml-2">{prop.propName}</span>
              </label>
            </div>)
            break;
        case types.SideEditPropType.Select:
          renders.push(
            <select value={item.name} onChange={(e) => {
              item.props = {
                [e.target.value]: true
              }
              onChange(items);
            }}>
              {prop.options.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
              ))}
            </select>
          )
          break;
        default: break;
      }
    }
    return renders
  }

  const SortableItem:any = SortableElement(({disabled, onChange, sortIndex, item}) => {
    const {name, type, order, show, inline} = item;

    return (
      <div>
      <DragHandle />
      <div key={`nesv-${sortIndex}-${name}`} className="flex space-x-2 flex-col rounded-md p-2 mt-2" style={{ backgroundColor: '#dbdbdb'}}>
        <h3 className='font-bold'>Component: {type}</h3>
        <h4>Name: {name}</h4>
        <h4>Order: {order}</h4>
        <div className='flex space-x-4 items-center'>
          <h4>Show: </h4>
          <div>
            <input type="checkbox" defaultChecked={show} checked={show} onChange={(e) => {
              const newValues = items.map((item, i) => {
                  if (i === sortIndex) {
                    return {...item, show: e.target.checked}
                  }
                  return item
                })
              onChange(newValues)
            }}></input>
          </div>
        </div>
        <div className='flex space-x-4 items-center'>
          <h4>Keep inline: </h4>
          <div>
            <input type="checkbox" defaultChecked={inline} checked={inline} onChange={(e) => {
              const newValues = items.map((item, i) => {
                  if (i === sortIndex) {
                    return {...item, inline: e.target.checked}
                  }
                  return item
                })
              onChange(newValues)
            }}></input>
          </div>
        </div>
        <div className="ml-3 flex">
          <button className='p-2' style={{backgroundColor: '#94167F', color:'white', borderRadius: '20px'}} onClick={(e) => {
            const newValues = items.filter((item, i) => i !== order);
            onChange(newValues)
          } }>Remove</button>
        </div>
        <div className="mt-1 p-2 flex flex-col">
          <h1 className="font-bold">Item Prop</h1>
          {itemProps && renderItemProps(item, itemProps)}
        </div>
      </div>
      </div>
    )
  })

  const SortableList:any = SortableContainer(({items}) => {
    return (
      <ul className="list-reset p-4">
        {items.map((item, i) => {
          return (
            <SortableItem disabled={(item?.order === undefined)} onChange={onChange} key={`item-${item?.type}-${item?.name}`} index={i} item={item} sortIndex={i}/>
          )
        }
        )}
      </ul>
    )
  })
  return (
  <div>
    <SortableList key='sortableList' items={items} helperClass="dragging-active drop-shadow-xl" useDragHandle useWindowAsScrollContainer={true} onSortStart={(e)=>{
      console.log(e)
    }} onSortEnd={({oldIndex, newIndex}) => {
      const newItems = items;
      newItems[oldIndex].order = newIndex;
      newItems[newIndex].order = oldIndex;
      onChange(newItems)
    }}/>
  </div>
  )
}