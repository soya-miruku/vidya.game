import { types } from 'react-bricks/frontend'
import { blockNames } from '../blockNames'

interface ColumnsPropProps {
  min?: types.IOption[],
  max?: types.IOption[],
}

export const ColumnsProp = ({
  min, max,
}): types.ISideGroup => {
  return {
    groupName: 'Columns',
    props: [
      {
        name: 'columns',
        label: 'Number of columns',
        type: types.SideEditPropType.Select,
        selectOptions: {
          display: types.OptionsDisplay.Select,
          options:[
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' },
          ],
        },
      }
    ]
  }
}

export interface IColumnItemSettingsProp {
  type: blockNames;
  name: string;
  show?: boolean;
  order?: number;
  inline?: boolean;
  itemProp?: {};
}

export const getDefaultColumnItems = () => {
  const allowed=[blockNames.Button, blockNames.Image, blockNames.Label, blockNames.Title, blockNames.Text];
  return allowed.map((item, index) => {
    return {
      type: item,
      name: `${item}_${index}`,
      show: false,
      order: index,
      inline: false,
      itemProp: {},
    }
  })
}
export const getColumnItems = (settings?: [IColumnItemSettingsProp], allowed=[blockNames.Button, blockNames.Image, blockNames.Label, blockNames.Title, blockNames.Text]) => {
  return (settings||[]).map((item, index) => {
    console.log(settings)
    if (allowed.indexOf(item.type) > -1) {
      return {
        type: item.type,
        name: item.name,
        show: item.show,
        order: item.order,
        inline: item.inline,
        itemProp: item.itemProp,
      }
    }
  });
}