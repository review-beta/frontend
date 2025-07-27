import { useState, useEffect} from 'react';
import Navbar from '../components/Header';
import CustomDropdown from '../components/CustomDropdown';
import AdBanner from '../components/AdBanner';
import Footer from '../components/Footer';
import API from '../utils/api';

interface Movie {
  id: number;
  title: string;
  description: string;
  poster_url: string; // this will be the full image URL (e.g. http://localhost:8000/media/posters/...)
  is_featured: true;
  // add other fields if needed
}

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

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

  return (
    <div className="min-h-screen text-black bg-gradient-to-b from-[#eeeaff] to-[#ffffff]">

      <Navbar />

      <AdBanner />

      {/* Hero Section */}
      <section className="px-6 md:px-12 py-6 md:py-10 text-center">
        <h2 className="font-futura text-2xl md:text-4xl font-bold mb-2 text-center">
            <span className="inline-wrap">
                Discover the best of the best in{' '}
            <span className="inline-block align-middle">
            <CustomDropdown />
            </span>
            </span>
        </h2>

        <p className="font-work text-gray-800 mb-4 text-[15px] md:text-[18px]">Exclusive experiences and reviews, curated for your enjoyment.</p>
      </section>

      {/* Trending Experiences */}
      <section className="max-w-[1264px] mx-auto px-6 md:px-0 py-0">
        <h3 className="font-futura text-xl font-semibold mb-3 text-[#444]">Trending Experiences</h3>

        <div className="overflow-x-auto scroll-smooth scroll-snap-x scrollbar-hide">
            <div className="flex gap-4 w-max snap-x snap-mandatory">
            {movies.filter((movie) => movie.is_featured).map((movie) => (
                <div
                  key={movie.id}
                  className="min-w-[250px] max-w-[240px] lg:max-w-[296px] bg-white border border-gray-200 rounded-[16px] overflow-hidden cursor-pointer"
                >
                  <img
                    src={movie.poster_url}
                    alt={movie.title}
                    className="w-100 lg:w-[296px] object-cover h-[320px] lg:h-[360px] bg-white"
                  />
                  <div className="p-4">
                    <h4 className="font-futura text-lg font-medium mb-1">{movie.title}</h4>
                    <p className="font-work text-sm text-zinc-400">{movie.description}</p>
                  </div>
                </div>
              ))}
            </div>
        </div>
        </section>

      <Footer />
    </div>
  );
};

export default Home;