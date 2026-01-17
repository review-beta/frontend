import { Link } from "react-router-dom";
import clsx from "clsx";
import type { CategoryQuickAccess } from "../config/categories";

interface Props {
  item: CategoryQuickAccess;
}

const CategoryCard = ({ item }: Props) => {
  return (
    <Link
      to={item.href}
      className={clsx(
        "flex flex-col items-center justify-center gap-2",
        "min-w-[96px] md:min-w-[9px]",
        "p-4 rounded-md border border-gray-200",
        "hover:shadow-sm transition text-center",
        item.bgColor || "bg-white"
      )}
    >
      <img
        src={item.icon}
        alt={item.label}
        className="w-8 h-8 md:w-10 md:h-10 object-contain"
      />

      <span className="text-[13px] md:text-sm font-work font-medium text-[#101828] capitalize">
        {item.label}
      </span>
    </Link>
  );
};

export default CategoryCard;