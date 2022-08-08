import React from 'react'
import { types, useAdminContext, usePage } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'
import { IBlogHeroProps, BlogHero } from '@/components/organisms/blogHero';
import { useIsMounted } from '@/hooks/useIsMounted';


const BlogHeroUnit: types.Brick<IBlogHeroProps> = ({ title, imgSrc, backgroundFit }) => {
  const { isAdmin, currentPage } = useAdminContext();
  const { isMounted } = useIsMounted();
  const page = isMounted && isAdmin && usePage(currentPage.pageId, currentPage.language);
  return (
    <div className='w-full h-full prose'>
      <BlogHero currentPage={page?.data?.slug} title={title} imgSrc={(imgSrc as any)?.src} canEdit={isAdmin} backgroundFit={backgroundFit}></BlogHero>
      <div className='w-full h-12'></div>
    </div>
  )
}

BlogHeroUnit.schema = {
  name: blockNames.SmallHeroUnit,
  label: 'Blog Hero Unit',
  category: 'TeamOs-Molecules',

  getDefaultProps: () => ({
    title: '',
    imgSrc: '/banner0.png',
    backgroundFit: 'cover'
  }),
  sideEditProps: [
    {
      name: 'imgSrc',
      label: 'Image Src',
      type: types.SideEditPropType.Image
    },
    {
      name: 'backgroundFit',
      label: 'Background Fit',
      type: types.SideEditPropType.Select,
      selectOptions: {
        display: types.OptionsDisplay.Select,
        options: [
        {
          label: 'Cover',
          value: 'cover'
        },
        {
          label: 'Contain',
          value: 'contain'
        },
        {
          label: 'None',
          value: 'none'
        },
        {
          label: 'Fill',
          value: 'fill'
        }
      ]
    }
    }
  ],
}

export default BlogHeroUnit
