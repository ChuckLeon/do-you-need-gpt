import { fetchOpenAi } from "@/controllers/openAi";
import { fetchPexels } from "@/controllers/pexels";
import { fetchPixabay } from "@/controllers/pixabay";
import { fetchUnsplash } from "@/controllers/unsplash";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt } = req.query;

  const formatedPrompt = Array.isArray(prompt)
    ? prompt.join(",")
    : prompt ?? "Random image";

  try {
    const openAiUrl = await fetchOpenAi(formatedPrompt);
    const unsplashImages = await fetchUnsplash(formatedPrompt);
    const pexelsImages = await fetchPexels(formatedPrompt);
    const pixabayImages = await fetchPixabay(formatedPrompt);

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
