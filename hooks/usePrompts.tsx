import { useRef, useState } from "react";
import { Image } from "@/interfaces/image";
import { OpenAiIcon } from "@/components/icons/OpenAiIcon";
import { PexelsIcon } from "@/components/icons/PexelsIcon";
import { PixabayIcon } from "@/components/icons/PixabayIcon";
import { UnsplashIcon } from "@/components/icons/UnsplashIcon";

export const usePrompts = () => {
  const promptRef = useRef<HTMLInputElement>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openAiImage, setOpenAiImage] = useState<Image | null>();
  const [images, setImages] = useState<Image[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const fetchImages = async (page?: number, pushToArray?: boolean) => {
    try {
      setIsFetching(true);

      const response = await fetch(
        `/api/images?prompt=${encodeURIComponent(
          promptRef.current?.value ?? ""
        )}&page=${page ?? currentPage}`
      );
      if (response.ok) {
        const data = await response.json();

        const openAi: Image = {
          src: data.openAi,
          href: data.openAi,
          platform: {
            name: "OpenAI",
            url: "openai.com",
            svg: <OpenAiIcon />,
          },
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

        if (!pushToArray) {
          setOpenAiImage(openAi);
          setImages([...unsplash, ...pexels, ...pixabay]);
        } else {
          setImages((prev) => [...prev, ...unsplash, ...pexels, ...pixabay]);
        }
      } else {
        throw new Error("Failed to fetch images");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const loadMore = () => {
    const pageToFetch = currentPage + 1;
    setCurrentPage(pageToFetch);

    fetchImages(pageToFetch, true);
  };

  return {
    promptRef,
    openAiImage,
    images,
    isFetching,
    currentPage,
    fetchImages,
    loadMore,
  };
};
