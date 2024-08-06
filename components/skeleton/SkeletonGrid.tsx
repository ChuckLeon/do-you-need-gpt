import React from "react";
import Masonry from "react-masonry-css";

export const SkeletonGrid = () => {
  return (
    <Masonry
      breakpointCols={{
        default: 5,
        1440: 4,
        1080: 3,
        768: 2,
      }}
      className="masonry"
      columnClassName="masonry_column"
    >
      {Array.from({ length: 30 }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="skeleton h-[250px] w-[40vw] md:h-[300px] md:w-[18vw] md:min-w-[200px]"
        ></div>
      ))}
    </Masonry>
  );
};
