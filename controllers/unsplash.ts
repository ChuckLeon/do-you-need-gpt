import { NB_TO_FETCH } from "@/interfaces/image";
import axios from "axios";

const fetchUnsplash = async (prompt: string, page: string) => {
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: prompt,
        client_id: process.env.UNSPLASH_ACCESS_KEY,
        page: page,
        per_page: NB_TO_FETCH,
        order_by: "popular",
      },
    });

    const data = response.data;
    return data.results;
  } catch (error) {
    throw error;
  }
};

export { fetchUnsplash };
