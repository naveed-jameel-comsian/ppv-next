"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { trendingOneMoviesData as movies } from "@/data/movie";
import MovieCard from "@/components/Card/MovieCard";

export default function TrendingOne() {
  const swiperOption = {
    speed: 9000,
    spaceBetween: 10,
    loop: true,
    autoplay: {
      delay: 1,
      disableOnInteraction: true,
    },
    centeredSlides: true,
    modules: [Autoplay],
    breakpoints: {
      0: {
        slidesPerView: "1.2",
      },
      576: {
        slidesPerView: "1.7",
        spaceBetween: 20,
      },
      992: {
        slidesPerView: "2.5",
        spaceBetween: 20,
      },
      1366: {
        slidesPerView: "3.5",
        spaceBetween: 30,
      },
      1600: {
        slidesPerView: "3.9",
        spaceBetween: 30,
      },
    },
  };
  return (
    <div className="trending pt-80">
      <div className="d-flex justify-content-center mb-40">
        <div className="section-header">
          <span>⚡</span>
          <h3 className="section-title lh-1 mt-2 mb-0">Trending Now</h3>
        </div>
      </div>
      {movies && movies.length > 0 && (
        <Swiper
          {...swiperOption}
          className="swiper movie-card-slider-sm movie-card-slider-item-scroll"
        >
          {movies.map((movie, index) => (
            <SwiperSlide key={index}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
