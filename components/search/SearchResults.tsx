import Masonry from "react-masonry-css";
import { NeedAiIcon } from "../icons/NeedAiIcon";
import ImageCard from "../image/ImageCard";
import { SkeletonGrid } from "../skeleton/SkeletonGrid";
import { Waypoint } from "react-waypoint";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { RefObject } from "react";
import { IImage } from "@/interfaces/image";

interface ISearchResults {
  searchContainerRef: RefObject<HTMLDivElement>;
  isFetching: boolean;
  isFetchingNewSearch: boolean;
  images: IImage[];
  openAiImage: IImage | null | undefined;
  currentPage: number;
  loadMore: (args: Waypoint.CallbackArgs) => void;
}

export const SearchResults = ({
  searchContainerRef,
  isFetching,
  isFetchingNewSearch,
  images,
  openAiImage,
  currentPage,
  loadMore,
}: ISearchResults) => {
  const t = useTranslations();

  return (
    <div
      className="flex flex-col items-center w-full h-full max-h-full p-4 pb-24 overflow-y-auto no-scrollbar md:p-8 md:pb-32"
      ref={searchContainerRef}
    >
      {images.length === 0 && !isFetching && (
        <div className="m-auto text-center">
          <NeedAiIcon className="m-auto w-[100px] h-[100px]" />
          <h1>{t("home_title")}</h1>
          <span>{t("home_subtitle")}</span>
        </div>
      )}
      <div
        className={clsx({
          hidden: images.length === 0,
        })}
      >
        <Masonry
          breakpointCols={{
            default: 5,
            1440: 4,
            1080: 3,
            768: 2,
          }}
          className="masonry"
          columnClassName="masonry_column"
        >
          {openAiImage?.src && (
            <ImageCard
              src={openAiImage.src}
              href={openAiImage.href}
              alt="Open AI generated image"
              platform={{
                name: "OpenAI",
                url: "openai.com",
                svg: "openai",
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
        </Masonry>

        {images.length > 0 && !isFetching && <Waypoint onEnter={loadMore} />}
        {isFetching && (
          <span className="loading loading-spinner loading-lg flex m-auto p-6"></span>
        )}
      </div>

      {isFetchingNewSearch && <SkeletonGrid />}
    </div>
  );
};
