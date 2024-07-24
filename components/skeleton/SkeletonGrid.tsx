import React from "react";

interface ISkeletonGrid {
  columns?: number;
}

export const SkeletonGrid = ({ columns = 3 }: ISkeletonGrid) => {
  return (
    <div className={`grid grid-cols-${columns} gap-4`}>
      {Array.from({ length: 30 }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="skeleton h-[500px] w-full min-w-[25vw]"
        ></div>
      ))}
    </div>
  );
};
