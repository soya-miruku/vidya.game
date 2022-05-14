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
import { PriceCard } from '@/components/molecules/PriceCard';
import { StatCard } from '@/components/molecules/StatCard';
import { IconCard } from '@/components/molecules/IconCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoonStars } from '@fortawesome/pro-light-svg-icons';

interface BlogSectionProps {
  maxItems?: number
  bg?: { color: string; className: string }
  borderTop?: Border
  borderBottom?: Border
}

const BlogSection: types.Brick<BlogSectionProps> = ({ bg, borderTop, borderBottom, maxItems }) => {
  return (
    <Section bg={bg} borderTop={borderTop} borderBottom={borderBottom} className='py-14 flex space-x-2 space-y-3 flex-wrap justify-center items-center w-full'>
      {/* <FeatureCard buttonText='hello world' secondaryBtn title='H4 Title' subtitle='Body — ipsum dolor sit amectetur adipiscing consectetur elit.'/> */}
      {/* <StakingCard title1='h5 value' title2='h5 value' label1='label' label2='label'/> */}
      <PriceCard length='lg' label='PRICE' price='0.19' perctChange='-14.12%'/>
      <PriceCard label='MARKET CAP' price='8.2M' perctChange='4.12%' increase/>

      <StatCard label='LABEL' title='H4 VAL'/>
      <IconCard label='LABEL' icon={<FontAwesomeIcon size="lg" className='ml-4' style={{width: '60px', height: '60px'}} icon={faMoonStars}></FontAwesomeIcon>}/>

      {/* <Card title='card, YES' label='AIMBOT?' subtitle='what does it mean? adipiscing consectetur elit. find out more here'/> */}
      {/* <ProgramCard title='H4 ProG TITLE' subtitle='Body — ipsum dolor sit amectetur adipiscing consectetur elit.'/> */}
      <GameCard title='aimbot, YES' label='AIMBOT?' subtitle='what does it mean? adipiscing consectetur elit. find out more here'/>
      <BlogCard title='seriously?' label='COINBASE LISTING?' subtitle='yeah, what? ipsum dolor sit amectetur adipiscing consectetur elit.  ipsum dolor sit amectetur adipiscing consectetur elit. find out more here' footer='Soya - 13/05/2022'/>

      <TeamCard telegram='some' twitter='myhandle' instagram='lolwhatisthis' role='Developer' title='MyName?' subtitle='MYNAME ipsum dolor sit amectetur adipiscing consectetur elit.  ipsum dolor sit amectetur adipiscing consectetur elit. find out more here' />
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
