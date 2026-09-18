import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.REMOVEBG_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "Remove.bg API key is not configured.",
        },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const imageFile = formData.get("image_file");

    if (!(imageFile instanceof File)) {
      return NextResponse.json(
        {
          error: "Please upload an image.",
        },
        { status: 400 }
      );
    }

    const removeBgForm = new FormData();

    removeBgForm.append("image_file", imageFile);
    removeBgForm.append("size", "auto");

    const response = await fetch(
      "https://api.remove.bg/v1.0/removebg",
      {
        method: "POST",
        headers: {
          "X-Api-Key": apiKey,
        },
        body: removeBgForm,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      return NextResponse.json(
        {
          error: "Background removal failed.",
          details: errorText,
        },
        { status: response.status }
      );
    }

    const imageBuffer = await response.arrayBuffer();

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition":
          'attachment; filename="toolbangla-background-removed.png"',
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Remove background error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong while removing the background.",
      },
      { status: 500 }
    );
  }
}