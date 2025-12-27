interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="join">
      {pages.map((page) => (
        <input
          key={page}
          className="join-item btn btn-square btn-sm bg-purple-400/80 text-white hover:bg-purple-500/80 focus:ring-2 focus:ring-purple-300"
          type="radio"
          name="options"
          aria-label={String(page)}
          checked={currentPage === page}
          onChange={() => onPageChange(page)}
        />
      ))}
    </div>
  );
}
