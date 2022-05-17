import { TeamCard } from '@/components/molecules/TeamCard'
import * as React from 'react'
import { types, Link } from 'react-bricks/frontend'
import { blockNames } from '../blockNames'

export interface ITeamCardProps {
  image?: string
  role?: string
  name?: string
  url?: string
  bordered?: boolean
  description?: string
  discord?: string
  twitter?: string
  telegram?: string
  instagram?: string
  propName: string
}

const VRBTeamCard: types.Brick<ITeamCardProps> = ({
  image,
  role,
  name,
  url,
  bordered = true,
  description,
  discord,
  twitter,
  telegram,
  instagram,
  propName,
  ...rest
}) => {
  return (
    <Link {...rest}>
      <TeamCard image={image} role={role} discord={discord} twitter={twitter} telegram={telegram} instagram={instagram} title={name} subtitle={description} url={url} avatar={image} />
    </Link>
  )
}

VRBTeamCard.schema = {
  name: blockNames.TeamCard,
  label: 'Team Card',
  category: 'vidya atoms',
  hideFromAddMenu: true,
  getDefaultProps: () => ({
    role: 'Legending',
    name: 'Vidya',
    description: 'Vidya is a full stack developer with a passion for building beautiful and intuitive user interfaces. He is a self-taught developer and has been working on his own projects since he was a kid. He is a self-taught developer and has been working on his own projects since he was a kid. He is a self-taught developer and has been working on his own projects since he was a kid.',
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    bordered: true,
    url: 'https://www.vidyapathshala.com/',
    discord: 'https://discord.gg/vxzXxQW',
    twitter: 'https://twitter.com/vidyapathshala',
    telegram: 'https://t.me/vidyapathshala',
    instagram: 'https://www.instagram.com/vidyapathshala/',
  }),
  sideEditProps: [
    {
      name: 'image',
      label: 'Image',
      defaultOpen: true,
      type: types.SideEditPropType.Image,
    },
    {
      name: 'role',
      label: 'Role',
      defaultOpen: true,
      type: types.SideEditPropType.Text,
    },
    {
      name: 'name',
      label: 'Name',
      defaultOpen: true,
      type: types.SideEditPropType.Text,
    },
    // {
    //   name: 'url',
    //   label: 'URL',
    //   defaultOpen: true,
    //   type: types.SideEditPropType.Text,
    // },
    {
      name: 'bordered',
      label: 'Bordered',
      defaultOpen: true,
      type: types.SideEditPropType.Boolean,
    },
    {
      name: 'description',
      label: 'Description',
      defaultOpen: true,
      type: types.SideEditPropType.Text,
    },
    {
      name: 'discord',
      label: 'Discord',
      defaultOpen: true,
      type: types.SideEditPropType.Text,
    },
    {
      name: 'twitter',
      label: 'Twitter',
      defaultOpen: true,
      type: types.SideEditPropType.Text,
    },
    {
      name: 'telegram',
      label: 'Telegram',
      defaultOpen: true,
      type: types.SideEditPropType.Text,
    },
    {
      name: 'instagram',
      label: 'Instagram',
      defaultOpen: true,
      type: types.SideEditPropType.Text,
    }
  ],
}

export default VRBTeamCard