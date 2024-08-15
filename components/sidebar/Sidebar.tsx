"use client";

import { ISearch } from "@/interfaces/image";
import { searchStore } from "@/store/searchStore";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { NeedAiIcon } from "../icons/NeedAiIcon";
import { useTranslations } from "next-intl";
import LoginBtn from "../loginBtn/LoginBtn";
import { PanelIcon } from "../icons/PanelIcon";
import { MOBILE_BREAKPOINT } from "@/utilities/constants";
import useResize from "@/hooks/useResize";

import "./sidebar.scss";
import { userStore } from "@/store/userStore";
import { createClient } from "@/utilities/supabase/clients";
import { toast } from "react-toastify";

export const Sidebar = () => {
  const t = useTranslations();
  const { width } = useResize();
  const { user } = userStore();
  const supabase = createClient();

  const {
    searches,
    setSearches,
    setImages,
    selectedSearch,
    setSelectedSearch,
    setCurrentPage,
  } = searchStore();

  const isMobile = useMemo(() => width < MOBILE_BREAKPOINT, [width]);
  const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(!isMobile);

  const onSidebarItemClick = (search: ISearch) => {
    setCurrentPage(1);
    setImages(search.results);
    setSelectedSearch(search.id);
  };

  useEffect(() => {
    setSidebarIsOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    const fetchSearches = async () => {
      const { data: searches, error } = await supabase
        .from("searches")
        .select("id,search_text,results")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) {
        toast.error(t("general_error"));
      }

      if (searches) {
        const mappedSearches: ISearch[] = searches.map((search) => ({
          id: search.id,
          searchText: search.search_text,
          results: search.results,
        }));

        setSearches(mappedSearches);
      }
    };

    if (user) fetchSearches();
  }, [setSearches, supabase, t, user]);

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
          <div className="flex flex-col w-full">
            {user && (
              <div className="flex flex-col break-all mb-2">
                <span className="font-bold">
                  {t("sidebar_credits", { count: user?.credits })}
                </span>
                <span className="text-xs">{user.email}</span>
              </div>
            )}
            <LoginBtn />
          </div>
        </div>
      </div>
    </>
  );
};
