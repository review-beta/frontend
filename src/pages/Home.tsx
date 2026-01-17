import { useState, useEffect } from "react";
import CustomDropdown from "../components/CustomDropdown";
// import AdBanner from "../components/AdBanner";
import Footer from "../components/Footer";
import API from "../utils/api";
import RatingDisplay from "../components/RatingDisplay";
import Header from "../components/Header";
import type { Tab } from "../constants/types"
import Tabs from "../components/Tabs";
import MovieListSkeleton from "../components/skeletons/MovieListSkeleton";
import PrimaryButton from "../components/PrimaryButton";
// import Hero from "../components/Hero";
import HeroBanner from "../components/HeroBanner";
import MobileAppCTA from "../components/MobileAppCTA";
import TopReviewers from "../components/TopReviewers";
import TopRatedHorizontalSection from "../components/TopRatedHorizontalSection";
import FeaturedSpotlightSection from "../components/FeaturedSpotlightSection";
import type { Movie, Dining, Event, Business, Hangout, } from "../constants/types";
import CategoryQuickAccessSection from "../components/CategoryQuickAccessSection";


const topRatedTabs: (Tab & {
  heading?: string;
  subText?: string;
  buttonText?: string;
  buttonLink?: string;
})[] = [
  {
    id: "all",
    name: "All Categories",
    heading: "Top-Rated Experiences",
    subText: "Top-rated picks across categories, chosen by the community.",
    // No button for "all"
  },
  {
    id: "dining",
    name: "Dining",
    heading: "Places to Dine Today",
    subText: "Top restaurants and eateries rated by visitors",
    buttonText: "View all dining",
    buttonLink: "/dining",
  },
  {
    id: "events",
    name: "Events",
    heading: "Don't Miss These Events",
    subText: "Events rated highly by our community this week",
    buttonText: "View all events",
    buttonLink: "/events",
  },
  {
    id: "businesses",
    name: "Businesses",
    heading: "Businesses to Discover",
    subText: "Top-rated businesses across categories",
    buttonText: "View all businesses",
    buttonLink: "/businesses",
  },
  {
    id: "hangouts",
    name: "Hangouts",
    heading: "Hotspots to Chill",
    subText: "Best hangout spots recommended by the community",
    buttonText: "View all hangouts",
    buttonLink: "/hangouts",
  },
];


