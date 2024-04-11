import React from "react";

export default function Pagination({
  items,
  currentPage,
  setCurrentPage,
  pageSize,
  onPageChange,
}) {
  const pagesCount = Math.ceil(items / pageSize); // 100/10

  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  return (
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        {currentPage == 1 ? (
          <li class="page-item disabled">
            <a
              class="page-link"
              style={{ color: "black" }}
            >
              <span aria-hidden="true">&laquo;</span> Previous
            </a>
          </li>
        ) : (
          <li class="page-item">
            <a
              class="page-link"
              onClick={() =>
                setCurrentPage(currentPage == 1 ? currentPage : currentPage - 1)
              }
              style={{ color: "black", cursor: "pointer" }}
            >
              <span aria-hidden="true">&laquo;</span> Previous
            </a>
          </li>
        )}

        {pages.map((v) => (
          <li key={v} class="page-item">
            {currentPage == v ? (
              <a
                class="page-link active"
                onClick={() => onPageChange(v)}
                style={{ color: "white", cursor: "pointer" }}
              >
                {v}
              </a>
            ) : (
              <a
                class="page-link"
                onClick={() => onPageChange(v)}
                style={{ color: "black", cursor: "pointer" }}
              >
                {v}
              </a>
            )}
          </li>
        ))}
        {currentPage == pages[pages.length - 1] ? (
          <li class="page-item disabled">
            <a class="page-link" style={{ color: "black" }}>
              Next <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        ) : (
          <li class="page-item">
            <a
              class="page-link"
              style={{ color: "black", cursor: "pointer" }}
              onClick={() =>
                setCurrentPage(
                  currentPage == pages[pages.length - 1]
                    ? currentPage
                    : currentPage + 1
                )
              }
            >
              Next <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}
