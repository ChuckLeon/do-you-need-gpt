import { NextRequest, NextResponse } from "next/server";
import { fetchOpenAi } from "@/controllers/openAi";
import { createClient } from "@/utilities/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const authHeader = request.headers.get("authorization");

  try {
    if (!authHeader) throw Error();

    const bearerToken = authHeader.split(" ")[1];
    let { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", bearerToken);

    if (user === null || user === undefined || error) throw Error();

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
