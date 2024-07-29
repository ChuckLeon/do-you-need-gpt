"use client";

import ImageCard from "@/components/image/ImageCard";
import { OpenAiIcon } from "../components/icons/OpenAiIcon";
import { SkeletonGrid } from "../components/skeleton/SkeletonGrid";
import { usePrompts } from "@/hooks/usePrompts";
import Masonry from "react-masonry-css";
import { Waypoint } from "react-waypoint";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { SearchIcon } from "@/components/icons/SearchIcon";

export default function Home() {
  const {
    promptRef,
    openAiImage,
    images,
    isFetching,
    currentPage,
    searches,
    isFetchingNewSearch,
    fetchNewSearch,
    loadMore,
  } = usePrompts();

  return (
    <main className="flex h-screen ">
      {searches.length > 0 && <Sidebar />}

      <div className="relative flex flex-col w-full overflow-hidden">
        <div className="flex flex-col items-center w-full h-full max-h-full p-12 overflow-y-auto no-scrollbar">
          {images.length === 0 && !isFetching && (
            <div className="m-auto text-center">
              <h1>Do you need GPT?</h1>
              <span>{`Let's find out!`}</span>
            </div>
          )}

          {images.length > 0 && !isFetchingNewSearch && (
            <Masonry
              breakpointCols={{
                default: 3,
                800: 2,
                600: 1,
              }}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {openAiImage?.src && (
                <ImageCard
                  src={openAiImage.src}
                  href={openAiImage.href}
                  alt="Open AI generated image"
                  platform={{
                    name: "OpenAI",
                    url: "openai.com",
                    svg: <OpenAiIcon />,
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
              <Waypoint
                onEnter={() => {
                  loadMore();
                }}
                fireOnRapidScroll
              />
            </Masonry>
          )}

          {isFetching && <SkeletonGrid />}
        </div>
        <div className="absolute bottom-0 flex gap-4 px-8 pb-8 w-full z-10 backdrop-blur-sm">
          <label className="input input-bordered input-primary flex items-center w-full gap-2">
            <input
              ref={promptRef}
              type="text"
              className="grow"
              placeholder="Write a prompt"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fetchNewSearch(promptRef.current?.value ?? "");
                }
              }}
            />
            <SearchIcon />
          </label>
        </div>
      </div>
    </main>
  );
}
