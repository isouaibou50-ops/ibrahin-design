import { v2 as cloudinary } from "cloudinary";
import { getAuth } from "@clerk/nextjs/server";
import authRole from "@/lib/authRole";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import ShopProduct from "@/models/ShopProduct";

// --- Cloudinary config ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- Helpers ---
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

async function uploadBufferToCloudinary(buffer, publicIdBase = undefined) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "image", folder: "shop_products", public_id: publicIdBase },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
}

// --- PATCH (Update ShopProduct) ---
export async function PATCH(request, { params }) {
  try {
    const { id } = params;

    // Clerk auth
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // role validation: seller/staff/admin can update
    const { canUpdate } = await authRole(userId);
    if (!canUpdate) {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
    }

    // content type
    const contentType = (request.headers.get("content-type") || "").toLowerCase();

    let name = "";
    let description = "";
    let category = "Uncategorized";
    let price = null;
    let offerPrice = null;
    let existingImages = [];
    let newFiles = [];

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      name = String(formData.get("name") || "").trim();
      description = String(formData.get("description") || "").trim();
      category = String(formData.get("category") || "Uncategorized").trim();
      const priceRaw = formData.get("price");
      const offerRaw = formData.get("offerPrice");

      price = priceRaw !== null && priceRaw !== undefined ? Number(priceRaw) : null;
      offerPrice = offerRaw ? Number(offerRaw) : null;

      // existing images array
      const existing = formData.get("existingImages");
      if (existing) {
        try {
          const parsed = JSON.parse(existing);
          if (Array.isArray(parsed)) existingImages = parsed;
        } catch {
          existingImages = String(existing).split(",").map((s) => s.trim()).filter(Boolean);
        }
      }

      newFiles = formData.getAll("images").filter(Boolean);
    } else {
      const body = await request.json();
      name = String(body.name || "").trim();
      description = String(body.description || "").trim();
      category = String(body.category || "Uncategorized").trim();
      price = body.price !== undefined ? Number(body.price) : null;
      offerPrice = body.offerPrice !== undefined ? Number(body.offerPrice) : null;
      existingImages = Array.isArray(body.existingImages) ? body.existingImages : [];
    }

    // --- validate ---
    if (!id) return NextResponse.json({ success: false, message: "Missing ID" }, { status: 400 });
    if (!name) return NextResponse.json({ success: false, message: "Name required" }, { status: 400 });
    if (price === null || Number.isNaN(price))
      return NextResponse.json({ success: false, message: "Price must be a number" }, { status: 400 });

    // --- connect DB ---
    await connectDB();
    const existing = await ShopProduct.findById(id);
    if (!existing) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    // --- Handle new uploads ---
    let finalImageUrls = Array.isArray(existingImages) ? existingImages.slice(0, 4) : [];

    if (newFiles && newFiles.length > 0) {
      if (newFiles.length > 4) {
        return NextResponse.json({ success: false, message: "Maximum 4 images allowed" }, { status: 400 });
      }

      const uploaded = [];
      for (let i = 0; i < newFiles.length; i++) {
        try {
          const file = newFiles[i];
          const buffer = Buffer.from(await file.arrayBuffer());
          const publicIdBase = `${slugifySimple(name)}-${Date.now().toString().slice(-6)}-${i}`;
          const res = await uploadBufferToCloudinary(buffer, publicIdBase);
          uploaded.push(res.secure_url);
        } catch (err) {
          console.error("Cloudinary upload error:", err);
          return NextResponse.json({ success: false, message: "Image upload failed" }, { status: 500 });
        }
      }
      finalImageUrls = [...finalImageUrls, ...uploaded].slice(0, 4);
    }

    // --- update document ---
    existing.name = name;
    existing.description = description;
    existing.category = category;
    existing.price = price;
    existing.offerPrice = offerPrice || null;
    existing.image = finalImageUrls;
    existing.slug = slugifySimple(name);
    existing.metadata = {
      ...existing.metadata,
      updatedAt: new Date(),
    };

    await existing.save();

    return NextResponse.json({ success: true, product: existing });
  } catch (err) {
    console.error("PATCH /api/shop-products/manage/[id] error:", err);
    return NextResponse.json(
      { success: false, message: err?.message || "Server error" },
      { status: 500 }
    );
  }
}
