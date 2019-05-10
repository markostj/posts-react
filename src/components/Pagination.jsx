import React from "react";
// The maximum offset from current page
const MAX_OFFSET = 3;

// Defines an operator enum property
const OPERATOR = {
  Positive: "+",
  Negative: "-"
};

// Freezes operator object, so it's keys cannot be changed later on
Object.freeze(OPERATOR);

export const Pagination = ({
  totalCount,
  currentPage,
  itemsPerPage,
  setPage
}) => {
  // Don't render Pagination if total item count is 0 or undefined
  if (!totalCount) {
    return false;
  }

  // Calculate page count by dividing total and itemsPerPage
  const pageCount = totalCount / itemsPerPage;

  // Function that handles rendering controls
  const renderControls = () => {
    // Checks for which controls we need to show
    // Show previous controls if currentPage is bigger then page 1
    const showPrevious =
      currentPage > 1 && renderPaginationButton(currentPage - 1, "<");

    // Always render current page
    const showCurrent = renderPaginationButton(currentPage);

    // Show next controls if currentPage is lower then total page count
    const showNext =
      currentPage < pageCount && renderPaginationButton(currentPage + 1, ">");

    // Show positive and negative offsets from current page
    // Uses operator enum that we defined up topƒ
    const showNegativeOffset = renderOffsetControls(OPERATOR.Negative);
    const showPositiveOffset = renderOffsetControls(OPERATOR.Positive);

    // Array that will hold all currently visible controls
    const controlsToRender = [
      showPrevious,
      showNegativeOffset,
      showCurrent,
      showPositiveOffset,
      showNext
    ];

    // Returns an array of controls to be rendered
    return controlsToRender;
  };

  const renderOffsetControls = operator => {
    let offsetControls = Array.from(Array(MAX_OFFSET), (x, index) => {
      if (operator === OPERATOR.Positive) {
        // If it is positive offset, render controls until next index is bigger then page count
        const nextIndex = currentPage + ++index;
        return nextIndex <= pageCount && nextIndex;
      }

      // If it is negative offset, render controls until previous index is smaller then 1
      let prevIndex = currentPage - index;
      return prevIndex - 1 >= 1 && --prevIndex;
    });

    // Filter to remove undefined controls
    offsetControls = offsetControls.filter(control => control);

    // Sort ascending
    offsetControls = offsetControls.sort();

    // Return controls
    return offsetControls.map(control => renderPaginationButton(control));
  };

  // Function that renders pagination button
  // If button is current page, set it as active
  const renderPaginationButton = (page, customText) => (
    <li
      key={page}
      className={`pagination__item ${
        page === currentPage ? "pagination__item--active" : ""
      }`}
    >
      <button value={page} onClick={setPage}>
        {customText || page}
      </button>
    </li>
  );

  return (
    <>
      <ul className="pagination">{renderControls()}</ul>
      <p className="pagination__pages">total pages: {pageCount}</p>
    </>
  );
};
