import React from 'react'
import { types, Repeater } from 'react-bricks/frontend';
import { classNames } from '@/common/helpers'
import { blockNames } from '../blockNames'
import { bgColors } from '../Shared/colors';
import Columns from '../Layout/Columns';
import Section, {Border} from '../Layout/Section';
import { LayoutProp } from '../Shared/LayoutProps';
import { Card } from '@/components/molecules/Card';
import { BlogCard } from '@/components/molecules/BlogCard';
import { GameCard } from '@/components/molecules/GameCard';
import { ProgramCard } from '@/components/molecules/ProgramCard';
import { FeatureCard } from '@/components/molecules/FeatureCard';
import { StakingCard } from '@/components/molecules/StakingCard';
import { VText } from '@/components/atoms/VText';
import { TeamCard } from '@/components/molecules/TeamCard';

interface BlogSectionProps {
  maxItems?: number
  bg?: { color: string; className: string }
  borderTop?: Border
  borderBottom?: Border
}

const BlogSection: types.Brick<BlogSectionProps> = ({ bg, borderTop, borderBottom, maxItems }) => {
  return (
    <Section bg={bg} borderTop={borderTop} borderBottom={borderBottom} className='py-14 flex space-x-2 flex-wrap w-full'>
      <FeatureCard buttonText='hello world' secondaryBtn title='H4 Title' subtitle='Body — ipsum dolor sit amectetur adipiscing consectetur elit.'/>
      <StakingCard title1='h5 value' title2='h5 value' label1='label' label2='label'/>
      {/* <Card title='card, YES' label='AIMBOT?' subtitle='what does it mean? adipiscing consectetur elit. find out more here'/> */}
      {/* <ProgramCard title='H4 ProG TITLE' subtitle='Body — ipsum dolor sit amectetur adipiscing consectetur elit.'/> */}
      <GameCard title='aimbot, YES' label='AIMBOT?' subtitle='what does it mean? adipiscing consectetur elit. find out more here'/>
      <BlogCard title='seriously?' label='COINBASE LISTING?' subtitle='yeah, what? ipsum dolor sit amectetur adipiscing consectetur elit.  ipsum dolor sit amectetur adipiscing consectetur elit. find out more here' footer='Soya - 13/05/2022'/>

      <TeamCard role='Developer' title='seriously?' label='COINBASE LISTING?' subtitle='yeah, what? ipsum dolor sit amectetur adipiscing consectetur elit.  ipsum dolor sit amectetur adipiscing consectetur elit. find out more here' />
    </Section>
  )
}

BlogSection.schema = {
  name: blockNames.BlogSection,
  label: 'Blog Section Unit',
  category: 'TeamOs-Molecules',

  getDefaultProps: () => ({
    bg: {
      color: '#',
      className: 'bg-gray-100 dark:bg-true-dark-200 bg-true-light-200',
    },
    borderTop: 'none',
    borderBottom: 'none',
  }),
  sideEditProps: [
    LayoutProp({ colors: [bgColors.none, bgColors.dark, bgColors.light, bgColors.gray] }),
  ],
}

export default BlogSection
