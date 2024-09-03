import { NextResponse } from "next/server";
import { fetchProducts } from "@/controllers/lemonSqueezy";

export async function GET() {
  try {
    const products = await fetchProducts();

    return NextResponse.json({
      products,
    });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
