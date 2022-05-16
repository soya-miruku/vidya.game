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
import { Padding } from '../Shared/additional';

interface BlogSectionProps {
  maxItems?: number
  bg?: { color: string; className: string }
  borderTop?: Border
  borderBottom?: Border
  paddingX?: Padding
  paddingY?: Padding
}

const BlogSection: types.Brick<BlogSectionProps> = ({ bg, borderTop, borderBottom, maxItems, paddingX, paddingY }) => {
  return (
    <Section bg={bg} borderTop={borderTop} borderBottom={borderBottom} paddingX={paddingX} paddingY={paddingY} className='py-14 flex flex-col space-x-2 space-y-3 flex-wrap justify-center items-center w-full'>
      {/* <FeatureCard buttonText='hello world' secondaryBtn title='H4 Title' subtitle='Body — ipsum dolor sit amectetur adipiscing consectetur elit.'/> */}
      {/* <StakingCard title1='h5 value' title2='h5 value' label1='label' label2='label'/> */}
      <div className='flex space-x-4 space-y-4 flex-wrap'>
        <PriceCard length='lg' label='PRICE' price='0.19' perctChange='-14.12%'/>
        <PriceCard label='MARKET CAP' price='8.2M' perctChange='4.12%' increase/>
      </div>
      <div className='flex space-x-4 space-y-4 flex-wrap'>
        <StatCard label='LABEL' title='H4 VAL'/>
        <IconCard label='LABEL' icon={<FontAwesomeIcon size="lg" className='ml-4' style={{width: '60px', height: '60px'}} icon={faMoonStars}></FontAwesomeIcon>}/>
      </div>
      <div className='flex space-x-4 space-y-4 flex-wrap'>
        <Card title='default card, YES' label='AIMBOT?' subtitle='what does it mean? adipiscing consectetur elit. find out more here'/>
        <ProgramCard title='H4 ProG TITLE' subtitle='Body — ipsum dolor sit amectetur adipiscing consectetur elit.'/>
      </div>
      <div className='flex space-x-4 space-y-4 flex-wrap'>
        <GameCard title='aimbot, YES' label='AIMBOT?' subtitle='what does it mean? adipiscing consectetur elit. find out more here'/>
        <BlogCard title='seriously?' label='COINBASE LISTING?' subtitle='yeah, what? ipsum dolor sit amectetur adipiscing consectetur elit.  ipsum dolor sit amectetur adipiscing consectetur elit. find out more here' footer='Soya - 13/05/2022'/>
        <TeamCard telegram='some' twitter='myhandle' instagram='lolwhatisthis' role='Developer' title='MyName?' subtitle='MYNAME ipsum dolor sit amectetur adipiscing consectetur elit.  ipsum dolor sit amectetur adipiscing consectetur elit. find out more here' />
      </div>
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
      className: 'bg-gray-100 dark:bg-dark-200 bg-light-200',
    },
    borderTop: 'none',
    borderBottom: 'none',
  }),
  sideEditProps: [
    LayoutProp({ colors: [bgColors.none, bgColors.dark, bgColors.light, bgColors.gray] }),
  ],
}

export default BlogSection
