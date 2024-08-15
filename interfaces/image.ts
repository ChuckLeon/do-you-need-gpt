export const NB_TO_FETCH = 24;
export type platformOption = "unsplash" | "pexels" | "pixabay" | "openai";

export interface IImage {
  src: string;
  href: string;
  platform?: {
    name: string;
    url: string;
    svg?: platformOption;
  };
  creator?: {
    name: string;
    url: string;
  };
  alt?: string;
}

export interface ISearch {
  id: string;
  searchText: string;
  results: IImage[];
}
