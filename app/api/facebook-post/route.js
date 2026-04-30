import { NextResponse } from "next/server";

export async function GET() {
  const PAGE_ID = process.env.FB_PAGE_ID;
  const ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;

  try {
    const res = await fetch(
      `https://graph.facebook.com/${PAGE_ID}/feed`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "🚀 Test post from my Next.js app!",
          access_token: ACCESS_TOKEN,
        }),
      }
    );

    const data = await res.json();

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}