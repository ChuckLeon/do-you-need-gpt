"use client";

import { Product } from "@/controllers/lemonSqueezy";
import { userStore } from "@/store/userStore";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // const { user } = userStore();
  // if (!user) redirect("/");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/store/products");
        const data = await response.json();
        setProducts(data.products.data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handlePurchase = async (productId: string) => {
    try {
      const product = products.find((p) => p.id === productId);
      if (!product) throw new Error("Product not found.");

      redirect(product.attributes.checkout_url);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Our Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.attributes.name}</h2>
            <p>{product.attributes.description}</p>
            <p>Price: ${product.attributes.price / 100}</p>
            <button
              className="btn btn-primary"
              onClick={() => handlePurchase(product.id)}
            >
              Buy Now
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
