'use client';

import { Swiper as SwiperObject } from 'swiper';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import Image from 'next/image';
import { useState } from 'react';
import './slideshow.css';
import { ProductImage } from '../product-image/ProductImage';

interface ProductSlideShowProps {
  images: string[];
  title: string;
  className?: string;
}

const ProductSlideShow = ({
  images,
  title,
  className
}: ProductSlideShowProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();
  return (
    <div className={className}>
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff'
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 3000
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className='mySwiper2'
      >
        {images.map(image => (
          <SwiperSlide key={image}>
            <ProductImage
              src={image}
              alt={title}
              width={1024}
              height={800}
              className='rounded-lg object-fill'
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper'
      >
        {images.map(image => (
          <SwiperSlide key={image}>
            <ProductImage
              src={image}
              alt={title}
              width={300}
              height={300}
              className='rounded-lg object-fill'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlideShow;
