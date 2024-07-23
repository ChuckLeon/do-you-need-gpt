import axios from "axios";

const fetchUnsplash = async (prompt: string) => {
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: prompt,
        client_id: process.env.UNSPLASH_ACCESS_KEY,
        per_page: 6,
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
