import React from "react";
import { FaStar } from "react-icons/fa";

interface RatingDisplayProps {
  rating: number;
  reviewCount?: number;
}

const RatingDisplay: React.FC<RatingDisplayProps> = ({ rating, reviewCount }) => {
  return (
    <div className="flex items-center mt-0">
      <FaStar className="text-[#ffc400] w-4 h-4 mr-1" />
      <span className="font-work text-[14px] text-[#3B82F6] font-semibold">
        {rating.toFixed(1)}{" "}
        {reviewCount !== undefined && (
          <span className="text-[14px] text-[#3B82F6] font-semibold">({reviewCount})</span>
        )}
      </span>
    </div>
  );
};

export default RatingDisplay;