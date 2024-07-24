"use client";

import ImageCard from "@/components/image/ImageCard";
import { useRef, useState } from "react";
import { Image } from "@/interfaces/image";
import { OpenAiIcon } from "../components/icons/OpenAiIcon";
import { UnsplashIcon } from "../components/icons/UnsplashIcon";
import { PexelsIcon } from "../components/icons/PexelsIcon";
import { PixabayIcon } from "../components/icons/PixabayIcon";
import { SkeletonGrid } from "../components/skeleton/SkeletonGrid";

export default function Home() {
  const promptRef = useRef<HTMLInputElement>(null);
  const [openAiImage, setOpenAiImage] = useState<Image | null>();
  const [images, setImages] = useState<Image[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const fetchImages = async () => {
    try {
      setIsFetching(true);

      const response = await fetch(
        `/api/images?prompt=${encodeURIComponent(
          promptRef.current?.value ?? ""
        )}`
      );
      if (response.ok) {
        const data = await response.json();

        const openAi: Image = {
          src: data.openAi,
          href: data.openAi,
          platform: { name: "OpenAI", url: "openai.com", svg: <OpenAiIcon /> },
        };

        const unsplash: Image[] = data.unsplash.map((d: any) => {
          return {
            src: d.urls.regular,
            href: d.links.html,
            alt: d.description,
            platform: {
              name: "Unsplash",
              url: "https://www.unsplash.com",
              svg: <UnsplashIcon />,
            },
            creator: {
              name: d.user.name,
              url: d.user.portfolio_url,
            },
          };
        });

        const pexels: Image[] = data.pexels.map((d: any) => {
          return {
            src: d.src.large,
            href: d.url,
            alt: d.alt,
            platform: {
              name: "Pexels",
              url: "https://www.pexels.com",
              svg: <PexelsIcon />,
            },
            creator: {
              name: d.photographer,
              url: d.photographer_url,
            },
          };
        });

        const pixabay: Image[] = data.pixabay.map((d: any) => {
          return {
            src: d.webformatURL,
            href: d.pageURL,
            platform: {
              name: "Pixabay",
              url: "https://www.pixabay.com",
              svg: <PixabayIcon />,
            },
            creator: {
              name: d.user,
              url: d.pageURL,
            },
          };
        });

        setOpenAiImage(openAi);
        setImages([...unsplash, ...pexels, ...pixabay]);
      } else {
        throw new Error("Failed to fetch images");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex items-center justify-center mb-4 gap-4">
        <input
          ref={promptRef}
          type="text"
          className="input input-bordered input-primary w-full max-w-xs"
          placeholder="Write a prompt"
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

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
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
        </div>
      )}

      {isFetching && <SkeletonGrid />}
    </main>
  );
}
