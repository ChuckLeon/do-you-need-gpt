"use client";

import ImageCard from "@/components/image/ImageCard";
import PrimaryBtn from "../components/buttons/PrimaryBtn";
import { useRef, useState } from "react";

export default function Home() {
  const promptRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState();
  const [isFetching, setIsFetching] = useState(false);

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
        // TODO: correctly set states with the json we receive
        // setImages(data.openAi);
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
      <div className="flex items-center justify-center">
        <input
          ref={promptRef}
          type="text"
          className="w-64 px-4 py-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write a prompt"
        />
        <PrimaryBtn onClick={fetchImages}>Send</PrimaryBtn>
      </div>

      {images && (
        <div className="grid grid-cols-3 gap-4">
          <ImageCard src={images} />
        </div>
      )}

      {isFetching && <p className="text-white">Loading...</p>}
    </main>
  );
}
