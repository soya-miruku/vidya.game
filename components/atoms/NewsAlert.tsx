import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useFetchPages } from "hooks/useFetchPages";
import { getPageUrlByType } from "@/common/helpers";

export const NewsAlert = ({limit=3}) => {
  const settings = {
    dots: false,
    autoplay:true,
    arrows:false,
    infinite: true,
    speed: 1500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  const {data, isLoading, error} = useFetchPages({type: 'post', limit});
  
  if(isLoading) {
    return <div>Loading...</div>
  }

  if(error) {
    return <div>Error...</div>
  }

  return (
    <Slider {...settings} className="w-full bg-primary-100 p-3">
      {(data || []).map((post, index) => {
        return (
          <div key={`${post.id}_${index}`} className="text-light-100 text-body-sm">
            <div className="flex justify-center items-center space-x-2">
              <div className="bg-light-100 rounded-sm p-1 px-2">
                <h1 className="text-black">{post.customValues?.label}</h1>
              </div>
              <h3>{post.meta.title}</h3>
              <a href={getPageUrlByType(post.type, post.slug)} className="text-accent-dark-100 underline mt-[1px]">Find out more</a>
            </div>
          </div>
        )
      })}
    </Slider>
  )
}