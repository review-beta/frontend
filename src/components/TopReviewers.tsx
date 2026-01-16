import { useEffect, useState } from "react";
import API from "../utils/api";
import defaultAvatar from "/images/default-avatar.svg";

interface Reviewer {
  id: number;
  username: string;
  avatar: string | null;
  review_count: number;
}

const TopReviewers = () => {
  const [reviewers, setReviewers] = useState<Reviewer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopReviewers = async () => {
      try {
        const res = await API.get("/top-reviewers/");
        setReviewers(res.data);
      } catch (err) {
        console.error("Failed to fetch top reviewers", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopReviewers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-6">
        <p>Loading top reviewers...</p>
      </div>
    );
  }

  return (
    <section className="py-6">
      
        <h3 className="font-futura text-[18px] md:text-[24px] text-[#101828] text-left max-w-[1280px] px-4 md:px-6 md:mx-auto mb-4">
        Top Reviewers
        </h3>

      {/* Max width wrapper */}
      <div className="md:mx-auto">
        {/* Scroll container */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex px-4 md:px-6 md:mx-auto max-w-[1280px] justify-start gap-4">
            {reviewers.map((user) => (
              <div
                key={user.id}
                className="flex flex-col items-center min-w-[120px] max-w-[140px] p-2 bg-white rounded-lg border border-gray-200 cursor-pointer"
              >
                <img
                  src={user.avatar || defaultAvatar}
                  alt={user.username}
                  className="w-16 h-16 rounded-full object-cover border border-gray-300"
                />
                <p className="mt-2 font-work text-sm text-gray-700 text-center truncate w-full">
                  {user.username}
                </p>
                <p className="text-xs text-gray-400">{user.review_count} reviews</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopReviewers;