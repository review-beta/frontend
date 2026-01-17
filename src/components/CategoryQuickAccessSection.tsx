import CategoryCard from "./CategoryQuickAccess";
import { categoryQuickAccess } from "../config/categories";

const CategoryQuickAccessSection = () => {
  return (
    <section className="py-4">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide md:grid md:grid-cols-8">
          {categoryQuickAccess.map((cat) => (
            <CategoryCard key={cat.id} item={cat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryQuickAccessSection;