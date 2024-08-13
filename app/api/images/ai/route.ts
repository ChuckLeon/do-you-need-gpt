import { NextResponse } from "next/server";
import { fetchOpenAi } from "@/controllers/openAi";

export async function GET(request: Request) {
  // add user credits validation
  try {
    const { searchParams } = new URL(request.url);
    const prompt = searchParams.get("prompt");

    const formatedPrompt = Array.isArray(prompt)
      ? prompt.join(",")
      : prompt ?? "Random image";

    const openAiUrl = await fetchOpenAi(formatedPrompt);

    return NextResponse.json({
      url: openAiUrl,
    });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
