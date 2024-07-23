import React, { ReactNode } from "react";

type IImageCard = {
  src: string;
  href?: string;
  alt?: string;
  platform?: {
    name: string;
    url: string;
    svg?: ReactNode;
  };
  creator?: {
    name: string;
    url: string;
  };
};

export default function ImageCard({
  src,
  href,
  alt,
  platform,
  creator,
}: IImageCard) {
  return (
    <div className="group relative flex flex-col w-full h-[500px] rounded-xl overflow-hidden hover:cursor-pointer ">
      <a href={href} target="_blank" className="w-full h-full">
        <img src={src} className="object-cover h-[100%] w-[100%]" alt={alt} />

        <div className="absolute top-0 left-0 h-full w-full opacity-0 transition-opacity duration-100 bg-slate-700 bg-opacity-50 z-0 rounded-xl group-hover:opacity-100"></div>
        {platform?.svg && (
          <div className="absolute top-4 left-4 bg-white bg-opacity-30 rounded-full p-3">
            <a href={platform?.url} target="_blank">
              {platform.svg}
            </a>
          </div>
        )}
      </a>
      <div className="absolute bottom-0 left-0 flex justify-end w-full px-4 py-2 text-white">
        {creator && platform && (
          <span>
            Photo by{" "}
            <a
              href={creator?.url}
              target="_blank"
              className="underline text-blue-300"
            >
              {creator?.name}
            </a>{" "}
            from{" "}
            <a
              href={platform?.url}
              target="_blank"
              className="underline text-blue-300"
            >
              {platform?.name}
            </a>
          </span>
        )}
      </div>
    </div>
  );
}
