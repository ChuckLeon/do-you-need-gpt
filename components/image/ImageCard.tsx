import { UnsplashIcon } from "@/components/icons/UnsplashIcon";
import { PexelsIcon } from "@/components/icons/PexelsIcon";
import { PixabayIcon } from "@/components/icons/PixabayIcon";
import { OpenAiIcon } from "@/components/icons/OpenAiIcon";
import { ReactNode } from "react";
import { platformOption } from "@/interfaces/image";

type IImageCard = {
  src: string;
  href?: string;
  alt?: string;
  platform?: {
    name: string;
    url: string;
    svg?: platformOption;
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
  const getPlatformSvg = (option: platformOption): ReactNode => {
    switch (option) {
      case "unsplash":
        return <UnsplashIcon />;
      case "pexels":
        return <PexelsIcon />;
      case "pixabay":
        return <PixabayIcon />;
      case "openai":
        return <OpenAiIcon />;
      default:
        return null;
    }
  };

  return (
    <div className="image-card group relative flex flex-col w-full rounded-xl overflow-hidden  hover:cursor-pointer">
      <a href={href} target="_blank" className="w-full h-full">
        <img
          src={src}
          className="object-cover h-[100%] w-[100%] transition-transform group-hover:scale-[102%]"
          alt={alt}
          loading="lazy"
        />

        <div className="absolute top-0 left-0 h-full w-full opacity-0 transition-opacity bg-accent bg-opacity-40 z-0 rounded-xl group-hover:opacity-100"></div>
      </a>
      {platform?.svg && (
        <div className="absolute top-4 left-4 bg-white bg-opacity-30 rounded-full p-3 transition-all hover:bg-opacity-50">
          <a href={platform?.url} target="_blank">
            {getPlatformSvg(platform.svg)}
          </a>
        </div>
      )}
      {creator && platform && (
        <div className="absolute bottom-4 right-4 px-4 py-1 rounded-full bg-white bg-opacity-80 text-xs transition-all hover:bg-opacity-100">
          <a
            href={creator?.url !== "" ? creator.url : href}
            target="_blank"
            className="text-black"
          >
            {creator?.name}
          </a>
        </div>
      )}
    </div>
  );
}
