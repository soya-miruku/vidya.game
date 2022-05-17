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
import { BlogListSection } from '@/components/organisms/blogsListSection';

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
    <Section bg={bg} borderTop={borderTop} borderBottom={borderBottom} paddingX={paddingX} paddingY={paddingY} className='py-14 flex flex-col space-x-2 space-y-3 flex-wrap justify-center items-center max-w-page'>
      <BlogListSection/>
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
