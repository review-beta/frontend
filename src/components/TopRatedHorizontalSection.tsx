import { useEffect, useState } from "react";
import Tabs from "./Tabs";
import RatingDisplay from "./RatingDisplay";
import PrimaryButton from "./PrimaryButton";
import type { Tab } from "../constants/types";
import type { TopRatedKey } from "../config/topRatedTabs";
import API from "../utils/api";

interface Props {
  tabs: (Tab & {
    heading?: string;
    subText?: string;
    buttonText?: string;
    buttonLink?: string;
  })[];
  data: Record<TopRatedKey, any[]>;
}

interface City {
  id: number;
  name: string;
  state: number;
}

interface State {
  id: number;
  name: string;
}

const TopRatedHorizontalSection = ({ tabs, data }: Props) => {
  const [activeTab, setActiveTab] = useState<TopRatedKey | "all">("all");
    const [cities, setCities] = useState<Record<number, City>>({});
    const [states, setStates] = useState<Record<number, string>>({});

  const activeTabMeta = tabs.find(tab => String(tab.id) === activeTab);

  const items =
    activeTab === "all"
      ? Object.values(data).flat()
      : data[activeTab] || [];

  const sortedItems = [...items].sort(
    (a, b) => (b.average_rating || 0) - (a.average_rating || 0)
  );

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

  const getItemKey = (item: any) => { 
    if ("cuisine_type" in item) return `dining-${item.id}`;
    if ("category" in item) return `event-${item.id}`;
    if ("business_type" in item) return `business-${item.id}`;
    if ("type" in item) return `hangout-${item.id}`;
    return `item-${item.id}`;
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
    <section className="flex flex-col py-2 md:py-4 gap-4">
        <Tabs tabs={tabs} activeTabId={activeTab} onTabChange={(tab) => setActiveTab(String(tab.id) as TopRatedKey | "all")} />
        

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
                <PrimaryButton text={activeTabMeta.buttonText} link={activeTabMeta.buttonLink} />
                </div>
            )}
        </div>

        <div className="overflow-x-auto scroll-smooth scroll-snap-x scrollbar-hide">
        <div className="w-full max-w-[1280px] px-4 md:px-6 mx-auto flex justify-start gap-2 md:gap-4 snap-x snap-mandatory">
            {sortedItems.slice(0, 10).map(item => (
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
            <PrimaryButton text={activeTabMeta.buttonText} link={activeTabMeta.buttonLink} />
            </div>
        )}
    </section>
  );
};

export default TopRatedHorizontalSection;