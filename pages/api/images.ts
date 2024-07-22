import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt } = req.query;

  const openAi = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"],
  });

  try {
    const data = await openAi.images.generate({
      prompt: Array.isArray(prompt)
        ? prompt.join(",")
        : prompt ?? "Random image",
      n: 1,
      model: "dall-e-3",
    });

    res.status(200).json(data.data[0].url);
  } catch (error) {
    res.status(400).json(error);
  }
}
