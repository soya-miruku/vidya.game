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
  parallaxSpeed:500,
  bgOffsetY: 0,
  parallaxMoveTo: 'bottom',
  blur:'sm',
}

export const LayoutProp = ({
  colors,
}: LayoutPropProps = {}): types.ISideGroup => {
  return  {
    groupName: 'Layout',
    defaultOpen: true,
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
        type: types.SideEditPropType.Number,
      },
      {
        name: 'bgOffsetY',
        label: 'Background Offset Y',
        type: types.SideEditPropType.Number,
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
      // {
      //   name: 'bgVideo',
      //   label: 'Background Video',
      //   type: types.SideEditPropType.Custom,
      //   component: (props) => VideoFileViewer({propName: 'bgVideo', ...props}),
      // },
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