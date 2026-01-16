const MovieCardSkeleton = () => {
  return (
    <div className="min-w-[220px] max-w-[140px] lg:max-w-[280px] bg-white border border-[#EBEBEB] rounded-[8px] overflow-hidden p-1 animate-pulse">
      <div className="w-100 lg:w-[272px] h-[280px] lg:h-[331px] bg-gray-200 rounded-t-[8px]" />
      <div className="flex flex-col px-3 py-3 md:p-3 gap-3">
        <div className="flex flex-col gap-1">
          <div className="h-4 md:h-5 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div> {/* for RatingDisplay placeholder */}
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;