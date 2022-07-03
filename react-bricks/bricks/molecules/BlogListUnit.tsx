import React from 'react'
import { types } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'
import { bgColors, DefaultColors } from '../Shared/colors';
import Section, { SectionProps } from '../Layout/Section';
import { DefaultLayoutProps, LayoutProp } from '../Shared/LayoutProps';
import { BlogListSection } from '@/components/organisms/blogsListSection';

interface IBlogListProps extends SectionProps {
  maxItems?: number
}

const BlogListUnit: types.Brick<IBlogListProps> = ({ bg, bgImage, parallaxSpeed, enableParallax, blur, rounded, height, maxItems, paddingX, paddingTop, paddingBottom }) => {
  return (
    <Section bg={bg} bgImage={bgImage} parallaxSpeed={parallaxSpeed} enableParallax={enableParallax} blur={blur} rounded={rounded} height={height} paddingX={paddingX} paddingTop={paddingTop} paddingBottom={paddingBottom} className=''>
      <BlogListSection limit={maxItems}/>
    </Section>
  )
}

BlogListUnit.schema = {
  name: blockNames.BlogListUnit,
  label: 'Blog List Unit',
  category: 'TeamOs-Molecules',

  getDefaultProps: () => ({
    ...DefaultLayoutProps,
    borderTop: 'none',
    borderBottom: 'none',
    maxItems: 3,
  }),
  sideEditProps: [
    LayoutProp({ colors: DefaultColors }),
    {
      name: 'maxItems',
      label: 'Max Items',
      type: types.SideEditPropType.Number,
    }
  ],
}

export default BlogListUnit
