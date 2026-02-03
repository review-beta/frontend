import { useEffect, useState, useRef } from "react";
import API from "../utils/api";

interface Movie {
  id: number;
  title: string;
  description: string;
  poster_full: string;
  trailer_url?: string;
  release_date: string;
  genre: { name: string }[];
}

export default function HeroBanner() {
  const [slides, setSlides] = useState<Movie[]>([]);
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  const slideInterval = useRef<number | null>(null);
  const progressInterval = useRef<number | null>(null);

  const slideDelay = 10000;

  // Fetch movies
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

  // Slide change
  useEffect(() => {
    if (!slides.length) return;

    slideInterval.current = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setProgress(0);
    }, slideDelay);

    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, [slides]);

  // Progress bar
  useEffect(() => {
    if (!slides.length) return;

    const intervalTime = 50;
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
    <div className="relative w-full overflow-hidden">
      {/* Image area */}
      <div className="relative h-[240px] lg:h-[560px]">
        {slides.map((slide, index) => {
          const isActive = index === current;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img
                src={slide.poster_full}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              {/* Upcoming badge */}
              <div className="absolute top-4 left-4 bg-green-600 text-white flex items-center gap-2 px-3 py-1 rounded-full text-xs font-work z-20">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" />
                  <path d="M12 7V12L15 14" stroke="white" strokeWidth="2" />
                </svg>
                Upcoming
              </div>
            </div>
          );
        })}
      </div>

      {/* Black details row */}
      <div className="bg-[#171717] text-white px-4 md:px-20 py-2 lg:py-4 flex items-center justify-between gap-6">
        <div className="flex flex-col gap-0 lg:gap-1 max-w-xl">
          <p className="font-work text-[10px] md:text-[14px] text-gray-300 line-clamp-1 uppercase">
            {slides[current].genre.map((g) => g.name).join(" | ")}
          </p>
          <h1 className="font-futura text-[16px] md:text-3xl font-bold line-clamp-1">
            {slides[current].title}
          </h1>
          <p className="font-work text-[12px] md:text-base text-gray-300 line-clamp-1 uppercase">
            {slides[current].release_date}
          </p>
        </div>

        <a
          href={slides[current].trailer_url ?? "#"}
          className="shrink-0 font-work border-[1px] border-white text-white px-2 lg:px-4 py-2 rounded-md text-sm md:text-base"
        >
          Watch Trailer
        </a>
      </div>

      {/* Light grey progress row */}
      <div className="bg-[#f7f7f7] px-6 md:px-20 py-4">
        <div className="max-w-[160px] mx-auto flex gap-2">
          {slides.map((_, index) => {
            const isActive = index === current;
            return (
              <div
                key={index}
                className="flex-1 w-12 h-2 rounded-full bg-[#e7e7e7] overflow-hidden cursor-pointer"
                onClick={() => {
                  setCurrent(index);
                  setProgress(0);
                }}
              >
                {isActive && (
                  <div
                    className="h-full bg-gray-400/50 transition-all duration-50"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}