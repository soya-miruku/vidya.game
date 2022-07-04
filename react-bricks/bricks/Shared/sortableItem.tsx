import { types } from "react-bricks";
import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";
import { generateUniqueId } from "../../../common/helpers";
import { blockNames } from "../blockNames";
import { getColumnItems, getDefaultColumnItems, IColumnItemSettingsProp } from "./ColumnProps";

export interface SortableItemProps {
  type: string,
  name: string,
  order: number,
  show: boolean,
  inline?: boolean,
  props?: any
}

export interface SortableListComponentProps {
  props: any,
  itemProps: any,
  maxAddPerItem?: number,
}

export const SortableListComponent: React.FC<SortableListComponentProps> = ({ itemProps, props, maxAddPerItem=3}) => {
  const { value, onChange } = props;
  const items = value || [];
  // if(!items) return null;
  const DragHandle:any = SortableHandle(() => <div className="drag absolute flex justify-center items-center" 
    style={{backgroundColor: '#030303', color:"white", boxShadow: '0px 0px 2px rgba(0,0,0,0.5)', width: '32px', height: '32px', right:'15px', borderRadius:'100%'}}>
    <span className=' ' >⇕</span>
  </div>)

  const renderItemProps = (item: any, itemProps: [any]) => {
    const renders = [];

    for (let i = 0; i < itemProps.length; i++) {
      const prop:any = itemProps[i];
      
      if(item.type !== prop.name) continue;
      if(item.props && !item.props.hasOwnProperty(prop.propName)) {
        item.props = {
          ...item.props,
          [prop.propName]: null
        }
      }
      switch(prop.type) {
        case types.SideEditPropType.Text: {
          renders.push(<div key={i} className="flex flex-col">
            <label>{prop.label}</label>
            <input  type="text" value={item.itemProp[prop.propName]} onChange={(e) => {
              item.props = {
                ...item.props,
                [prop.propName]: e.target.value
              }
              item.itemProp[prop.propName] = e.target.value;
              onChange(items);
            }
            }/>
          </div>)
          break;
        }
        case types.SideEditPropType.Boolean:{
          renders.push(
            <div key={`${prop.propName}-${item.name}`} className="flex justify-start space-x-2">
              <label className="flex items-center">
                <input type="checkbox" checked={item.itemProp[prop.propName]} onChange={(e) => {
                  item.props = {
                    ...item.props,
                    [prop.propName]: e.target.checked
                  }
                  item.itemProp[prop.propName] = e.target.checked;
                  onChange(items);
                }
                } />
                <span className="ml-2">{prop.propName}</span>
              </label>
            </div>)
            break;
        }
        case types.SideEditPropType.Select:{
          let selected = item.itemProp[prop.propName] || prop.options?.[0]?.value;
          renders.push(
            <div key={`${prop.propName}-${item.name}`} className="flex justify-start space-x-2">
            <select className="bg-black w-full h-10" onChange={(e) => {
              item.props = {
                ...item.props,
                [prop.propName]: e.target.value
              }

              item.itemProp[prop.propName] = e.target.value;
              
              selected = item.itemProp[prop.propName];

              onChange(items);
            }}>
              
              {prop.options.map((option, index) => {
                return (<option key={index} value={option.value} selected={selected === option.value}>{option.label}</option>)
              })}
            </select>
            </div>
          )
          break;
        }
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
      <div key={`nesv-${sortIndex}-${name}`} className="flex space-x-2 flex-col rounded-sm p-2 mt-2" style={{ backgroundColor: '#dbdbdb'}}>
        <h3 className='font-bold'>Component: {type}</h3>
        <h4>Name: {name}</h4>
        <h4>Order: {order}</h4>
        <div className='flex space-x-4 items-center'>
          <h4>Show: </h4>
          <div>
            <input type="checkbox" checked={show} onChange={(e) => {
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
            <input type="checkbox" checked={inline} onChange={(e) => {
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
          <button className='p-2' style={{fontSize: '12px', backgroundColor: 'red', color:'white', borderRadius: '10px'}} onClick={(e) => {
            const newValues = items.filter((item, i) => i !== order);
            onChange(newValues)
          } }>Remove</button>
        </div>
        <hr className="mt-1 bg-dark-300"></hr>
        <div className="mt-1 p-2 flex flex-col">
          {itemProps && <><h1 className="font-bold">Item Prop</h1> <div>{renderItemProps(item, itemProps)}</div></>}
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
            <SortableItem disabled={(item?.order === undefined)} onChange={onChange} key={`item-${item?.type}-${item?.name}-${i}`} index={i} item={item} sortIndex={i}/>
          )
        }
        )}
      </ul>
    )
  })

  const templateList = getDefaultColumnItems();
  return (
    <div>
      <div>
        {templateList.map((item, index) => {
          return (
            <div key={`${index}-btn-g-${item.name}`}>
              <div className="flex justify-start space-x-2">
                <button style={{
                  backgroundColor: '#fafafa',
                  border: '1px solid #f3f3f3',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  fontSize: '10px',
                  color: '#333',
                }} onClick={(e) => {
                  const tmp = templateList[index];
                  const canAdd = items.filter(i => i.type === tmp.type).length < maxAddPerItem;
                  if(canAdd){
                    items.push({
                      ...tmp,
                      show: true,
                      name: `${tmp.name}-${generateUniqueId()}`
                    });
                  }
                  onChange(items)
                }}> ADD {item.type}</button>
              </div>
            </div>
          )
          })}
      </div>
      <SortableList key='sortableList' items={items} helperClass="dragging-active drop-shadow-xl" useDragHandle useWindowAsScrollContainer={true} onSortStart={(e)=>{
      }} onSortEnd={({oldIndex, newIndex}) => {
        const newItems = items;
        newItems[oldIndex].order = newIndex;
        newItems[newIndex].order = oldIndex;
        onChange(newItems)
      }}/>
    </div>
  )
}