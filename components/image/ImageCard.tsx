import React from "react";
import Image from "next/image";

type IImageCard = {
  src: string;
  href?: string;
};

export default function ImageCard({ href, src }: IImageCard) {
  return (
    <a
      href={href}
      className="group relative flex w-[100%] h-[500px] hover:cursor-pointer"
      target="_blank"
    >
      <img
        src={src}
        height="500px"
        className="object-cover h-[100%] w-[100%] rounded-xl"
        alt=""
      />

      <div className="absolute top-0 left-0 h-full w-full opacity-0 transition-opacity duration-100 bg-slate-700 bg-opacity-50 rounded-xl group-hover:opacity-100"></div>
    </a>
  );
}
