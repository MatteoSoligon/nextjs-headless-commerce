"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Children, FC, ReactNode } from "react";
import { SwiperOptions } from "swiper/types";

interface SliderProps {
  children: ReactNode | ReactNode[];
  options?: SwiperOptions;
}
const Slider: FC<SliderProps> = ({ children, options }) => {
  return (
    <Swiper {...options}>
      {Children.map(children, (child) => (
        <SwiperSlide>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