const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [dining, setDining] = useState<Dining[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [hangouts, setHangouts] = useState<Hangout[]>([]);
  const [movieTabs, setMovieTabs] = useState<Tab[]>([]);
  const [activeMovieTab, setActiveMovieTab] = useState<string | number>("top");
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    const fetchDining = async () => {
      try {
        const res = await API.get("/dining/");
        setDining(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch dining", err);
      }
    };

    fetchDining();
  }, []);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await API.get("/events/");
        setEvents(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch events", err);
      }
    };

    fetchEvent();
  }, []);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const res = await API.get("/businesses/");
        setBusinesses(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch businesses", err);
      }
    };

    fetchBusiness();
  }, []);

  useEffect(() => {
    const fetchHangout = async () => {
      try {
        const res = await API.get("/hangout-spots/");
        setHangouts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch hangout spots", err);
      }
    };

    fetchHangout();
  }, []);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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


  return (
    <div className="min-h-screen text-black bg-[#ffffff]">
      <Header />

      <HeroBanner />

      <CategoryQuickAccessSection />

      {/* Hero Section */}
      <section className="px-6 md:px-12 py-6 md:py-10 text-center">
        <h2 className="font-futura text-2xl md:text-4xl font-bold mb-4 text-center leading-[30px]">
          <span className="inline-wrap">
            Discover the best of the best in{" "}
            <span className="inline-block align-middle">
              <CustomDropdown />
            </span>
          </span>
        </h2>

        {/* <AdBanner /> */}
        
        {/* <div className="max-w-[1280px] mx-auto md:mt-[32px] md:mb-2">
          <img
            src="/images/annoucement_blog_4_1610ab3b00.png"
            alt="Exclusive Blog Banner"
            className="w-full h-[80px] sm:h-[150px] md:h-[200px] object-cover rounded-[4px]"
          />
        </div> */}

      </section>

      {/* Trending Experiences */}
      <div className="flex flex-col justify-start gap-6 md:gap-6 mx-auto mb-6">

        <section className="flex flex-col py-2 md:py-4 gap-4">
          <div className="flex flex-col md:flex-row items-start lg:items-center justify-between gap-2 px-4 md:px-6 w-full max-w-[1280px] md:mx-auto">
            <div className="gap-1">
              <h3 className="font-futura text-[18px] md:text-[24px] text-[#101828]">
                Top Picks This Week
              </h3>
              <p className="font-work text-sm text-[#667085]">Movies people can’t stop talking about, rated by the community.</p>
            </div>
            <div className="hidden md:flex">
              <PrimaryButton text="View all movies" link="/movies" />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Tabs tabs={movieTabs} activeTabId={activeMovieTab} onTabChange={handleMovieTabChange} />
            <div className="overflow-x-auto scroll-smooth scroll-snap-x scrollbar-hide">
              {loading ? (
                <MovieListSkeleton count={5} />
              ) : (
              <div className="w-full max-w-[1280px] px-4 md:px-6 mx-auto flex gap-3 md:gap-4 snap-x snap-mandatory">
                {movies.map((movie) => (
                  <div key={movie.id} className="min-w-[220px] md:min-w-[280px] max-w-[140px] lg:max-w-[280px] bg-white border border-[#EBEBEB] rounded-[8px] overflow-hidden cursor-pointer p-1">
                    <img
                      src={movie.poster_thumbnail}
                      alt={movie.title}
                      className="w-100 lg:w-[272px] object-cover h-[280px] lg:h-[331px] bg-white rounded-t-[8px]"
                    />
                      <div className="flex flex-col px-2 py-3 md:p-3 gap-2">
                        <div className="flex flex-col gap-1">
                          <h4 className="font-futura text-[15px] md:text-[16px] font-medium truncate">
                            {movie.title}
                          </h4>
                          <p className="font-work text-[12px] text-[#606972] uppercase truncate block">
                            {movie.genre
                              .map((person: { name: string }) => person.name)
                              .join(" | ")}
                          </p>
                        </div>
                        <RatingDisplay
                          rating={movie.average_rating}
                          reviewCount={movie.review_count}
                        />
                        <p className="flex items-center gap-1 text-[12px] font-work text-[#64748B] uppercase">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-3 h-3"
                          >
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>

                          <span>
                            {new Date(`${movie.release_date}T00:00:00`).toLocaleDateString("en-GB", {
                              weekday: "short",
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </p>
                      </div>
                  </div>
                ))}
              </div>
              )}
            </div>
          </div>
          
          <div className="w-full max-w-[1280px] px-4 md:px-6 mx-auto flex md:hidden">
            <PrimaryButton text="View all movies" link="/movies" />
          </div>

        </section>

        <FeaturedSpotlightSection />

        <TopRatedHorizontalSection
          tabs={topRatedTabs}
          data={{
            dining,
            events,
            businesses,
            hangouts,
        }}
      />


        {/* <section className="px-6 md:px-0 py-4">
          <h3 className="font-futura text-[16px] md:text-[20px] font-semibold mb-2 text-[#101828]">
            Don't Miss These Events
          </h3>

          <div className="flex gap-2 md:gap-4 w-max snap-x snap-mandatory">
            <div className="flex gap-4 w-max snap-x snap-mandatory">
              {events
                .filter((events) => events.is_featured)
                .map((events) => (
                  <div
                    key={events.id}
                    className="min-w-[220px] max-w-[140px] lg:max-w-[280px] bg-white border border-gray-200 rounded-[8px] overflow-hidden cursor-pointer"
                  >
                    <img
                      src={events.banner_image}
                      alt={events.title}
                      className="w-100 lg:w-[280px] object-cover h-[120px] lg:h-[140px] bg-white"
                    />
                    <div className="px-4 py-3 md:p-4">
                      <h4 className="font-futura text-[15px] md:text-[16px] font-medium mb-1">
                        {events.title}
                      </h4>
                      <div className="flex justify-between gap-2">
                        <p className="font-roboto text-[16px] text-[#606972] truncate max-w-[100px] md:max-w-[160px] block">
                          {events.category}
                        </p>
                        <RatingDisplay
                          rating={events.average_rating}
                          reviewCount={events.review_count}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section> */}

        {/* <AdBanner /> */}

        {/* <section className="px-6 md:px-0 py-4">
          <h3 className="font-futura text-[16px] md:text-[20px] font-semibold mb-2 text-[#101828]">
            Businesses to Discover
          </h3>

          <div className="overflow-x-auto scroll-smooth scroll-snap-x scrollbar-hide">
            <div className="flex gap-2 md:gap-4 w-max snap-x snap-mandatory">
              {businesses
                .filter((businesses) => businesses.is_featured)
                .map((businesses) => (
                  <div
                    key={businesses.id}
                    className="min-w-[220px] max-w-[140px] lg:max-w-[280px] bg-white border border-gray-200 rounded-[8px] overflow-hidden cursor-pointer"
                  >
                    <img
                      src={businesses.banner_image}
                      alt={businesses.name}
                      className="w-100 lg:w-[280px] object-cover h-[120px] lg:h-[140px] bg-white"
                    />
                    <div className="px-4 py-3 md:p-4">
                      <h4 className="font-futura text-[15px] md:text-[16px] font-medium mb-1">
                        {businesses.name}
                      </h4>
                      <div className="flex justify-between gap-2">
                        <p className="font-roboto text-[16px] text-[#606972] truncate max-w-[100px] md:max-w-[160px] block">
                          {businesses.business_type}
                        </p>
                        <RatingDisplay
                          rating={businesses.average_rating}
                          reviewCount={businesses.review_count}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section> */}

        {/* <section className="px-6 md:px-0 py-4">
          <h3 className="font-futura text-[16px] md:text-[20px] font-semibold mb-2 text-[#101828]">
            Hotspots to Chill
          </h3>

          <div className="overflow-x-auto scroll-smooth scroll-snap-x scrollbar-hide">
            <div className="flex gap-2 md:gap-4 w-max snap-x snap-mandatory">
              {hangouts
                .filter((hangouts) => hangouts.is_featured)
                .map((hangouts) => (
                  <div
                    key={hangouts.id}
                    className="min-w-[220px] max-w-[140px] lg:max-w-[280px] bg-white border border-gray-200 rounded-[8px] overflow-hidden cursor-pointer"
                  >
                    <img
                      src={hangouts.banner_image}
                      alt={hangouts.name}
                      className="w-100 lg:w-[280px] object-cover h-[120px] lg:h-[140px] bg-white"
                    />
                    <div className="px-4 py-3 md:p-4">
                      <h4 className="font-futura text-[15px] md:text-[16px] font-medium mb-1">
                        {hangouts.name}
                      </h4>
                      <div className="flex justify-between gap-2">
                        <p className="font-roboto text-[16px] text-[#606972] truncate max-w-[100px] md:max-w-[160px] block">
                          {hangouts.type}
                        </p>
                        <RatingDisplay
                          rating={hangouts.average_rating}
                          reviewCount={hangouts.review_count}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section> */}
      </div>

      {/* <AdBanner /> */}

      <TopReviewers />

      <MobileAppCTA />

      <Footer />
    </div>
  );
};

export default Home;
