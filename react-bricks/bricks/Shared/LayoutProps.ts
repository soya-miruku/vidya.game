import { types } from 'react-bricks/frontend'
import { bgColors } from './colors'

interface LayoutPropProps {
  colors?: types.IOption[]
}

export const DefaultLayoutProps = {
  bg: bgColors.none.value,
  paddingX: 0,
  paddingTop: 50,
  paddingBottom: 50,
  height: 'auto',
  rounded: 'none',
  enableParallax: true,
  parallaxSpeed: 0.5,
  bgSize: 'cover',
  parallaxMoveTo: 'bottom',
  blur:'sm',
}

export const LayoutProp = ({
  colors,
}: LayoutPropProps = {}): types.ISideGroup => {
  return  {
    groupName: 'Layout',
    defaultOpen: false,
    props: [
      {
        name: 'bg',
        label: 'Background Color',
        type: types.SideEditPropType.Select,
        selectOptions: {
          display: types.OptionsDisplay.Color,
          options: [...colors],
        },
      },
      {
        name: 'enableParallax',
        label: 'Enable Parallax',
        type: types.SideEditPropType.Boolean,
      },
      {
        name: 'parallaxSpeed',
        label: 'Parallax Speed',
        type: types.SideEditPropType.Range,
        rangeOptions: {
          min: 0,
          max: 1,
          step: 0.01,
        }
      },
      {
        name: 'bgSize',
        label: 'Background Size',
        type: types.SideEditPropType.Select,
        selectOptions: {
          display: types.OptionsDisplay.Select,
          options: [
            {
              value: 'cover',
              label: 'Cover',
            },
            {
              value: 'contain',
              label: 'Contain',
            },
            {
              value: '50%',
              label: '50%',
            },
            {
              value: '45%',
              label: '45%',
            },
            {
              value: '40%',
              label: '40%',
            },
            {
              value: '35%',
              label: '35%',
            },
            {
              value: '30%',
              label: '30%',
            },
            {
              value: '25%',
              label: '25%',
            },
            {
              value: '20%',
              label: '20%',
            },
            {
              value: '15%',
              label: '15%',
            },
            {
              value: '10%',
              label: '10%',
            },
            {
              value: '5%',
              label: '5%',
            },
            {
              value: 'auto',
              label: 'Auto',
            }
          ],
        }
      },
      {
        name: 'blur',
        label: 'Enable Blur',
        type: types.SideEditPropType.Select,
        selectOptions: {
          display: types.OptionsDisplay.Select,
          options: [
            { value: 'none', label: 'None' },
            { value: 'sm', label: 'Small' },
            { value: 'md', label: 'Medium' },
            { value: 'lg', label: 'Large' },
          ],
        },
      },
      {
        name: 'parallaxMoveTo',
        label: 'Parallax Move Direction',
        type: types.SideEditPropType.Select,
        selectOptions: {
          display: types.OptionsDisplay.Select,
          options: [
            { value: 'top', label: 'Top' },
            { value: 'bottom', label: 'Bottom' },
            { value: 'left', label: 'Left' },
            { value: 'right', label: 'Right' },
          ],
        },
      },
      {
        name: 'bgImage',
        label: 'Background Image',
        type: types.SideEditPropType.Image,
      },
      {
        name: 'height',
        label: 'Height',
        type: types.SideEditPropType.Text,
      },
      {
        name: 'rounded',
        label: 'Rounded',
        type: types.SideEditPropType.Select,
        selectOptions: {
          display: types.OptionsDisplay.Select,
          options: [
            { value: 'none', label: 'None' },
            { value: 'sm', label: 'Small' },
            { value: 'md', label: 'Medium' },
            { value: 'lg', label: 'Large' },
          ],
        },
      },
      {
        name: 'paddingX',
        label: 'Padding X',
        type: types.SideEditPropType.Number,
      },
      {
        name: 'paddingTop',
        label: 'Padding Top',
        type: types.SideEditPropType.Number,
      },
      {
        name: 'paddingBottom',
        label: 'Padding Bottom',
        type: types.SideEditPropType.Number,
      }
    ],
  }
}