import { useRef, useState } from "react";
import { IImage } from "@/interfaces/image";
import { searchStore } from "@/store/searchStore";
import { toast } from "react-toastify";
import { useUsers } from "./useUsers";
import { userStore } from "@/store/userStore";
import { createClient } from "@/utilities/supabase/clients";
import { elementScrollToTop } from "@/utilities/scroll";
import { useTranslations } from "next-intl";

export const useSearch = () => {
  const supabase = createClient();
  const t = useTranslations();
  const { updateAiCredits } = useUsers();
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
  const { user } = userStore();

  const promptRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [openAiImage, setOpenAiImage] = useState<IImage | null>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isFetchingNewSearch, setIsFetchingNewSearch] =
    useState<boolean>(false);
  const [isGeneratingAiImage, setIsGeneratingAiImage] =
    useState<boolean>(false);

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
        const { unsplash, pexels, pixabay } = data;

        if (isNewSearch) {
          const newUUID = crypto.randomUUID();
          const previousSearch = searches;
          const results = [...unsplash, ...pexels, ...pixabay];

          setImages(results);
          setSearches([
            {
              id: newUUID,
              searchText: searchText,
              results: results,
            },
            ...previousSearch,
          ]);
          setSelectedSearch(newUUID);

          if (user) {
            const { error } = await supabase
              .from("searches")
              .insert([
                {
                  user_id: user?.id,
                  search_text: searchText,
                  results: JSON.parse(JSON.stringify(results)),
                },
              ])
              .select();

            if (error) {
              toast.error(t("general_error"));
            }
          }
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

  const fetchNewSearch = async () => {
    const text = promptRef.current?.value ?? "";
    setCurrentPage(1);
    setIsFetchingNewSearch(true);

    await fetchImages(text, 1, true);

    elementScrollToTop(searchContainerRef.current);
    setIsFetchingNewSearch(false);
  };

  const loadMore = async () => {
    const pageToFetch = currentPage + 1;
    setCurrentPage(pageToFetch);

    await fetchImages(null, pageToFetch, false);
  };

  const fetchAiImage = async () => {
    if (user && user.credits <= 0) return;

    try {
      setIsGeneratingAiImage(true);
      const searchText =
        promptRef.current?.value !== null &&
        promptRef.current?.value !== undefined &&
        promptRef.current?.value !== ""
          ? promptRef.current?.value
          : searches.find((search) => search.id === selectedSearch)
              ?.searchText ?? "";

      const response = await fetch(
        `/api/images/ai?prompt=${encodeURIComponent(searchText)}`,
        {
          headers: {
            Authorization: `Bearer ${user?.id}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        const openAi: IImage = {
          src: data.url,
          href: data.url,
          platform: {
            name: "OpenAI",
            url: "openai.com",
            svg: "openai",
          },
          creator: {
            name: "AI generated",
            url: "",
          },
        };
        setOpenAiImage(openAi);
        updateAiCredits();
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
    searchContainerRef,
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
