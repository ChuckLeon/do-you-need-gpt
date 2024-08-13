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

    const [unsplashImages, pexelsImages, pixabayImages] = await Promise.all([
      fetchUnsplash(formatedPrompt, formatedPage),
      fetchPexels(formatedPrompt, formatedPage),
      fetchPixabay(formatedPrompt, formatedPage),
    ]);

    return NextResponse.json({
      unsplash: unsplashImages,
      pexels: pexelsImages,
      pixabay: pixabayImages,
    });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
