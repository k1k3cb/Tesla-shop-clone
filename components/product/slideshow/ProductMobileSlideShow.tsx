'use client';

import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import Image from 'next/image';
import './slideshow.css';

interface ProductMobileSlideShowProps {
  images: string[];
  title: string;
  className?: string;
}

const ProductMobileSlideShow = ({
  images,
  title,
  className
}: ProductMobileSlideShowProps) => {
  return (
    <div className={className}>
      <Swiper
        style={{
          width: '100%',
          height: '500px'
        }}
        pagination
        navigation={true}
        autoplay={{
          delay: 3000
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        className='mySwiper2'
      >
        {images.map(image => (
          <SwiperSlide key={image}>
            <Image
              src={`/products/${image}`}
              alt={title}
              width={600}
              height={500}
              className=' object-fill'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductMobileSlideShow;
