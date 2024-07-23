import axios from "axios";

const fetchPixabay = async (prompt: string) => {
  try {
    const response = await axios.get("https://pixabay.com/api/", {
      params: {
        key: process.env.PIXABAY_KEY,
        q: prompt,
        per_page: 6,
        safesearch: "true",
      },
    });

    const data = response.data;
    return data.hits;
  } catch (error) {
    throw error;
  }
};

export { fetchPixabay };
