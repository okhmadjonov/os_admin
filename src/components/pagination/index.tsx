import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Pagination.module.scss";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  prevLabel?: string;
  nextLabel?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  prevLabel = "Previous",
  nextLabel = "Next",
}) => {
  if (totalPages <= 0) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={`${styles.paginationContainer} ${className}`}>
      <div className={styles.pagination}>
        <button
          className={styles.pageBtn}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <ChevronLeft size={16} /> {prevLabel}
        </button>

        {pages.map((page) => (
          <button
            key={page}
            className={`${styles.pageBtn} ${styles.numBtn} ${
              page === currentPage ? styles.activeNum : ""
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          className={styles.pageBtn}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          {nextLabel} <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
