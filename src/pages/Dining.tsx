import { useState, useEffect } from "react";
import Navbar from "../components/Header";
import CustomDropdown from "../components/CustomDropdown";
import AdBanner from "../components/AdBanner";
import Footer from "../components/Footer";
import API from "../utils/api";
import RatingDisplay from "../components/RatingDisplay";

interface Movie {
  id: number;
  title: string;
  description: string;
  poster_full: string; // this will be the full image URL (e.g. http://localhost:8000/media/posters/...)
  is_featured: true;
  genre: string;
  review_count: number | undefined;
  average_rating: number;
  // add other fields if needed
}

interface Dining {
  id: number;
  name: string;
  location: string;
  banner_image: string;
  is_featured: true;
  review_count: number | undefined;
  average_rating: number;
  cuisine_type: string;
  state: any;
}

interface Event {
  id: number;
  title: string;
  location: string;
  banner_image: string;
  is_featured: true;
  review_count: number | undefined;
  average_rating: number;
  category: string;
  state: any;
}

interface Business {
  id: number;
  name: string;
  business_type: string;
  banner_image: string;
  is_featured: true;
  review_count: number | undefined;
  average_rating: number;
  state: any;
}

interface Hangout {
  id: number;
  name: string;
  type: string;
  banner_image: string;
  is_featured: true;
  review_count: number | undefined;
  average_rating: number;
  state: any;
}

const Dining = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [dining, setDining] = useState<Dining[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [hangouts, setHangouts] = useState<Hangout[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await API.get("/movies/");
        setMovies(res.data);
      } catch (err) {
        console.error("Failed to fetch movies", err);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchDining = async () => {
      try {
        const res = await API.get("/dining/");
        setDining(res.data);
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
        setEvents(res.data);
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
        setBusinesses(res.data);
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
        setHangouts(res.data);
      } catch (err) {
        console.error("Failed to fetch hangout spots", err);
      }
    };

    fetchHangout();
  }, []);

  return (
    <div className="min-h-screen text-black bg-gradient-to-b from-[#eeeaff] to-[#ffffff]">
      <Navbar />

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
        
        <div className="max-w-[1280px] mx-auto md:mt-[32px] md:mb-2">
          <img
            src="/images/annoucement_blog_4_1610ab3b00.png"
            alt="Exclusive Blog Banner"
            className="w-full h-[80px] sm:h-[150px] md:h-[200px] object-cover rounded-[4px]"
          />
        </div>

      </section>

      {/* Trending Experiences */}
      <div className="flex flex-col justify-start gap-0 md:gap-4 mx-auto max-w-[1264px] mb-6">
        <section className="px-6 md:px-0 py-2 md:py-4">
          <h3 className="font-futura text-[16px] md:text-[20px] font-semibold mb-2 text-[#101828]">
            Movies You'll Love
          </h3>

          <div className="overflow-x-auto scroll-smooth scroll-snap-x scrollbar-hide">
            <div className="flex gap-2 md:gap-4 w-max snap-x snap-mandatory">
              {movies
                .filter((movie) => movie.is_featured)
                .map((movie) => (
                  <div
                    key={movie.id}
                    className="min-w-[160px] max-w-[140px] lg:max-w-[280px] rounded-[8px] overflow-hidden cursor-pointer"
                  >
                    <img
                      src={movie.poster_full}
                      alt={movie.title}
                      className="w-100 lg:w-[280px] object-cover h-[220px] lg:h-[140px] bg-white rounded-[8px]"
                    />
                    <div className="px-2 py-3 md:p-4">
                      <h4 className="font-roboto text-[16px] md:text-[16px] font-medium mb-1">
                        {movie.title}
                      </h4>
                      <div className="flex justify-between">
                        {/* <p className="font-roboto text-[16px] text-[#606972] truncate max-w-[100px] md:max-w-[160px] block">
                          {movie.genre
                            .map((person: { name: string }) => person.name)
                            .join(", ")}
                        </p> */}
                        <RatingDisplay
                          rating={movie.average_rating}
                          reviewCount={movie.review_count}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-0 py-2 md:py-4">
          <h3 className="font-futura text-[16px] md:text-[20px] font-semibold mb-2 text-[#101828]">
            Movies You'll Love
          </h3>

          <div className="overflow-x-auto scroll-smooth scroll-snap-x scrollbar-hide">
            <div className="flex gap-2 md:gap-4 w-max snap-x snap-mandatory">
              {movies
                .filter((movie) => movie.is_featured)
                .map((movie) => (
                  <div
                    key={movie.id}
                    className="min-w-[220px] max-w-[140px] lg:max-w-[280px] bg-white border border-gray-200 rounded-[8px] overflow-hidden cursor-pointer"
                  >
                    <img
                      src={movie.poster_full}
                      alt={movie.title}
                      className="w-100 lg:w-[280px] object-cover h-[120px] lg:h-[140px] bg-white"
                    />
                    <div className="px-4 py-3 md:p-4">
                      <h4 className="font-futura text-[15px] md:text-[16px] font-medium mb-1">
                        {movie.title}
                      </h4>
                      <div className="flex justify-between">
                        <p className="font-roboto text-[16px] text-[#606972] truncate max-w-[100px] md:max-w-[160px] block">
                          {/* {movie.genre
                            .map((person: { name: string }) => person.name)
                            .join(", ")} */}
                            Genre
                        </p>
                        <RatingDisplay
                          rating={movie.average_rating}
                          reviewCount={movie.review_count}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-0 py-4">
          <h3 className="font-futura text-[16px] md:text-[20px] font-semibold mb-2 text-[#101828]">
            Places to Dine Today
          </h3>

          <div className="overflow-x-auto scroll-smooth scroll-snap-x scrollbar-hide">
            <div className="flex gap-2 md:gap-4 w-max snap-x snap-mandatory">
              {dining
                .filter((dining) => dining.is_featured)
                .map((dining) => (
                  <div
                    key={dining.id}
                    className="min-w-[220px] max-w-[140px] lg:max-w-[280px] bg-white border border-gray-200 rounded-[8px] overflow-hidden cursor-pointer"
                  >
                    <img
                      src={dining.banner_image}
                      alt={dining.name}
                      className="w-100 lg:w-[280px] object-cover h-[120px] lg:h-[140px] bg-white"
                    />
                    <div className="px-4 py-3 md:p-4">
                      <h4 className="font-futura text-[15px] md:text-[16px] font-medium mb-1">
                        {dining.name}
                      </h4>
                      <div className="flex justify-between gap-2">
                        <p className="font-roboto text-[16px] text-[#606972] truncate max-w-[100px] md:max-w-[160px] block">
                          {dining.cuisine_type}
                        </p>
                        <RatingDisplay
                          rating={dining.average_rating}
                          reviewCount={dining.review_count}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-0 py-4">
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
        </section>

        <AdBanner />

        <section className="px-6 md:px-0 py-4">
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
        </section>

        <section className="px-6 md:px-0 py-4">
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
        </section>
      </div>

      <AdBanner />

      <Footer />
    </div>
  );
};

export default Dining;