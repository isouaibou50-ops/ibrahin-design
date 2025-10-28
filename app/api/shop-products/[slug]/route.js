// app/api/shop-products/[slug]/route.js
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import ShopProduct from "@/models/ShopProduct";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { slug } = params;

    const product = await ShopProduct.findOne({ slug, isPublic: true }).lean();

    if (!product) {
      return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, product });
  } catch (err) {
    console.error("GET /api/shop-products/[slug] error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
