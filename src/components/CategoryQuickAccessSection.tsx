import CategoryCard from "./CategoryQuickAccess";
import { categoryQuickAccess } from "../config/categories";
import CategoryCardSkeleton from "../components/skeletons/CategoryCardSkeleton";
import { useEffect, useState } from "react";

const CategoryQuickAccessSection = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading (replace later with real API call)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section className="pb-8 md:pb-[56px]">
      <div className="flex flex-col max-w-[1280px] mx-auto px-4 md:px-6 gap-2">
        <h3 className="font-futura text-[16px] md:text-[18px] text-[#101828]">
        Review by Category
        </h3>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide md:grid md:grid-cols-8">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <CategoryCardSkeleton key={i} />
              ))
            : categoryQuickAccess.map((cat) => (
            <CategoryCard key={cat.id} item={cat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryQuickAccessSection;