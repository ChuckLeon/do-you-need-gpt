import { ISearch } from "@/interfaces/image";
import { searchStore } from "@/store/searchStore";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

interface ISidebarSearch {
  search: ISearch;
  setSidebarIsClosed: Dispatch<SetStateAction<boolean>>;
  isMobile: boolean;
}

export const SidebarSearch = ({
  search,
  setSidebarIsClosed,
  isMobile,
}: ISidebarSearch) => {
  const { selectedSearch, setCurrentPage, setImages, setSelectedSearch } =
    searchStore();

  const onSidebarSearchClick = (search: ISearch) => {
    setCurrentPage(1);
    setImages(search.results);
    setSelectedSearch(search.id);

    if (isMobile) setSidebarIsClosed(true);
  };

  return (
    <button
      className={clsx(
        "btn btn-sm btn-ghost relative w-full justify-start text-left overflow-hidden whitespace-nowrap",
        { "btn-active": search.id === selectedSearch }
      )}
      onClick={() => onSidebarSearchClick(search)}
    >
      {search.searchText}
      <div
        className={clsx("absolute top-0 right-0 w-8 h-full", {
          "custom-gradient": search.id === selectedSearch,
        })}
      ></div>
    </button>
  );
};
