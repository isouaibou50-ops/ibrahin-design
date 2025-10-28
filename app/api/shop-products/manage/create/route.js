// app/api/shop-products/manage/create/route.js
import { v2 as cloudinary } from "cloudinary";
import { getAuth } from "@clerk/nextjs/server";
import authRole from "@/lib/authRole"; // <-- NEW unified role helper
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import ShopProduct from "@/models/ShopProduct";

// configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// small slug helper
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

export async function POST(request) {
  try {
    // Clerk authentication
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // Role check: seller, staff, admin can create
    const { canCreate, role } = await authRole(userId);
    if (!canCreate) {
      return NextResponse.json(
        { success: false, message: "Forbidden - only seller, staff or admin can create products" },
        { status: 403 }
      );
    }

    // detect content type
    const contentType = (request.headers.get("content-type") || "").toLowerCase();

    let name = "";
    let description = "";
    let category = "Uncategorized";
    let price = null;
    let offerPrice = null;
    let imageUrls = [];
    let files = [];

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();

      name = String(formData.get("name") || "").trim();
      description = String(formData.get("description") || "").trim();
      category = String(formData.get("category") || "Uncategorized").trim();
      const priceRaw = formData.get("price");
      const offerRaw = formData.get("offerPrice");

      // gather files sent with key 'images'
      files = formData.getAll("images").filter(Boolean);

      const imageField = formData.get("image") || formData.get("imageUrls") || null;
      if (imageField && typeof imageField === "string") {
        try {
          const parsed = JSON.parse(imageField);
          if (Array.isArray(parsed)) imageUrls = parsed;
        } catch {
          imageUrls = String(imageField)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        }
      }

      price = priceRaw !== null && priceRaw !== undefined ? Number(priceRaw) : null;
      offerPrice = offerRaw ? Number(offerRaw) : null;
    } else {
      const body = await request.json();
      name = String(body.name || "").trim();
      description = String(body.description || "").trim();
      category = String(body.category || "Uncategorized").trim();
      price = body.price !== undefined ? Number(body.price) : null;
      offerPrice = body.offerPrice !== undefined ? Number(body.offerPrice) : null;
      if (Array.isArray(body.image)) imageUrls = body.image;
      if (Array.isArray(body.images)) imageUrls = body.images;
    }

    // basic validation
    if (!name)
      return NextResponse.json({ success: false, message: "Name is required" }, { status: 400 });
    if (price === null || Number.isNaN(price))
      return NextResponse.json(
        { success: false, message: "Price is required and must be a number" },
        { status: 400 }
      );
    if (offerPrice !== null && Number.isNaN(offerPrice))
      return NextResponse.json(
        { success: false, message: "OfferPrice must be a number" },
        { status: 400 }
      );

    // handle image uploads
    let finalImageUrls = Array.isArray(imageUrls) ? imageUrls.slice(0, 4) : [];

    if (files && files.length > 0) {
      if (files.length > 4) {
        return NextResponse.json(
          { success: false, message: "Maximum 4 images allowed" },
          { status: 400 }
        );
      }

      const uploaded = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const publicIdBase = `${slugifySimple(name)}-${Date.now().toString().slice(-6)}-${i}`;
          const res = await uploadBufferToCloudinary(buffer, publicIdBase);
          uploaded.push(res.secure_url);
        } catch (err) {
          console.error("Cloudinary upload error:", err);
          return NextResponse.json(
            { success: false, message: "Failed to upload images" },
            { status: 500 }
          );
        }
      }
      finalImageUrls = [...uploaded, ...finalImageUrls].slice(0, 4);
    }

    // DB create
    await connectDB();
    const baseSlug = slugifySimple(name);
    const timestampSuffix = Date.now().toString().slice(-6);
    const slug = `${baseSlug}-${timestampSuffix}`;

    const doc = await ShopProduct.create({
      userId,
      name,
      slug,
      description,
      price,
      offerPrice,
      image: finalImageUrls,
      category,
      isPublic: true,
      metadata: { createdByRole: role },
    });

    return NextResponse.json({ success: true, product: doc }, { status: 201 });
  } catch (err) {
    console.error("POST /api/shop-products/manage/create error:", err);
    return NextResponse.json(
      { success: false, message: err?.message || "Server error" },
      { status: 500 }
    );
  }
}


// // app/api/shop-products/manage/create/route.js
// import { v2 as cloudinary } from "cloudinary";
// import { getAuth } from "@clerk/nextjs/server";
// import authSeller from "@/lib/authSeller";
// import { NextResponse } from "next/server";
// import connectDB from "@/config/db";
// import ShopProduct from "@/models/ShopProduct";

// // configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // small slug helper
// function slugifySimple(str) {
//   return String(str || "")
//     .toLowerCase()
//     .trim()
//     .replace(/\s+/g, "-")
//     .replace(/[^\w-]+/g, "")
//     .replace(/--+/g, "-")
//     .replace(/^-+|-+$/g, "")
//     .slice(0, 140);
// }

