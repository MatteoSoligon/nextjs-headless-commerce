"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Children, FC, ReactNode } from "react";

interface SliderProps {
  children: ReactNode | ReactNode[];
}
const Slider: FC<SliderProps> = ({ children }) => {
  return (
    <Swiper slidesPerGroup={1} slidesPerView={1} spaceBetween={10}>
      {Children.map(children, (child) => (
        <SwiperSlide>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
