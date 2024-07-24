import { fetchOpenAi } from "@/controllers/openAi";
import { fetchPexels } from "@/controllers/pexels";
import { fetchPixabay } from "@/controllers/pixabay";
import { fetchUnsplash } from "@/controllers/unsplash";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt, page } = req.query;

  const formatedPrompt = Array.isArray(prompt)
    ? prompt.join(",")
    : prompt ?? "Random image";

  const formatedPage = Array.isArray(page) ? "1" : page ?? "1";

  try {
    const openAiUrl = "";
    //Number(formatedPage) === 1 ? await fetchOpenAi(formatedPrompt) : "";
    const unsplashImages = await fetchUnsplash(formatedPrompt, formatedPage);
    const pexelsImages = await fetchPexels(formatedPrompt, formatedPage);
    const pixabayImages = await fetchPixabay(formatedPrompt, formatedPage);

    res.status(200).json({
      openAi: openAiUrl,
      unsplash: unsplashImages,
      pexels: pexelsImages,
      pixabay: pixabayImages,
    });
  } catch (error) {
    res.status(400).json(error);
  }
}
