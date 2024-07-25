"use client";

import ImageCard from "@/components/image/ImageCard";
import { OpenAiIcon } from "../components/icons/OpenAiIcon";
import { SkeletonGrid } from "../components/skeleton/SkeletonGrid";
import { usePrompts } from "@/hooks/usePrompts";
import Masonry from "react-masonry-css";
import { Waypoint } from "react-waypoint";
import { Sidebar } from "@/components/sidebar/Sidebar";

export default function Home() {
  const {
    promptRef,
    openAiImage,
    images,
    isFetching,
    currentPage,
    searches,
    fetchImages,
    loadMore,
  } = usePrompts();

  return (
    <main className="flex h-screen ">
      {searches.length > 0 && <Sidebar />}

      <div className="flex flex-col w-full overflow-hidden">
        <div className="flex flex-col items-center w-full h-full max-h-[95dvh] p-12 overflow-y-auto">
          {images.length === 0 && !isFetching && (
            <div className="m-auto text-center">
              <h1>Do you need GPT?</h1>
              <span>{`Let's find out!`}</span>
            </div>
          )}

          {images.length > 0 && (
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
        <div className="flex items-center justify-center mt-auto mb-8 gap-4 px-40 w-full z-10">
          <input
            ref={promptRef}
            type="text"
            className="input input-bordered input-primary w-full"
            placeholder="Write a prompt"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fetchImages(promptRef.current?.value);
              }
            }}
          />
          <button
            className="btn btn-primary"
            onClick={() => fetchImages(promptRef.current?.value)}
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
