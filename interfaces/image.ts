import { UUID } from "crypto";
import { ReactNode } from "react";

export const NB_TO_FETCH = 12;

export interface IImage {
  src: string;
  href: string;
  platform?: {
    name: string;
    url: string;
    svg?: ReactNode;
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
