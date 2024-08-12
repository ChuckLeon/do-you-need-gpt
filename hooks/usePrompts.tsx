import { useRef, useState } from "react";
import { IImage, ISearch } from "@/interfaces/image";
import { OpenAiIcon } from "@/components/icons/OpenAiIcon";
import { PexelsIcon } from "@/components/icons/PexelsIcon";
import { PixabayIcon } from "@/components/icons/PixabayIcon";
import { UnsplashIcon } from "@/components/icons/UnsplashIcon";
import { searchStore } from "@/store/searchStore";
import { Bounce, toast } from "react-toastify";

export const usePrompts = () => {
  const promptRef = useRef<HTMLInputElement>(null);

  const [openAiImage, setOpenAiImage] = useState<IImage | null>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isFetchingNewSearch, setIsFetchingNewSearch] =
    useState<boolean>(false);
  const [isGeneratingAiImage, setIsGeneratingAiImage] =
    useState<boolean>(false);

  const {
    searches,
    selectedSearch,
    images,
    currentPage,
    setSearches,
    setSelectedSearch,
    setImages,
    setCurrentPage,
  } = searchStore();

  const fetchImages = async (
    text?: string | null,
    page?: number,
    isNewSearch?: boolean
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

        const unsplash: IImage[] = data.unsplash.map((d: any) => {
          return {
            src: d.urls.regular,
            href: d.links.html,
            alt: d.description,
            platform: {
              name: "Unsplash",
              url: "https://www.unsplash.com?utm_source=doyouneedai&utm_medium=referral",
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

        if (isNewSearch) {
          const newUUID = crypto.randomUUID();
          const previousSearch = searches;

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
        throw new Error();
      }
    } catch (error) {
      toast.error("Failed to fetch images");
    } finally {
      setIsFetching(false);
    }
  };

  const fetchNewSearch = async (text: string) => {
    setCurrentPage(1);
    setIsFetchingNewSearch(true);

    await fetchImages(text, 1, true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    setIsFetchingNewSearch(false);
  };

  const loadMore = async () => {
    const pageToFetch = currentPage + 1;
    setCurrentPage(pageToFetch);

    await fetchImages(null, pageToFetch, false);
  };

  const fetchAiImage = async (text?: string | null) => {
    try {
      setIsGeneratingAiImage(true);
      const searchText =
        text !== null && text !== undefined && text !== ""
          ? text
          : searches.find((search) => search.id === selectedSearch)
              ?.searchText ?? "";

      const response = await fetch(
        `/api/images/ai?prompt=${encodeURIComponent(searchText)}`
      );

      if (response.ok) {
        const data = await response.json();

        const openAi: IImage = {
          src: data.url,
          href: data.url,
          platform: {
            name: "OpenAI",
            url: "openai.com",
            svg: <OpenAiIcon />,
          },
          creator: {
            name: "AI generated",
            url: "",
          },
        };
        setOpenAiImage(openAi);
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error("Failed to fetch AI image");
    } finally {
      setIsGeneratingAiImage(false);
    }
  };

  return {
    promptRef,
    openAiImage,
    images,
    isFetching,
    currentPage,
    searches,
    isFetchingNewSearch,
    isGeneratingAiImage,
    loadMore,
    setImages,
    setSelectedSearch,
    fetchNewSearch,
    fetchAiImage,
  };
};
