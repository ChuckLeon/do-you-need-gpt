import { ISearch } from "@/interfaces/image";
import { searchStore } from "@/store/searchStore";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { NeedAiIcon } from "../icons/NeedAiIcon";
import { useTranslations } from "next-intl";
import LoginBtn from "../loginBtn/LoginBtn";
import { PanelIcon } from "../icons/PanelIcon";
import { MOBILE_BREAKPOINT } from "@/utils/constants";
import useResize from "@/hooks/useResize";

import "./sidebar.scss";

export const Sidebar = () => {
  const t = useTranslations();
  const { width } = useResize();

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

  const isMobile = useMemo(() => width < MOBILE_BREAKPOINT, [width]);
  const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(!isMobile);

  useEffect(() => {
    setSidebarIsOpen(!isMobile);
  }, [isMobile]);

  return (
    <>
      <button
        className={clsx("sidebar-btn", { hide: sidebarIsOpen })}
        onClick={() => setSidebarIsOpen((prev) => !prev)}
      >
        <PanelIcon />
      </button>
      <div className={clsx("sidebar", { open: sidebarIsOpen })}>
        <div className="flex justify-between">
          <div className="flex items-center">
            <NeedAiIcon />
            <h2>{t("sidebar_title")}</h2>
          </div>
          <button
            className="p-1 btn btn-sm btn-circle"
            onClick={() => setSidebarIsOpen((prev) => !prev)}
          >
            <PanelIcon />
          </button>
        </div>
        <div className="flex flex-col justify-between h-full">
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
          {searches.length === 0 && (
            <div className="flex flex-col h-full">
              <p className="m-auto text-xs text-center">
                {t("sidebar_no_search")}
              </p>
            </div>
          )}
          <LoginBtn />
        </div>
      </div>
    </>
  );
};
