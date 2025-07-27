import React from 'react';
import Navbar from '../components/Header';
import CustomDropdown from '../components/CustomDropdown';
import AdBanner from '../components/AdBanner';
import Footer from '../components/Footer';

const Home: React.FC = () => {
    const images = [
    "/images/cgdaylzgkzz6vaqbppk1.png",
    "/images/euj7ndbteblq3exvk6b2.jpg",
    "/images/hqkfkbebwk643tpgka6w.jpg",
    "/images/xch3jywsmlegqwn4ngif.jpg",
    "/images/cgdaylzgkzz6vaqbppk1.png",
    "/images/hqkfkbebwk643tpgka6w.jpg",
    ];

  return (
    <div className="min-h-screen text-black bg-gradient-to-b from-[#eeeaff] to-[#ffffff]">

      <Navbar />

      <AdBanner />

      {/* Hero Section */}
      <section className="px-6 md:px-12 py-6 md:py-10 text-center">
        <h2 className="font-futura text-2xl md:text-4xl font-bold mb-2 text-center">
            <span className="inline-wrap">
                Discover the best hangout spots in{' '}
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
            {images.map((src, i) => (
                <div
                key={i}
                className="min-w-[250px] bg-white border border-gray-200 rounded-[16px] overflow-hidden cursor-pointer"
                >
                <img
                    src={src}
                    alt={`Experience ${i + 1}`}
                    className="w-[296px] object-contain bg-white"
                />
                <div className="p-4">
                    <h4 className="text-lg font-medium mb-1">Exclusive Party {i + 1}</h4>
                    <p className="text-sm text-zinc-400">Top venue • Music • Drinks</p>
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