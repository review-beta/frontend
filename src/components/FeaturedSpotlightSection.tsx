import { useEffect, useState } from "react";
import Tabs from "./Tabs";
import RatingDisplay from "./RatingDisplay";
import API from "../utils/api";
import type { State, City } from "../constants/types";
import {
  getItemMeta,
  getItemCategory,
  pickRandomFeatured
} from "../utils/contentHelpers";

const featuredTabs = [
  { id: "movies", name: "Movies" },
  { id: "dining", name: "Dining" },
  { id: "events", name: "Events" },
  { id: "businesses", name: "Businesses" },
  { id: "hangout-spots", name: "Hangouts" },
];

const FeaturedSpotlightSection = () => {
  const [activeTab, setActiveTab] = useState("movies");
  const [item, setItem] = useState<any>(null);
  const [cities, setCities] = useState<Record<number, City>>({});
  const [states, setStates] = useState<Record<number, string>>({});

  useEffect(() => {
  async function loadFeatured() {
    const res = await API.get(`/${activeTab}/`)
    const data = res.data
    setItem(pickRandomFeatured(data))
  }

  loadFeatured()
}, [activeTab])

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

  if (!item) return null;

  return (
    <section className="flex flex-col py-2 md:py-4 gap-4">
          <div className="flex flex-col md:flex-row items-start lg:items-center justify-between gap-2 px-4 md:px-6 w-full max-w-[1280px] md:mx-auto">
            <div className="gap-1">
              <h3 className="font-futura text-[18px] md:text-[24px] text-[#101828]">
                Editorial Features
              </h3>
              <p className="font-work text-sm text-[#667085]">Movies people can’t stop talking about, rated by the community.</p>
            </div>
          </div>
      <Tabs
        tabs={featuredTabs}
        activeTabId={activeTab}
        onTabChange={(tab) => setActiveTab(String(tab.id))}
      />
          
        <div className="w-full max-w-[1280px] px-4 md:px-6 mx-auto mb-6">
        <div className="flex flex-col md:flex-row gap-4 bg-white border border-gray-200 md:border-none rounded-[8px] overflow-hidden pb-4">
            <img
            src={item.banner_image || item.poster_full}
            alt={item.name || item.title}
            className="w-full md:w-[600px] h-[160px] md:h-auto md:max-h-[400px] border border-white md:border-gray-200 p-1 object-cover rounded-[8px]"
            />
            <div className="flex flex-col justify-start px-4 md:p-4 gap-4">
            <div className="flex flex-col gap-1">
                <h4 className="font-futura text-[18px] md:text-[28px] font-semibold">
                {item.name || item.title}
                </h4>
                <p className="font-work text-[14px] md:text-[16px] text-[#606972] uppercase truncate block">
                {getItemMeta(item, cities, states)}
                </p>
            </div>
            <p className="font-work text-[#606972] text-[16px] md:text-[16px] max-w-xl line-clamp-3 md:line-clamp-4">
                {item.description || "-"}
            </p>
            {item.random_review && (
                <div className="border-l-4 border-blue-300 pl-4 max-w-xl">
                <p className="italic text-[#475569] line-clamp-4 md:line-clamp-7">
                    “{item.random_review.comment}”
                </p>

                {(item.random_review.author ||
                    item.random_review.rating) && (
                    <div className="mt-1 flex items-center gap-2 text-sm text-[#64748B]">
                    {item.random_review.author && (
                        <span>— {item.random_review.author}</span>
                    )}

                    {item.random_review.rating !== undefined && (
                        <span>⭐ {item.random_review.rating}</span>
                    )}
                    </div>
                )}
                </div>
            )}
            <RatingDisplay
                rating={item.average_rating}
                reviewCount={item.review_count}
            />
                <p className="text-[14px] md:text-[16px] font-work text-[#64748B] uppercase">
                {getItemCategory(item)}
                </p>
            </div>
        </div>
        </div>
    </section>
  );
};

export default FeaturedSpotlightSection;