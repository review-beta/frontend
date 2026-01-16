import MovieCardSkeleton from "./MovieCardSkeleton";

const MovieListSkeleton = ({ count = 1 }) => {
  return (
    <div className="w-full max-w-[1280px] px-4 md:px-6 mx-auto flex gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default MovieListSkeleton;