// async function uploadBufferToCloudinary(buffer, publicIdBase = undefined) {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       { resource_type: "image", folder: "shop_products", public_id: publicIdBase },
//       (error, result) => {
//         if (error) return reject(error);
//         resolve(result);
//       }
//     );
//     stream.end(buffer);
//   });
// }

// export async function POST(request) {
//   try {
//     // Ensure Clerk auth context is available
//     const { userId } = getAuth(request);
//     if (!userId) {
//       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
//     }

//     // seller/admin check
//     const isSeller = await authSeller(userId);
//     if (!isSeller) {
//       return NextResponse.json({ success: false, message: "Forbidden - seller only" }, { status: 403 });
//     }

//     // detect content type
//     const contentType = (request.headers.get("content-type") || "").toLowerCase();

//     // We'll support two forms:
//     // 1) multipart/form-data -> request.formData() (files in 'images')
//     // 2) application/json -> request.json() (image: [url,...] optional)
//     let name = "";
//     let description = "";
//     let category = "Uncategorized";
//     let price = null;
//     let offerPrice = null;
//     let imageUrls = [];
//     let files = [];

//     if (contentType.includes("multipart/form-data")) {
//       const formData = await request.formData();

//       name = String(formData.get("name") || "").trim();
//       description = String(formData.get("description") || "").trim();
//       category = String(formData.get("category") || "Uncategorized").trim();
//       const priceRaw = formData.get("price");
//       const offerRaw = formData.get("offerPrice");

//       // gather files sent with key 'images' (may be multiple)
//       files = formData.getAll("images").filter(Boolean);

//       // fallback: sometimes client might send image URLs in a field 'image' or 'imageUrls'
//       const imageField = formData.get("image") || formData.get("imageUrls") || null;
//       if (imageField && typeof imageField === "string") {
//         try {
//           const parsed = JSON.parse(imageField);
//           if (Array.isArray(parsed)) imageUrls = parsed;
//         } catch (e) {
//           // not JSON, maybe comma-separated
//           imageUrls = String(imageField).split(",").map((s) => s.trim()).filter(Boolean);
//         }
//       }

//       price = priceRaw !== null && priceRaw !== undefined ? Number(priceRaw) : null;
//       offerPrice = offerRaw ? Number(offerRaw) : null;
//     } else {
//       // assume JSON
//       const body = await request.json();
//       name = String(body.name || "").trim();
//       description = String(body.description || "").trim();
//       category = String(body.category || "Uncategorized").trim();
//       price = body.price !== undefined ? Number(body.price) : null;
//       offerPrice = body.offerPrice !== undefined ? Number(body.offerPrice) : null;
//       if (Array.isArray(body.image)) imageUrls = body.image;
//       if (Array.isArray(body.images)) imageUrls = body.images;
//     }

//     // basic validation
//     if (!name) return NextResponse.json({ success: false, message: "Name is required" }, { status: 400 });
//     if (price === null || Number.isNaN(price)) return NextResponse.json({ success: false, message: "Price is required and must be a number" }, { status: 400 });
//     if (offerPrice !== null && Number.isNaN(offerPrice)) return NextResponse.json({ success: false, message: "OfferPrice must be a number" }, { status: 400 });

//     // If files provided, upload them. If no files but imageUrls provided, use them.
//     let finalImageUrls = Array.isArray(imageUrls) ? imageUrls.slice(0, 4) : [];

//     if (files && files.length > 0) {
//       if (files.length > 4) {
//         return NextResponse.json({ success: false, message: "Maximum 4 images allowed" }, { status: 400 });
//       }

//       // upload sequentially (safe). Convert file -> buffer
//       const uploaded = [];
//       for (let i = 0; i < files.length; i++) {
//         const file = files[i];
//         // file is a File-like object
//         try {
//           const arrayBuffer = await file.arrayBuffer();
//           const buffer = Buffer.from(arrayBuffer);
//           const publicIdBase = `${slugifySimple(name)}-${Date.now().toString().slice(-6)}-${i}`;
//           const res = await uploadBufferToCloudinary(buffer, publicIdBase);
//           uploaded.push(res.secure_url);
//         } catch (err) {
//           console.error("Cloudinary upload error:", err);
//           return NextResponse.json({ success: false, message: "Failed to upload images" }, { status: 500 });
//         }
//       }
//       // use uploaded urls first, then images provided by JSON if any (but keep to 4)
//       finalImageUrls = [...uploaded, ...finalImageUrls].slice(0, 4);
//     }

//     // connect DB and create ShopProduct
//     await connectDB();

//     const baseSlug = slugifySimple(name);
//     const timestampSuffix = Date.now().toString().slice(-6);
//     const slug = `${baseSlug}-${timestampSuffix}`;

//     const doc = await ShopProduct.create({
//       userId,
//       name,
//       slug,
//       description,
//       price,
//       offerPrice,
//       image: finalImageUrls,
//       category,
//       isPublic: true,
//       metadata: {},
//     });

//     return NextResponse.json({ success: true, product: doc }, { status: 201 });
//   } catch (err) {
//     console.error("POST /api/shop-products/manage/create error:", err);
//     return NextResponse.json({ success: false, message: err?.message || "Server error" }, { status: 500 });
//   }
// }
