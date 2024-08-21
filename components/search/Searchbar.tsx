import { useTranslations } from "next-intl";
import { RefObject } from "react";

interface ISearchbar {
  promptRef: RefObject<HTMLInputElement>;
  isFetchingNewSearch: boolean;
  fetchNewSearch: () => void;
}

export const Searchbar = ({
  promptRef,
  isFetchingNewSearch,
  fetchNewSearch,
}: ISearchbar) => {
  const t = useTranslations();

  return (
    <div className="absolute bottom-0 flex gap-4 px-2 pb-4 w-full z-10 backdrop-blur-sm md:px-6 md:pb-8">
      <label className="relative input input-bordered input-primary flex items-center w-full gap-2 focus-within:outline-offset-0 focus-within:outline-1">
        <input
          ref={promptRef}
          type="text"
          className="grow"
          placeholder={t("searchbar_placeholder")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchNewSearch();
            }
          }}
        />
        <button className="btn btn-primary btn-sm " onClick={fetchNewSearch}>
          {isFetchingNewSearch ? (
            <span className="loading loading-spinner"></span>
          ) : (
            t("searchbar_button")
          )}
        </button>
      </label>
    </div>
  );
};
