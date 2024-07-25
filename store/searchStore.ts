import { IImage, ISearch } from "@/interfaces/image";
import { create } from "zustand";

interface ISearchStore {
  searches: ISearch[];
  selectedSearch: string;
  images: IImage[];
  setSearches: (value: ISearch[]) => void;
  setSelectedSearch: (value: string) => void;
  setImages: (value: IImage[]) => void;
}

export const searchStore = create<ISearchStore>((set) => ({
  searches: [],
  selectedSearch: "",
  images: [],
  setSearches: (value: ISearch[]) => set({ searches: value }),
  setSelectedSearch: (value: string) => set({ selectedSearch: value }),
  setImages: (value: IImage[]) => set({ images: value }),
}));
