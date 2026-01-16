import React from "react";
import type { Tab } from "../constants/types";

interface TabsProps {
  tabs: Tab[];
  activeTabId: string | number | null; // parent-controlled
  onTabChange?: (tab: Tab) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTabId, onTabChange }) => {
  const handleTabClick = (tab: Tab) => {
    if (onTabChange) onTabChange(tab);
  };

  return (
    <div className="overflow-x-auto scroll-smooth scroll-snap-x scrollbar-hide">
      <ul className="w-full max-w-[1280px] px-4 md:px-6 mx-auto flex gap-2 md:gap-4 text-sm font-medium text-gray-700 list-none overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <li key={tab.id} className="snap-start">
            <button
              type="button"
              onClick={() => handleTabClick(tab)}
              className={`font-futura px-4 lg:px-3 py-2 rounded-[50px] whitespace-nowrap transition cursor-pointer
                ${
                  activeTabId === tab.id
                    ? "bg-[#EFF6FF] text-[#3B82F6] px-6 lg:px-4 border border-[#DCEBFF]"
                    : "hover:bg-[#EFF6FF] text-[#64748B] border border-[#E3E3E3]"
                }`}
            >
              {tab.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabs;