import React, { useState, useEffect} from 'react';
import Navbar from '../components/Header';
import CustomDropdown from '../components/CustomDropdown';
import AdBanner from '../components/AdBanner';
import Footer from '../components/Footer';
import axios from 'axios'

interface Movie {
  id: number;
  title: string;
  description: string;
  poster_url: string; // this will be the full image URL (e.g. http://localhost:8000/media/posters/...)
  // add other fields if needed
}

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/movies/') // replace with your correct base API
      .then(res => setMovies(res.data))
      .catch(err => {
        console.error('Failed to fetch movies:', err);
      });
  }, []);

  return (
    <div className="min-h-screen text-black bg-gradient-to-b from-[#eeeaff] to-[#ffffff]">

      <Navbar />

      <AdBanner />

      {/* Hero Section */}
      <section className="px-6 md:px-12 py-6 md:py-10 text-center">
        <h2 className="font-futura text-2xl md:text-4xl font-bold mb-2 text-center">
            <span className="inline-wrap">
                Discover the best movies in{' '}
            <span className="inline-block align-middle">
            <CustomDropdown />
            </span>
            </span>
        </h2>

        <p className="font-work text-gray-800 mb-4 text-[15px] md:text-[18px]">Exclusive experiences and reviews, curated for your enjoyment.</p>
      </section>

      {/* Trending Experiences */}
      <section className="max-w-[1264px] mx-auto px-6 md:px-0 py-6">
        <h3 className="font-futura text-2xl font-semibold mb-6">Trending Experiences</h3>

        <div className="overflow-x-auto scroll-smooth scroll-snap-x scrollbar-hide">
            <div className="flex gap-4 w-max snap-x snap-mandatory">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="min-w-[250px] bg-white border border-gray-200 rounded-[16px] overflow-hidden cursor-pointer"
                >
                  <img
                    src={movie.poster_url}
                    alt={movie.title}
                    className="w-[296px] h-[180px] object-cover bg-white"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-medium mb-1">{movie.title}</h4>
                    <p className="text-sm text-zinc-400">{movie.description}</p>
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