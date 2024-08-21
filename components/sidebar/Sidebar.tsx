"use client";

import { ISearch } from "@/interfaces/image";
import { searchStore } from "@/store/searchStore";
import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { PanelIcon } from "../icons/PanelIcon";
import { MOBILE_BREAKPOINT } from "@/utilities/constants";
import useResize from "@/hooks/useResize";

import "./sidebar.scss";
import { userStore } from "@/store/userStore";
import { createClient } from "@/utilities/supabase/clients";
import { toast } from "react-toastify";
import { useClickOutside } from "@/hooks/useClickOutside";
import { SidebarNoResults } from "./SidebarNoResults";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarSearch } from "./SidebarSearch";

export const Sidebar = () => {
  const t = useTranslations();
  const { width } = useResize();
  const { user } = userStore();
  const supabase = createClient();

  const { searches, setSearches } = searchStore();

  const isMobile = useMemo(() => width < MOBILE_BREAKPOINT, [width]);
  const [sidebarIsClosed, setSidebarIsClosed] = useState<boolean>(isMobile);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => {
    if (!sidebarIsClosed && isMobile) setSidebarIsClosed(true);
  });

  useEffect(() => {
    setSidebarIsClosed(isMobile);
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
        className={clsx("sidebar-btn", { hide: !sidebarIsClosed })}
        onClick={() => setSidebarIsClosed((prev) => !prev)}
      >
        <PanelIcon />
      </button>
      <div
        className={clsx("sidebar-background", { hide: sidebarIsClosed })}
      ></div>
      <div className={clsx("sidebar", { closed: sidebarIsClosed })} ref={ref}>
        <SidebarHeader setSidebarIsClosed={setSidebarIsClosed} />

        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-2">
            {searches.map((search, i) => (
              <SidebarSearch
                key={`history-${i}`}
                search={search}
                setSidebarIsClosed={setSidebarIsClosed}
                isMobile={isMobile}
              />
            ))}
          </div>

          {searches.length === 0 && <SidebarNoResults />}
          <SidebarFooter />
        </div>
      </div>
    </>
  );
};
