"use client";

import { useSearch } from "@/hooks/useSearch";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { useTranslations } from "next-intl";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { userStore } from "@/store/userStore";
import { Searchbar } from "@/components/search/Searchbar";
import { SearchResults } from "@/components/search/SearchResults";

export default function Home() {
  const t = useTranslations();
  const {
    promptRef,
    searchContainerRef,
    openAiImage,
    images,
    isFetching,
    currentPage,
    isFetchingNewSearch,
    isGeneratingAiImage,
    fetchNewSearch,
    loadMore,
    fetchAiImage,
  } = useSearch();
  const { getUser } = useAuth();

  const { user } = userStore();

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [getUser, user]);

  return (
    <main className="flex h-[100dvh]">
      <Sidebar />

      <div className="relative flex flex-col w-full overflow-hidden">
        <SearchResults
          currentPage={currentPage}
          images={images}
          isFetching={isFetching}
          isFetchingNewSearch={isFetchingNewSearch}
          loadMore={loadMore}
          openAiImage={openAiImage}
          searchContainerRef={searchContainerRef}
        />
        <Searchbar
          promptRef={promptRef}
          isFetchingNewSearch={isFetchingNewSearch}
          fetchNewSearch={fetchNewSearch}
        />
        {images.length > 0 && user && user.credits > 0 && (
          <button
            className="fixed bottom-24 left-[50%] btn btn-primary btn-sm shadow-2xl min-w-56"
            onClick={fetchAiImage}
          >
            {isGeneratingAiImage ? (
              <span className="loading loading-spinner"></span>
            ) : (
              t("generate_ai_btn")
            )}
          </button>
        )}
      </div>
    </main>
  );
}
