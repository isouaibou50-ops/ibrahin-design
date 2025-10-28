import { v2 as cloudinary } from "cloudinary";
import { getAuth } from "@clerk/nextjs/server";
import authRole from "@/lib/authRole";
import { NextResponse } from "next/server"; // <-- ✅ FIXED missing import
import connectDB from "@/config/db";
import ShopProduct from "@/models/ShopProduct";

// configure Cloudinary (same as your create route)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// small helper
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

export async function PATCH(request, { params }) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { canUpdate } = await authRole(userId);
    if (!canUpdate) {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
    }

    await connectDB();
    const { id } = await params;
    const contentType = (request.headers.get("content-type") || "").toLowerCase();

    let updates = {};
    let files = [];

    // handle multipart form or JSON
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();

      for (const [key, value] of formData.entries()) {
        if (key === "images") continue;

        // ✅ Ensure numbers are properly converted
        if (key === "price" || key === "offerPrice") {
          updates[key] = value ? Number(value) : null;
        } else {
          updates[key] = value;
        }
      }

      files = formData.getAll("images").filter(Boolean);
    } else {
      const body = await request.json();
      updates = {
        ...body,
        price: body.price !== undefined ? Number(body.price) : undefined,
        offerPrice: body.offerPrice !== undefined ? Number(body.offerPrice) : undefined,
      };
    }

    // ✅ Handle image uploads (optional)
    if (files && files.length > 0) {
      const uploaded = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const publicIdBase = `shopproduct-${id}-${Date.now().toString().slice(-6)}-${i}`;
        const result = await uploadBufferToCloudinary(buffer, publicIdBase);
        uploaded.push(result.secure_url);
      }
      updates.image = uploaded;
    }

    // ✅ Update the product
    const updated = await ShopProduct.findByIdAndUpdate(id, updates, { new: true });
    if (!updated)
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });

    return NextResponse.json({ success: true, product: updated });
  } catch (err) {
    console.error("PATCH error:", err);
    return NextResponse.json(
      { success: false, message: err?.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { canDelete, role } = await authRole(userId);
    if (!canDelete) {
      return NextResponse.json(
        { success: false, message: "Forbidden - only admin can delete products" },
        { status: 403 }
      );
    }

    await connectDB();
    const { id } = await  params;

    const product = await ShopProduct.findById(id);
    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    // ✅ Remove images from Cloudinary if they exist
    if (product.image && Array.isArray(product.image)) {
      for (const url of product.image) {
        try {
          // Cloudinary public_id extraction (last path segment before extension)
          const parts = url.split("/");
          const filename = parts[parts.length - 1];
          const publicId = `shop_products/${filename.split(".")[0]}`;
          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.warn("Cloudinary image delete failed:", err.message);
        }
      }
    }

    await ShopProduct.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: `Product "${product.name}" deleted successfully by ${role}`,
    });
  } catch (err) {
    console.error("DELETE /api/shop-products/manage/[id] error:", err);
    return NextResponse.json(
      { success: false, message: err?.message || "Server error" },
      { status: 500 }
    );
  }
}

