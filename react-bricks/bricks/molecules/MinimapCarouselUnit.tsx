import React from 'react';
import dynamic from 'next/dynamic';
import { types, Repeater, useAdminContext } from 'react-bricks/frontend';
import { blockNames } from '../blockNames'
import { DefaultColors } from '../Shared/colors';
import { DefaultLayoutProps, LayoutProp } from '../Shared/LayoutProps';
import Section, { SectionProps } from '../Layout/Section';
import { PageViewSize } from '@/components/atoms/PageViewSize';
import { MiniMapCarousel } from '@/components/organisms/MinimapCarousel';
import { VTitle } from '@/components/atoms/VTitle';

// const MiniMapCarousel = dynamic(() => import('@/components/organisms/MinimapCarousel'), {
//   ssr: false,
// });

interface IMinimapCarouselUnitProps extends SectionProps {
  title: string;
}

const MinimapCarouselUnit: types.Brick<IMinimapCarouselUnitProps> = ({title, ...sectionProps}) => {
  const { isAdmin } = useAdminContext();
  return (
    <Section {...sectionProps} className="before:box-border after:box-border select-none overflow-hidden m-0 p-0 w-full sm:h-[650px] h-[350px] relative prose">
      {title && <VTitle type='h2' className='absolute top-2 !text-accent-dark-200/30'>{title}</VTitle>}
      <PageViewSize className='absolute' enabled={!sectionProps.bgImage}>
        <Repeater propName='images' renderWrapper={(items) => {
        const sources = items.props?.children?.map((item) => item?.props?.children?.props?.imageSrc|| '/placeholders/img.png') || [];
        if(isAdmin) {
          return (
            <div className='flex gap-vsm flex-wrap justify-center items-center w-full'>
              {items}
            </div>
          )
        }
        return (
          <MiniMapCarousel imageSources={sources}/> 
        )
      }}></Repeater>
      </PageViewSize>
    </Section>
  )
}

MinimapCarouselUnit.schema = {
  name: blockNames.MinimapCarouselUnit,
  label: 'Minitmap Carousel Unit',
  category: 'TeamOs-Aimbots',

  getDefaultProps: () => ({
    ...DefaultLayoutProps,
    title: 'Gallary',
    images: [

    ]
  }),
  repeaterItems: [
    {
      name: 'images',
      itemType: blockNames.SimpleImage,
      itemLabel: 'Image',
      min: 0,
      max: 10 
    },
  ],
  sideEditProps: [
    LayoutProp({ colors: DefaultColors }),
    {
      name: 'title',
      label: 'Title',
      type: types.SideEditPropType.Text
    }
  ],
}

export default MinimapCarouselUnit
