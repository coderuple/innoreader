import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Category } from "../types";
import { NewsCarouselItem } from "./NewsCarouseltem.tsx";

interface NewsCarouselProps {
  categories: Category[];
}

export function NewsCarousel({ categories }: NewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval: number;
    if (isAutoPlaying) {
      interval = window.setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % categories.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, categories.length]);

  if (categories.length === 0) return null;

  const currentCategory = categories[currentIndex];

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + categories.length) % categories.length
    );
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % categories.length);
    setIsAutoPlaying(false);
  };

  return (
    <div className="carousel">
      <NewsCarouselItem category={currentCategory} />

      <button
        className="carousel__arrow carousel__arrow--prev"
        onClick={goToPrevious}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="carousel__arrow carousel__arrow--next"
        onClick={goToNext}
      >
        <ChevronRight size={24} />
      </button>

      <div className="carousel__indicators">
        {categories.map((_, index) => (
          <button
            key={index}
            className={`carousel__indicator ${
              index === currentIndex ? "carousel__indicator--active" : ""
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
