import { NB_TO_FETCH } from "@/interfaces/image";
import axios from "axios";

const fetchPexels = async (prompt: string, page: string) => {
  try {
    const response = await axios.get("https://api.pexels.com/v1/search", {
      params: {
        query: prompt,
        page: page,
        per_page: NB_TO_FETCH,
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
