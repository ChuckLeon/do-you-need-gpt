"use client";

import ImageCard from "@/components/image/ImageCard";
import PrimaryBtn from "../components/buttons/PrimaryBtn";
import { useRef, useState } from "react";
import { Image } from "@/interfaces/image";

export default function Home() {
  const promptRef = useRef<HTMLInputElement>(null);
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
        };

        const unsplash: Image[] = data.unsplash.map((d: any) => {
          return {
            src: d.urls.regular,
            href: d.links.html,
            alt: d.description,
          };
        });

        const pexels: Image[] = data.pexels.map((d: any) => {
          return {
            src: d.src.large,
            href: d.url,
            alt: d.alt,
          };
        });

        const pixabay: Image[] = data.pixabay.map((d: any) => {
          return {
            src: d.webformatURL,
            href: d.pageURL,
          };
        });

        setImages([openAi, ...unsplash, ...pexels, ...pixabay]);
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
      <div className="flex items-center justify-center mb-4">
        <input
          ref={promptRef}
          type="text"
          className="w-64 px-4 py-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write a prompt"
        />
        <PrimaryBtn onClick={fetchImages}>Send</PrimaryBtn>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <ImageCard
              src={image.src}
              href={image.href}
              alt={image.alt}
              key={`image-${image.src}`}
            />
          ))}
        </div>
      )}

      {isFetching && <p className="text-white">Loading...</p>}
    </main>
  );
}
