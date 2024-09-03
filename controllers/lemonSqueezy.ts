const baseApiUrl = `https://api.lemonsqueezy.com/v1/`;

export interface Product {
  id: string;
  attributes: {
    name: string;
    description: string;
    price: number;
    checkout_url: string;
  };
}

const fetchProducts = async () => {
  const response = await fetch(
    `${baseApiUrl}products?filter[store_id]=${process.env.LEMONSQUEEZY_STORE_ID}`,
    {
      headers: {
        accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
      },
      redirect: "follow",
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  return data;
};

export { fetchProducts };
