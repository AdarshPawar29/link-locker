import { NextResponse } from "next/server";
import { getLinkPreview } from "link-preview-js";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const previewData = await getLinkPreview(url);

    const preview = {
      title: 'title' in previewData ? previewData.title : '',
      description: 'description' in previewData ? previewData.description : '',
      image: 'images' in previewData ? previewData.images?.[0] : '',
      favicon: 'favicons' in previewData ? previewData.favicons?.[0] || "/favicon.ico" : "/favicon.ico",
    };

    return NextResponse.json(preview);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch link preview" },
      { status: 500 }
    );
  }
}