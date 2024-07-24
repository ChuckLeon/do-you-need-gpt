import React from "react";
import Masonry from "react-masonry-css";

export const SkeletonGrid = () => {
  return (
    <Masonry
      breakpointCols={{
        default: 3,
        700: 2,
        500: 1,
      }}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {Array.from({ length: 30 }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="skeleton h-[500px] w-full min-w-[25vw]"
        ></div>
      ))}
    </Masonry>
  );
};
