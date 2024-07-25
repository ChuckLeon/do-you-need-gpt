import { useRef, useState } from "react";
import { IImage, ISearch } from "@/interfaces/image";
import { OpenAiIcon } from "@/components/icons/OpenAiIcon";
import { PexelsIcon } from "@/components/icons/PexelsIcon";
import { PixabayIcon } from "@/components/icons/PixabayIcon";
import { UnsplashIcon } from "@/components/icons/UnsplashIcon";
import { searchStore } from "@/store/searchStore";

export const usePrompts = () => {
  const promptRef = useRef<HTMLInputElement>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openAiImage, setOpenAiImage] = useState<IImage | null>();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const {
    searches,
    selectedSearch,
    images,
    setSearches,
    setSelectedSearch,
    setImages,
  } = searchStore();

  const fetchImages = async (
    text?: string | null,
    page?: number,
    pushToArray?: boolean
  ) => {
    try {
      setIsFetching(true);

      const searchText =
        text ??
        searches.find((search) => search.id === selectedSearch)?.searchText ??
        "";

      const response = await fetch(
        `/api/images?prompt=${encodeURIComponent(searchText)}&page=${
          page ?? currentPage
        }`
      );
      if (response.ok) {
        const data = await response.json();

        const openAi: IImage = {
          src: data.openAi,
          href: data.openAi,
          platform: {
            name: "OpenAI",
            url: "openai.com",
            svg: <OpenAiIcon />,
          },
        };

        const unsplash: IImage[] = data.unsplash.map((d: any) => {
          return {
            src: d.urls.regular,
            href: d.links.html,
            alt: d.description,
            platform: {
              name: "Unsplash",
              url: "https://www.unsplash.com?utm_source=artvsai&utm_medium=referral",
              svg: <UnsplashIcon />,
            },
            creator: {
              name: d.user.name,
              url: d.user.portfolio_url,
            },
          };
        });

        const pexels: IImage[] = data.pexels.map((d: any) => {
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

        const pixabay: IImage[] = data.pixabay.map((d: any) => {
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
          const newUUID = crypto.randomUUID();
          const previousSearch = searches;

          setOpenAiImage(openAi);
          setImages([...unsplash, ...pexels, ...pixabay]);

          setSearches([
            ...previousSearch,
            {
              id: newUUID,
              searchText: searchText,
              results: [...unsplash, ...pexels, ...pixabay],
            },
          ]);

          setSelectedSearch(newUUID);
        } else {
          const previousImages = images;
          setImages([...previousImages, ...unsplash, ...pexels, ...pixabay]);
        }

        if (promptRef.current) promptRef.current.value = "";
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

    fetchImages(null, pageToFetch, true);
  };

  return {
    promptRef,
    openAiImage,
    images,
    isFetching,
    currentPage,
    searches,
    fetchImages,
    loadMore,
    setImages,
    setSelectedSearch,
  };
};
