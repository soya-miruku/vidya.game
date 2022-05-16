import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const NewsAlert = ({}) => {
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

  return (
    <Slider {...settings} className="w-full bg-[#651AB7] p-3">
      <div className="text-white">
        <div className="flex justify-center items-center space-x-2">
          <div className="bg-white rounded-sm p-1 px-2">
            <h1 className="text-black text-sm">NEW</h1>
          </div>
          <h3>Crpto.com X Vidya</h3>
          <a href="#" className="text-accent-dark-100 underline text-sm mt-[1px]">Find out more</a>
        </div>
      </div>
      <div className="text-white">
        <div className="flex justify-center items-center space-x-2">
          <div className="bg-white rounded-sm p-1 px-2">
            <h1 className="text-black text-sm">NEW</h1>
          </div>
          <h3>Generator Staking: Ready For Launch?</h3>
          <a href="#" className="text-accent-dark-100 underline text-sm mt-[1px]">Find out more</a>
        </div>
      </div>
    </Slider>
  )
}