import React from "react";
import Masonry from "react-masonry-css";

export const SkeletonGrid = () => {
  return (
    <Masonry
      breakpointCols={{
        default: 3,
        800: 2,
        600: 1,
      }}
      className="masonry"
      columnClassName="masonry_column"
    >
      {Array.from({ length: 30 }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="skeleton h-[350px] w-full min-w-[25vw]"
        ></div>
      ))}
    </Masonry>
  );
};
