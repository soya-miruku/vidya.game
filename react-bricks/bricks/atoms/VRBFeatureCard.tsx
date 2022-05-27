import { FeatureCard, IFeatureCardProps } from '@/components/molecules/FeatureCard'
import * as React from 'react'
import { types, Link } from 'react-bricks/frontend'
import { blockNames } from '../blockNames'

export interface IVRBFeatureCardProps extends IFeatureCardProps {
  btnLink?: string
}

const VRBFeatureCard: types.Brick<IVRBFeatureCardProps> = ({
  bordered = true,
  title,
  subtitle,
  secondaryBtn,
  primaryBtn,
  specialBtn,
  buttonText,
  btnLink,
  image,
  ...rest
}) => {
  return (
    <Link {...rest}>
      <FeatureCard title={title} subtitle={subtitle} bordered={bordered} secondaryBtn={secondaryBtn} specialBtn={specialBtn} primaryBtn={primaryBtn} buttonText={buttonText} onClick={() => btnLink && window.open(btnLink, '_blank')}/>
    </Link>
  )
}

VRBFeatureCard.schema = {
  name: blockNames.FeatureCard,
  label: 'Feature Card',
  category: 'vidya atoms',
  hideFromAddMenu: true,
  getDefaultProps: () => ({
    bordered: true,
    title: 'TITLE',
    subtitle: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    buttonText: 'Button Text',
    secondaryBtn: true,
    primaryBtn: false,
    specialBtn: false,
    btnLink: '#'
  }),
  sideEditProps: [
    {
      name: 'bordered',
      label: 'Bordered',
      type: types.SideEditPropType.Boolean,
    },
    {
      name: 'title',
      type: types.SideEditPropType.Text,
      label: 'Title'
    },
    {
      name: 'subtitle',
      type: types.SideEditPropType.Textarea,
      label: 'Subtitle'
    },
    {
      name: 'image',
      type: types.SideEditPropType.Image,
      label: 'Image'
    },
    {
      name: 'buttonText',
      type: types.SideEditPropType.Text,
      label: 'Button Text'
    },
    {
      name: 'secondaryBtn',
      type: types.SideEditPropType.Boolean,
      label: 'Secondary Button'
    },
    {
      name: 'primaryBtn',
      type: types.SideEditPropType.Boolean,
      label: 'Primary Button'
    },
    {
      name: 'specialBtn',
      type: types.SideEditPropType.Boolean,
      label: 'Special Button'
    },
    {
      name: 'btnLink',
      type: types.SideEditPropType.Text,
      label: 'Button Link'
    }
  ],
}

export default VRBFeatureCard