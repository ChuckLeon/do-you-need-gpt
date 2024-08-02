import { ISearch } from "@/interfaces/image";
import { searchStore } from "@/store/searchStore";
import clsx from "clsx";
import React from "react";
import { NeedAiIcon } from "../icons/NeedAiIcon";
import { useTranslations } from "next-intl";

export const Sidebar = () => {
  const t = useTranslations();

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
    <div className="flex flex-col gap-4 py-12 px-6 pr-0 w-[15vw] ">
      <div className="flex items-center">
        <NeedAiIcon />
        <h2>{t("sidebar_title")}</h2>
      </div>
      <div className="flex flex-col gap-2">
        {searches.map((search, i) => (
          <button
            key={`history-${i}`}
            className={clsx(
              "btn btn-sm btn-ghost relative w-full justify-start text-left overflow-hidden whitespace-nowrap",
              { "btn-active": search.id === selectedSearch }
            )}
            onClick={() => onSidebarItemClick(search)}
          >
            {search.searchText}
            <div
              className={clsx("absolute top-0 right-0 w-8 h-full", {
                "custom-gradient": search.id === selectedSearch,
              })}
            ></div>
          </button>
        ))}
      </div>
    </div>
  );
};
