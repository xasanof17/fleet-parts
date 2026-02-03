import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body._type === "part") {
      revalidateTag("parts", "max");
      revalidateTag(`part-${body.slug?.current}`, "max");
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch {
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    );
  }
}
