import { useState, useEffect } from "react";
import CustomDropdown from "../components/CustomDropdown";
import AdBanner from "../components/AdBanner";
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
import type { TopRatedKey } from "../config/topRatedTabs";
import MobileAppCTA from "../components/MobileAppCTA";
import TopReviewers from "../components/TopReviewers";
import TopRatedHorizontalSection from "../components/TopRatedHorizontalSection";
import FeaturedSpotlightSection from "../components/FeaturedSpotlightSection";
import type { Movie, Dining, Event, Business, Hangout, State, City } from "../types/index";


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
  const [activeTab, setActiveTab] = useState<TopRatedKey | "all">("all");
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<Record<number, City>>({});
  const [states, setStates] = useState<Record<number, string>>({});

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

  const activeTabMeta = topRatedTabs.find(tab => String(tab.id) === activeTab);

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

  const getItemKey = (item: any) => {
    if ("cuisine_type" in item) return `dining-${item.id}`;
    if ("category" in item) return `event-${item.id}`;
    if ("business_type" in item) return `business-${item.id}`;
    if ("type" in item) return `hangout-${item.id}`;
    return `item-${item.id}`;
  };

  const dataMap: Record<TopRatedKey, (Dining | Event | Business | Hangout)[]> = {
    dining,
    events,
    businesses,
    hangouts,
  };

  const itemsToRender =
    activeTab === "all"
      ? [...dining, ...events, ...businesses, ...hangouts]
      : dataMap[activeTab] || [];

  // Sort by average_rating descending
  const sortedItems = [...itemsToRender].sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0));

  // Pick most rated item
  const featuredItem = sortedItems[0];

  // Remaining 9 items for horizontal scroll
  const horizontalItems = sortedItems.slice(1, 10);

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

      <HeroBanner />

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
              <div className="w-full max-w-[1280px] px-4 md:px-6 mx-auto flex gap-2 md:gap-4 w-max snap-x snap-mandatory">
                {movies.map((movie) => (
                  <div key={movie.id} className="min-w-[220px] max-w-[140px] lg:max-w-[280px] bg-white border border-[#EBEBEB] rounded-[8px] overflow-hidden cursor-pointer p-1">
                    <img
                      src={movie.poster_thumbnail}
                      alt={movie.title}
                      className="w-100 lg:w-[272px] object-cover h-[280px] lg:h-[331px] bg-white rounded-t-[8px]"
                    />
                      <div className="flex flex-col px-3 py-3 md:p-3 gap-3">
                        <div className="flex flex-col gap-1">
                          <h4 className="font-futura text-[15px] md:text-[16px] font-medium">
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
                        <p className="text-[12px] font-work text-[#64748B] uppercase">
                          {new Date(`${movie.release_date}T00:00:00`).toLocaleDateString("en-GB", {
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
          
          <div className="w-full max-w-[1280px] px-4 md:px-6 mx-auto flex md:hidden">
            <PrimaryButton text="View all movies" link="/movies" />
          </div>

        </section>

        <section className="flex flex-col py-2 md:py-4 gap-4">
          <Tabs tabs={topRatedTabs} activeTabId={activeTab} onTabChange={(tab) => setActiveTab(String(tab.id) as TopRatedKey | "all")} />

          <div className="flex flex-col md:flex-row items-start lg:items-center justify-between gap-2 px-4 md:px-6 w-full max-w-[1280px] md:mx-auto">
            <div className="gap-1">
              <h3 className="font-futura text-[18px] md:text-[24px] text-[#101828]">
                {activeTabMeta?.heading}
              </h3>
              <p className="font-work text-sm text-[#667085]">
                {activeTabMeta?.subText}
              </p>
            </div>
            {activeTab !== "all" && activeTabMeta?.buttonText && activeTabMeta?.buttonLink && (
              <div className="hidden md:flex">
                <PrimaryButton
                  text={activeTabMeta.buttonText}
                  link={activeTabMeta.buttonLink}
                />
              </div>
            )}
          </div>
          
            {featuredItem && (
              <div className="w-full max-w-[1280px] px-4 md:px-6 mx-auto mb-6">
                <div className="flex flex-col md:flex-row gap-4 bg-white border border-gray-200 md:border-none rounded-[8px] overflow-hidden pb-4">
                  <img
                    src={featuredItem.banner_image}
                    alt={featuredItem.name || featuredItem.title}
                    className="w-full md:w-[600px] h-[160px] md:h-auto border border-white md:border-gray-200 p-1 object-cover rounded-[8px]"
                  />
                  <div className="flex flex-col justify-start px-4 md:p-4 gap-4">
                    <div className="flex flex-col gap-1">
                      <h4 className="font-futura text-[18px] md:text-[28px] font-semibold">
                        {featuredItem.name || featuredItem.title}
                      </h4>
                      <p className="font-work text-[14px] md:text-[16px] text-[#606972] uppercase truncate block">
                        {featuredItem.business_type || featuredItem.type || featuredItem.category || featuredItem.cuisine_type || "-"}
                      </p>
                    </div>
                    <p className="font-work text-[#606972] text-[16px] md:text-[16px] max-w-xl line-clamp-3 md:line-clamp-4">
                      {featuredItem.description || "-"}
                    </p>
                    {featuredItem.random_review && (
                      <div className="border-l-4 border-blue-300 pl-4 max-w-xl">
                        <p className="italic text-[#475569] line-clamp-4 md:line-clamp-7">
                          “{featuredItem.random_review.comment}”
                        </p>

                        {(featuredItem.random_review.author ||
                          featuredItem.random_review.rating) && (
                          <div className="mt-1 flex items-center gap-2 text-sm text-[#64748B]">
                            {featuredItem.random_review.author && (
                              <span>— {featuredItem.random_review.author}</span>
                            )}

                            {featuredItem.random_review.rating !== undefined && (
                              <span>⭐ {featuredItem.random_review.rating}</span>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    <RatingDisplay
                      rating={featuredItem.average_rating}
                      reviewCount={featuredItem.review_count}
                    />
                      <p className="text-[14px] md:text-[16px] font-work text-[#64748B] uppercase">
                        {formatLocation(featuredItem)}
                      </p>
                  </div>
                </div>
              </div>
            )}

          <div className="overflow-x-auto scroll-smooth scroll-snap-x scrollbar-hide">
            <div className="w-full max-w-[1280px] px-4 md:px-6 mx-auto flex justify-start gap-2 md:gap-4 snap-x snap-mandatory">
              {horizontalItems.map((item) => (
                <div
                  key={getItemKey(item)}
                  className="min-w-[220px] lg:min-w-[280px] max-w-[220px] lg:max-w-[280px] bg-white border border-gray-200 rounded-[8px] overflow-hidden cursor-pointer"
                >
                  <img
                    src={item.banner_image}
                    alt={item.name || item.title}
                    className="w-100 lg:w-[280px] object-cover h-[120px] lg:h-[140px] bg-white"
                  />
                  <div className="flex flex-col px-3 py-3 md:p-3 gap-3">
                    <div className="flex flex-col gap-1">
                      <h4 className="font-futura text-[15px] md:text-[16px] font-medium">
                        {item.name || item.title}
                      </h4>
                      <p className="font-work text-[12px] text-[#606972] uppercase truncate block">
                        {item.business_type || item.type || item.category || item.cuisine_type || "-"}
                      </p>
                    </div>
                    <RatingDisplay
                      rating={item.average_rating}
                      reviewCount={item.review_count}
                    />
                    <p className="text-[12px] font-work text-[#64748B] uppercase">
                      {formatLocation(item)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

            {activeTab !== "all" && activeTabMeta?.buttonText && activeTabMeta?.buttonLink && (
              <div className="w-full max-w-[1280px] px-4 md:px-6 mx-auto flex md:hidden">
                <PrimaryButton
                  text={activeTabMeta.buttonText}
                  link={activeTabMeta.buttonLink}
                />
              </div>
            )}
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
