import { ISearch } from "@/interfaces/image";
import { searchStore } from "@/store/searchStore";
import clsx from "clsx";
import React from "react";

export const Sidebar = () => {
  const {
    searches,
    setImages,
    selectedSearch,
    setSelectedSearch,
    setCurrentPage,
  } = searchStore();

  const onSidebarItemClick = (search: ISearch) => {
    setCurrentPage(1);
    setImages(search.results);
    setSelectedSearch(search.id);
  };

  return (
    <div className="flex flex-col gap-4 py-10 px-6 pr-0 w-[15vw] ">
      <h2>History</h2>
      <div className="flex flex-col gap-2">
        {searches.map((search, i) => (
          <button
            key={`history-${i}`}
            className={clsx(
              "btn btn-sm btn-ghost w-full justify-start text-left",
              { "btn-active": search.id === selectedSearch }
            )}
            onClick={() => onSidebarItemClick(search)}
          >
            {search.searchText}
          </button>
        ))}
      </div>
    </div>
  );
};
