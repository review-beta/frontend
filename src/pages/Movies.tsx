import { useState, useEffect } from "react";
import CustomDropdown from "../components/CustomDropdown";
// import AdBanner from "../components/AdBanner";
import Footer from "../components/Footer";
import API from "../utils/api";
import RatingDisplay from "../components/RatingDisplay";
import Header from "../components/Header";
import type { Movie, State, City, Tab } from "../constants/types";
import MovieListSkeleton from "../components/skeletons/MovieListSkeleton";
// import PrimaryButton from "../components/PrimaryButton";
// import Hero from "../components/Hero";
// import HeroBanner from "../components/HeroBanner";
import MobileAppCTA from "../components/MobileAppCTA";


const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieTabs, setMovieTabs] = useState<Tab[]>([]);
  const [activeMovieTab, setActiveMovieTab] = useState<string | number>("top");
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<Record<number, City>>({});
  const [states, setStates] = useState<Record<number, string>>({});
  const [sortOption, setSortOption] = useState<string>("default");
  const [filterMovietype, setFilterMovietype] = useState<string | null>(null);
  const [filterGenre, setFilterGenre] = useState<string | null>(null);
  const [filterAgeRating, setFilterAgeRating] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const sortOptions = [
  { value: "default", label: "Default" },
  { value: "name-asc", label: "Name A-Z" },
  { value: "name-desc", label: "Name Z-A" },
  { value: "top-rated", label: "Top Rated" },
  { value: "least-rated", label: "Least Rated" },
  { value: "newest", label: "Release Date Newest" },
  { value: "oldest", label: "Release Date Oldest" },
];

const filteredMovies = movies
  .filter((movie) =>
  !filterMovietype ||
  (movie.movie_type && (movie.movie_type.slug === filterMovietype || String(movie.movie_type.id) === filterMovietype))
)
  .filter((movie) => (filterGenre ? movie.genre.some(g => g.name === filterGenre) : true))
  .filter((movie) => !filterAgeRating || movie.age_rating === filterAgeRating)

