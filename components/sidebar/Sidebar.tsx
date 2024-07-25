import { IImage, ISearch } from "@/interfaces/image";
import React from "react";

interface ISidebar {
  searches: ISearch[];
  setImages: (images: IImage[]) => void;
}

export const Sidebar = ({ searches, setImages }: ISidebar) => {
  return (
    <div className="p-6 w-[15vw] ">
      <h2>History</h2>
      {searches.map((search, i) => (
        <button
          key={`history-${i}`}
          className="btn btn-ghost w-full justify-start"
          onClick={() => setImages(search.results)}
        >
          {search.searchText}
        </button>
      ))}
    </div>
  );
};
