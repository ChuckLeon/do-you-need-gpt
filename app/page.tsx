"use client";

import ImageCard from "@/components/image/ImageCard";
import { OpenAiIcon } from "../components/icons/OpenAiIcon";
import { SkeletonGrid } from "../components/skeleton/SkeletonGrid";
import { usePrompts } from "@/hooks/usePrompts";
import Masonry from "react-masonry-css";

export default function Home() {
  const { promptRef, openAiImage, images, isFetching, fetchImages } =
    usePrompts();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex items-center justify-center mb-4 gap-4">
        <input
          ref={promptRef}
          type="text"
          className="input input-bordered input-primary w-full max-w-xs"
          placeholder="Write a prompt"
          autoFocus
        />
        <button className="btn btn-primary" onClick={fetchImages}>
          Send
        </button>
      </div>

      {openAiImage?.src && (
        <div className="mb-4">
          <ImageCard
            src={openAiImage.src}
            href={openAiImage.href}
            alt="Open AI generated image"
            platform={{
              name: "OpenAI",
              url: "openai.com",
              svg: <OpenAiIcon />,
            }}
          />
        </div>
      )}

      {images.length > 0 ??
        (!isFetching && (
          <Masonry
            breakpointCols={{
              default: 3,
              700: 2,
              500: 1,
            }}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
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
                key={`image-${image.src}`}
              />
            ))}
          </Masonry>
        ))}

      {isFetching && <SkeletonGrid />}
    </main>
  );
}
