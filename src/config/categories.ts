export interface CategoryQuickAccess {
  id: string;
  label: string;
  href: string;
  icon: string; // path in /public/images
  bgColor?: string; // optional tailwind bg class
}

export const categoryQuickAccess: CategoryQuickAccess[] = [
  {
    id: "movies",
    label: "Movies",
    href: "/movies",
    icon: "/images/categories/movies.png",
    bgColor: "bg-[#EEF2FF]",
  },
  {
    id: "deals",
    label: "Deals",
    href: "/deals",
    icon: "/images/categories/deals.png",
    bgColor: "bg-[#EEF2FF]",
  },
  {
    id: "dining",
    label: "Dining",
    href: "/dining",
    icon: "/images/categories/dining.png",
    bgColor: "bg-[#ECFEFF]",
  },
  {
    id: "events",
    label: "Events",
    href: "/events",
    icon: "/images/categories/event.png",
    bgColor: "bg-[#FFF7ED]",
  },
  {
    id: "businesses",
    label: "Businesses",
    href: "/businesses",
    icon: "/images/categories/business.png",
    bgColor: "bg-[#F0FDF4]",
  },
  {
    id: "hangouts",
    label: "Hangouts",
    href: "/hangouts",
    icon: "/images/categories/hangout.png",
    bgColor: "bg-[#FDF4FF]",
  },
  {
    id: "shortlets",
    label: "Shortlets",
    href: "/shortlets",
    icon: "/images/categories/shortlets.png",
    bgColor: "bg-[#FDF4FF]",
  },
  {
    id: "more",
    label: "More",
    href: "/more",
    icon: "/images/categories/more.png",
    bgColor: "bg-[#FDF4FF]",
  },
];