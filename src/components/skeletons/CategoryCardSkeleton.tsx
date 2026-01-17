const CategoryCardSkeleton = () => {
  return (
    <div
      className="
        flex flex-col items-center justify-center gap-3
        min-w-[96px] md:min-w-[120px]
        p-4 rounded-xl border border-gray-200
        bg-white
        animate-pulse
      "
    >
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200" />

      <div className="h-3 w-16 rounded bg-gray-200" />
    </div>
  );
};

export default CategoryCardSkeleton;