const sortedMovies = sortOption === "default"
  ? filteredMovies
  : [...filteredMovies].sort((a, b) => {
      switch (sortOption) {
        case "name-asc": return a.title.localeCompare(b.title);
        case "name-desc": return b.title.localeCompare(a.title);
        case "top-rated": return (b.average_rating || 0) - (a.average_rating || 0);
        case "least-rated": return (a.average_rating || 0) - (b.average_rating || 0);
        case "newest": return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
        case "oldest": return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
        default: return 0;
      }
    });

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await API.get("/states/");
        const map: Record<number, string> = {};
        (res.data || []).forEach((state: State) => {
          map[state.id] = state.name;
        });
        setStates(map);
      } catch (err) {
        console.error("Failed to fetch states", err);
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await API.get("/cities/");
        const map: Record<number, City> = {};
        (res.data || []).forEach((city: City) => {
          map[city.id] = city;
        });
        setCities(map);
      } catch (err) {
        console.error("Failed to fetch cities", err);
      }
    };

    fetchCities();
  }, []);

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     try {
  //       const res = await API.get("/movies/");
  //       setMovies(Array.isArray(res.data) ? res.data : []);
  //     } catch (err) {
  //       console.error("Failed to fetch movies", err);
  //     }
  //   };

  //   fetchMovies();
  // }, []);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const genres = Array.from(new Set(movies.flatMap(m => m.genre.map(g => g.name))));
  const ageRatings = [
  "G",      // General
  "PG",     // Parental guidance
  "PG-13",  
  "R",      
  "18+",
];

  useEffect(() => {
    const fetchMovieTypes = async () => {
      setLoading(true); // start loading while fetching tabs
      try {
        const res = await API.get("/movietype/");
        const types = Array.isArray(res.data) ? res.data : [];

        setMovieTabs([
          { id: "top", name: "Top Rated" }, // default tab
          ...types,
        ]);

        // set default active tab
        setActiveMovieTab("top");
      } catch (err) {
        console.error("Failed to fetch movie types", err);
      } finally {
        setLoading(false); 
      }
    };

    fetchMovieTypes();
  }, []);

  // Fetch movies whenever the tab changes
  useEffect(() => {
    const fetchMoviesByTab = async () => {
      setLoading(true); 
      try {
        let url = "/movies/?top_rated=1"; 

        if (activeMovieTab !== "top") {
          const selectedTab = movieTabs.find(tab => tab.id === activeMovieTab);
          if (selectedTab?.slug) {
            url = `/movies/?type=${selectedTab.slug}`;
          }
        }

        // const res = await API.get(url);

        const [res] = await Promise.all([
          API.get(url),
          delay(3000) // ensure skeleton shows at least 3 seconds
        ]);
        setMovies(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch movies", err);
        setMovies([]); // clear movies on error
      } finally {
        setLoading(false); // stop loading after fetch
      }
    };

    if (movieTabs.length && activeMovieTab !== null) {
      fetchMoviesByTab();
    }
  }, [activeMovieTab, movieTabs]);

  // Handle tab change
  const handleMovieTabChange = (tab: Tab) => {
    setActiveMovieTab(tab.id);
  };


  const formatLocation = (item: any) => {
    // Case 1: already a string (events)
    if (typeof item.city === "string") {
      return item.city;
    }

    // Case 2: city is an ID
    if (typeof item.city === "number") {
      const city = cities[item.city];
      if (!city) return "-";

      const stateName = states[city.state];
      return `${city.name}${stateName ? `, ${stateName}` : ""}`;
    }

    return "-";
  };

  return (
    <div className="min-h-screen text-black bg-[#ffffff]">
      <Header />
        
        {/* <div className="max-w-[1280px] mx-6 md:mx-auto mt-6 md:mt-[32px] md:mb-2">
          <img
            src="/images/annoucement_blog_4_1610ab3b00.png"
            alt="Exclusive Blog Banner"
            className="w-full h-[80px] sm:h-[120px] md:h-[150px] object-cover rounded-[4px]"
          />
        </div> */}

      {/* Hero Section */}
      <section className="px-6 md:pt-12 pt-6 md:pt-6 md:pb-2 text-center">

        <h2 className="font-futura text-2xl md:text-4xl font-bold mb-4 text-center leading-[30px]">
          <span className="inline-wrap">
            Discover the best of the best in{" "}
            <span className="inline-block align-middle">
              <CustomDropdown />
            </span>
          </span>
        </h2>

        {/* <AdBanner /> */}

      </section>

      {/* Trending Experiences */}
      <div className="flex flex-col justify-start gap-6 md:gap-6 mx-auto max-w-[1264px] mb-6">

        <section className="flex flex-col px-4 md:px-0 py-2 md:py-4 gap-4">
          <div className="flex flex-col md:flex-row items-start lg:items-center justify-between gap-2">
            <div className="gap-1">
              <h3 className="font-futura text-[18px] md:text-[24px] text-[#101828]">
                All Movies and Series
              </h3>
              <p className="font-work text-sm text-[#667085]">Movies people can’t stop talking about, rated by the community.</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 mt-2 md:flex-row justify-between">
              {/* Top row: Sort + Filter toggle */}
              <div className="flex justify-between items-center">
                {/* Sort */}
                <div className="flex items-center gap-2">
                  <label className="font-futura text-sm">Sort by:</label>
                  <div className="relative">
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="min-w-[140px] max-w-[140px] md:max-w-[240px] border border-[#E1E1E1] font-work text-[15px] px-4 pr-10 py-2 rounded-[50px] appearance-none focus:outline-none focus:ring-0 bg-white cursor-pointer">
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    {/* Chevron */}
                    <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* Filter toggle (mobile only) */}
                <button
                  onClick={() => setShowFilters(prev => !prev)}
                  className="md:hidden flex items-center justify-between gap-1 min-w-[140px] max-w-[140px] md:max-w-[240px] border border-[#E1E1E1] font-work text-[15px] px-4 py-2 rounded-[50px] appearance-none focus:outline-none focus:ring-0 bg-[#EFF6FF] cursor-pointer">
                  Filter
                  <svg className={`w-4 h-4 transition-transform ${
                      showFilters ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Filters */}
              <div
                className={`
                  flex gap-2
                  md:flex-row md:flex-wrap
                  overflow-x-auto scrollbar-hide
                  transition-all
                  ${showFilters ? "flex" : "hidden md:flex"}
                `}
              >
                {/* Movie type */}
                <div className="relative">
                  <select
                    value={filterMovietype || ""}
                    onChange={(e) => setFilterMovietype(e.target.value || null)}
                    className="min-w-[160px] max-w-[180px] md:max-w-[240px] border border-[#E1E1E1] font-work text-[15px] px-4 pr-10 py-2 rounded-[50px] appearance-none focus:outline-none focus:ring-0 bg-white cursor-pointer">
                    <option value="">All Movietypes</option>
                    {movieTabs
                      .filter(tab => tab.id !== "top")
                      .map(tab => (
                        <option key={tab.id} value={tab.slug || tab.id}>
                          {tab.name}
                        </option>
                      ))}
                  </select>

                  {/* Chevron */}
                  <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                  </svg>
                </div>

                {/* Genre */}
                <div className="relative">
                  <select
                    value={filterGenre || ""}
                    onChange={(e) => setFilterGenre(e.target.value || null)}
                    className="min-w-[160px] max-w-[180px] md:max-w-[240px] border border-[#E1E1E1] font-work text-[15px] px-4 pr-10 py-2 rounded-[50px] appearance-none focus:outline-none focus:ring-0 bg-white cursor-pointer">
                    <option value="">All Genres</option>
                    {genres.map(genre => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>

                  {/* Chevron */}
                  <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                  </svg>
                </div>

                {/* Age rating */}
                <div className="relative">
                  <select
                    value={filterAgeRating || ""}
                    onChange={(e) => setFilterAgeRating(e.target.value || null)}
                    className="min-w-[160px] max-w-[180px] md:max-w-[240px] border border-[#E1E1E1] font-work text-[15px] px-4 pr-10 py-2 rounded-[50px] appearance-none focus:outline-none focus:ring-0 bg-white cursor-pointer">
                    <option value="">All Ratings</option>
                    {ageRatings.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>

                  {/* Chevron */}
                  <svg
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>


            <div>
            {loading ? (
              <MovieListSkeleton count={8} />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {sortedMovies.map((movie) => (
                  <div
                    key={movie.id}
                    className="bg-white border border-[#EBEBEB] rounded-[8px] overflow-hidden cursor-pointer p-1"
                  >
                    <img
                      src={movie.poster_thumbnail}
                      alt={movie.title}
                      className="w-full object-cover h-[240px] lg:h-[331px] bg-white rounded-t-[8px]"
                    />

                    <div className="flex flex-col px-3 py-3 md:p-3 gap-3">
                      <div className="flex flex-col gap-1">
                        <h4 className="font-futura text-[15px] md:text-[16px] font-medium">
                          {movie.title}
                        </h4>
                        <p className="font-work text-[12px] text-[#606972] uppercase truncate">
                          {movie.genre.map((g) => g.name).join(" | ")}
                        </p>
                      </div>

                      <RatingDisplay
                        rating={movie.average_rating}
                        reviewCount={movie.review_count}
                      />

                      <p className="text-[12px] font-work text-[#64748B] uppercase">
                        {new Date(`${movie.release_date}T00:00:00`).toLocaleDateString(
                          "en-GB",
                          {
                            weekday: "short",
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          </div>
        </section>

        {/* <AdBanner /> */}
      </div>

      {/* <AdBanner /> */}

      <MobileAppCTA />

      <Footer />
    </div>
  );
};

export default Movies;