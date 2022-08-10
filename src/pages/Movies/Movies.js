import React from "react";
import { useSelector } from "react-redux";
import { MovieInfo } from "../../widgets/MovieInfo/MovieInfo";
import { Preloader } from "../../widgets/Preloader/Preloader";
import "./movies.css";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import swiper module
import { Pagination } from "swiper";

export function Movies() {
  let movies = useSelector((state) => state.movies.movies);
  const isLoading = useSelector((state) => state.movies.isLoading);


  const getDirection = () => {
    let windowWidth = window.innerWidth;
    let direction = windowWidth <= 500 ? 'vertical' : 'horizontal';

    return direction;
  }
  const handleResize = (Swiper) => {
    Swiper.changeDirection(getDirection())
  }
  return (
    <>
      <div className="swiperWrap">
        <Swiper
          breakpoints={{
            850: {
              slidesPerView: 4
            },
            650: {
              slidesPerView: 3,
              spaceBetween: 20
            },

            500: {
              slidesPerView: 2,
              spaceBetween: 10
            },
            0: {
              allowTouchMove: true,
              mousewheel: true,
              slidesPerView: 1,
            }
          }}
          slidesPerView={4}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
          onResize={Swiper => handleResize(Swiper)}
        >
          {isLoading ? (
            <Preloader />
          ) : (
            movies.map((movie, index) => (
              <SwiperSlide key={index}>
                <MovieInfo key={index} info={movie}>
                  {movies[index].Title}
                </MovieInfo>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </>
  );
}
