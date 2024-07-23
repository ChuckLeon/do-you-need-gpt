import OpenAI from "openai";

const fetchOpenAi = async (prompt: string) => {
  const openAi = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"],
  });

  try {
    const data = await openAi.images.generate({
      prompt: prompt,
      n: 1,
      model: "dall-e-3",
    });

    return data.data[0].url;
  } catch (error) {
    throw error;
  }
};

export { fetchOpenAi };
