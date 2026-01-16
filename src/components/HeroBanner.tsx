import { useEffect, useState, useRef } from "react";
import API from "../utils/api";

interface Movie {
  id: number;
  title: string;
  description: string;
  poster_full: string;
  trailer_url?: string;
}

export default function HeroBanner() {
  const [slides, setSlides] = useState<Movie[]>([]);
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0); // progress 0 - 100%
  const slideInterval = useRef<number | null>(null);
  const progressInterval = useRef<number | null>(null);

  const slideDelay = 10000; // 10 seconds per slide

  // Fetch 3 random movies from backend
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await API.get("/movies/");
        const movies: Movie[] = Array.isArray(res.data) ? res.data : [];

        const shuffled = movies.sort(() => 0.5 - Math.random());
        setSlides(shuffled.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch movies", err);
      }
    };
    fetchMovies();
  }, []);

  // Slide auto-change
  useEffect(() => {
    if (!slides.length) return;

    slideInterval.current = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setProgress(0); // reset progress when slide changes
    }, slideDelay);

    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, [slides]);

  // Progress bar update
  useEffect(() => {
    if (!slides.length) return;

    const intervalTime = 50; // update every 50ms
    progressInterval.current = window.setInterval(() => {
      setProgress((prev) => {
        const next = prev + (intervalTime / slideDelay) * 100;
        return next > 100 ? 100 : next;
      });
    }, intervalTime);

    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [slides, current]);

  if (!slides.length) return null;

  return (
    <div className="relative w-full h-[320px] md:h-[640px] overflow-hidden">
      {slides.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={slide.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.poster_full}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-end items-center pb-[40px] md:pb-[56px] px-6 md:px-20 gap-3">
              <h1 className="font-futura text-white text-2xl text-center md:text-5xl font-bold">
                {slide.title}
              </h1>
              <p className="font-work text-white text-sm md:text-lg text-center max-w-xs md:max-w-lg line-clamp-2 md:line-clamp-3">
                {slide.description}
              </p>
              <a
                href={slide.trailer_url ?? "#"}
                className="font-work bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md text-sm md:text-base cursor-pointer"
              >
                Watch Trailer
              </a>
            </div>
          </div>
        );
      })}

      {/* Dots / Progress bar */}
      <div className="z-10 absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => {
          const isActive = index === current;
          return (
            <div
              key={index}
              className="w-12 h-2 rounded-full bg-white/50 overflow-hidden cursor-pointer"
              onClick={() => {
                setCurrent(index);
                setProgress(0);
              }}
            >
              {isActive && (
                <div
                  className="h-full bg-white transition-all duration-50"
                  style={{ width: `${progress}%` }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}