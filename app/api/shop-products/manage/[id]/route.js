import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "@/config/db";
import ShopProduct from "@/models/ShopProduct";
import authRole from "@/lib/authRole";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper
function slugifySimple(str) {
  return String(str || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 140);
}

// PATCH — Update a product
export async function PATCH(request, { params }) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { canUpdate, role } = await authRole(userId);
    if (!canUpdate) {
      return NextResponse.json({ success: false, message: "Forbidden - insufficient role" }, { status: 403 });
    }

    await connectDB();
    const body = await request.json();
    const product = await ShopProduct.findById(params.id);

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    // Optional ownership restriction (if you want sellers to only edit their own)
    if (role === "seller" && product.userId !== userId) {
      return NextResponse.json({ success: false, message: "Forbidden - cannot modify others' product" }, { status: 403 });
    }

    // Update fields
    if (body.name) product.name = body.name;
    if (body.description) product.description = body.description;
    if (body.category) product.category = body.category;
    if (body.price !== undefined) product.price = Number(body.price);
    if (body.offerPrice !== undefined) product.offerPrice = Number(body.offerPrice);
    if (Array.isArray(body.image)) product.image = body.image.slice(0, 4);
    if (body.isPublic !== undefined) product.isPublic = !!body.isPublic;

    // Auto-update slug if name changed
    if (body.name) {
      const baseSlug = slugifySimple(body.name);
      const timestampSuffix = Date.now().toString().slice(-6);
      product.slug = `${baseSlug}-${timestampSuffix}`;
    }

    await product.save();

    return NextResponse.json({ success: true, product });
  } catch (err) {
    console.error("PATCH /api/shop-products/manage/[id] error:", err);
    return NextResponse.json({ success: false, message: err?.message || "Server error" }, { status: 500 });
  }
}

// DELETE — Only admin
export async function DELETE(request, { params }) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { role } = await authRole(userId);
    if (role !== "admin") {
      return NextResponse.json({ success: false, message: "Only admin can delete products" }, { status: 403 });
    }

    await connectDB();
    const product = await ShopProduct.findById(params.id);

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    // Optional: remove from Cloudinary if you stored URLs
    if (Array.isArray(product.image)) {
      for (const url of product.image) {
        try {
          const publicId = url.split("/shop_products/")[1]?.split(".")[0];
          if (publicId) {
            await cloudinary.uploader.destroy(`shop_products/${publicId}`);
          }
        } catch (err) {
          console.warn("⚠️ Cloudinary delete error:", err.message);
        }
      }
    }

    await product.deleteOne();

    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/shop-products/manage/[id] error:", err);
    return NextResponse.json({ success: false, message: err?.message || "Server error" }, { status: 500 });
  }
}
