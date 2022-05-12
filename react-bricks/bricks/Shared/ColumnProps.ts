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


export const getColumnItems = () => {
  const allowed = [blockNames.Button, blockNames.Image, blockNames.Label, blockNames.Title, blockNames.Text];
  return allowed.map((value, i) => {
    return {
      type: value,
      name: `${value}_${i}`,
      order: i,
      show: i === 0,
      inline: false,
      itemProp: {}
    }
  })
}