"use client";

import ImageCard from "@/components/image/ImageCard";
import { SkeletonGrid } from "../components/skeleton/SkeletonGrid";
import { useSearch } from "@/hooks/useSearch";
import Masonry from "react-masonry-css";
import { Waypoint } from "react-waypoint";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { NeedAiIcon } from "@/components/icons/NeedAiIcon";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { userStore } from "@/store/userStore";

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
        <div
          className="flex flex-col items-center w-full h-full max-h-full p-4 pb-24 overflow-y-auto no-scrollbar md:p-8 md:pb-32"
          ref={searchContainerRef}
        >
          {images.length === 0 && !isFetching && (
            <div className="m-auto text-center">
              <NeedAiIcon className="m-auto w-[100px] h-[100px]" />
              <h1>{t("home_title")}</h1>
              <span>{t("home_subtitle")}</span>
            </div>
          )}
          <div
            className={clsx({
              hidden: images.length === 0,
            })}
          >
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
              {openAiImage?.src && (
                <ImageCard
                  src={openAiImage.src}
                  href={openAiImage.href}
                  alt="Open AI generated image"
                  platform={{
                    name: "OpenAI",
                    url: "openai.com",
                    svg: "openai",
                  }}
                  creator={{
                    name: openAiImage.creator?.name ?? "",
                    url: openAiImage.creator?.url ?? "",
                  }}
                />
              )}
              {images.map((image) => (
                <ImageCard
                  src={image.src}
                  href={image.href}
                  alt={image.alt}
                  platform={{
                    name: image.platform?.name ?? "",
                    url: image.platform?.url ?? "",
                    svg: image.platform?.svg,
                  }}
                  creator={{
                    name: image.creator?.name ?? "",
                    url: image.creator?.url ?? "",
                  }}
                  key={`image-${image.src}-page-${currentPage}`}
                />
              ))}
            </Masonry>

            {images.length > 0 && !isFetching && (
              <Waypoint onEnter={loadMore} />
            )}
            {isFetching && (
              <span className="loading loading-spinner loading-lg flex m-auto p-6"></span>
            )}
          </div>

          {isFetchingNewSearch && <SkeletonGrid />}
        </div>
        <div className="absolute bottom-0 flex gap-4 px-2 pb-4 w-full z-10 backdrop-blur-sm md:px-6 md:pb-8">
          <label className="relative input input-bordered input-primary flex items-center w-full gap-2 focus-within:outline-offset-0 focus-within:outline-1">
            <input
              ref={promptRef}
              type="text"
              className="grow"
              placeholder={t("searchbar_placeholder")}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fetchNewSearch();
                }
              }}
            />
            <button
              className="btn btn-primary btn-sm "
              onClick={fetchNewSearch}
            >
              {isFetchingNewSearch ? (
                <span className="loading loading-spinner"></span>
              ) : (
                t("searchbar_button")
              )}
            </button>
          </label>
        </div>
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
