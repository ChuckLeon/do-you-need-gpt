import { NextResponse } from "next/server";
import { fetchPexels } from "@/controllers/pexels";
import { fetchPixabay } from "@/controllers/pixabay";
import { fetchUnsplash } from "@/controllers/unsplash";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const prompt = searchParams.get("prompt");
    const page = searchParams.get("page");

    const formatedPrompt = Array.isArray(prompt)
      ? prompt.join(",")
      : prompt ?? "Random image";

    const formatedPage = Array.isArray(page) ? "1" : page ?? "1";

    const [unsplash, pexels, pixabay] = await Promise.all([
      fetchUnsplash(formatedPrompt, formatedPage),
      fetchPexels(formatedPrompt, formatedPage),
      fetchPixabay(formatedPrompt, formatedPage),
    ]);

    return NextResponse.json({
      unsplash: unsplash.map((d: any) => {
        return {
          src: d.urls.regular,
          href: d.links.html,
          alt: d.description,
          platform: {
            name: "Unsplash",
            url: "https://www.unsplash.com?utm_source=doyouneedai&utm_medium=referral",
            svg: "unsplash",
          },
          creator: {
            name: d.user.name,
            url: d.user.portfolio_url,
          },
        };
      }),
      pexels: pexels.map((d: any) => {
        return {
          src: d.src.large,
          href: d.url,
          alt: d.alt,
          platform: {
            name: "Pexels",
            url: "https://www.pexels.com",
            svg: "pexels",
          },
          creator: {
            name: d.photographer,
            url: d.photographer_url,
          },
        };
      }),
      pixabay: pixabay.map((d: any) => {
        return {
          src: d.webformatURL,
          href: d.pageURL,
          platform: {
            name: "Pixabay",
            url: "https://www.pixabay.com",
            svg: "pixabay",
          },
          creator: {
            name: d.user,
            url: d.pageURL,
          },
        };
      }),
    });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
