interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  hasNext,
  hasPrevious,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center mt-6">
      <div className="inline-flex items-center text-[14px] border-[1.3px] border-[#D0D5DD] rounded-[8px] overflow-hidden font-semibold">

        <button
          disabled={!hasPrevious}
          onClick={() => onPageChange(currentPage - 1)}
          className={`flex items-center justify-center gap-2 px-4 py-[10px] border-l border-[#D0D5DD] 
            ${!hasPrevious ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-50 cursor-pointer"}
          `}
        >
          <img src="/icons/chevron-left.svg" alt="Prev" className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1;
          const isActive = page === currentPage;

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-4 py-[10px] border-l border-[#D0D5DD] cursor-pointer 
                ${isActive ? "bg-[#F9FAFB] text-[#1D2939]" : "hover:bg-gray-50"}
              `}
            >
              {page}
            </button>
          );
        })}

        <button
          disabled={!hasNext}
          onClick={() => onPageChange(currentPage + 1)}
          className={`flex items-center justify-center gap-2 px-4 py-[10px] border-l border-[#D0D5DD]  
            ${!hasNext ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-50 cursor-pointer"}
          `}
        >
          <span>Next</span>
          <img src="/icons/chevron-right.svg" alt="Next" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}