import { IImage, ISearch } from "@/interfaces/image";
import { UUID } from "crypto";
import React from "react";

interface ISidebar {
  searches: ISearch[];
  setImages: (images: IImage[]) => void;
  setSelectedSearch: (id: string) => void;
}

export const Sidebar = ({
  searches,
  setImages,
  setSelectedSearch,
}: ISidebar) => {
  const onSidebarItemClick = (search: ISearch) => {
    setImages(search.results);
    setSelectedSearch(search.id);
  };

  return (
    <div className="flex flex-col gap-4 py-10 px-6 w-[15vw] ">
      <h2 className="font-bold">History</h2>
      <div className="flex flex-col gap-2">
        {searches.map((search, i) => (
          <button
            key={`history-${i}`}
            className="btn btn-ghost w-full justify-start py-2 px-4 min-h-fit h-fit text-accent"
            onClick={() => onSidebarItemClick(search)}
          >
            {search.searchText}
          </button>
        ))}
      </div>
    </div>
  );
};
