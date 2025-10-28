// app/api/shop-products/route.js
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import ShopProduct from "@/models/ShopProduct";

export async function GET(request) {
  try {
    await connectDB();

    const url = new URL(request.url);
    const page = Math.max(1, Number(url.searchParams.get("page") || 1));
    const limit = Math.min(50, Number(url.searchParams.get("limit") || 20));
    const search = url.searchParams.get("search")?.trim() || "";
    const category = url.searchParams.get("category")?.trim() || "All";

    const skip = (page - 1) * limit;

    // 🧠 Build dynamic query
    const query = { isPublic: true };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category && category !== "All") {
      query.category = category;
    }

    // 🧩 Select only needed fields
    const projection = {
      name: 1,
      slug: 1,
      description: 1,
      image: 1,
      offerPrice: 1,
      category: 1,
      createdAt: 1,
      _id: 1,
    };

    const [products, total] = await Promise.all([
      ShopProduct.find(query)
        .select(projection)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      ShopProduct.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      products,
      meta: { total, page, limit, hasMore: skip + products.length < total },
    });
  } catch (err) {
    console.error("❌ GET /api/shop-products error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
