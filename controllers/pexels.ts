import axios from "axios";

const fetchPexels = async (prompt: string) => {
  try {
    const response = await axios.get("https://api.pexels.com/v1/search", {
      params: {
        query: prompt,
        per_page: 6,
      },
      headers: {
        Authorization: process.env.PEXEL_KEY,
      },
    });

    const data = response.data;
    return data.photos;
  } catch (error) {
    throw error;
  }
};

export { fetchPexels };
