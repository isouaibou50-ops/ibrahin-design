// models/ShopProduct.js
import mongoose from "mongoose";

const shopProductSchema = new mongoose.Schema(
  {
    userId: { type: String, ref: "user", default: null }, // creator (optional)
    name: { type: String, required: true, trim: true, index: true },
    slug: { type: String, required: true, trim: true, index: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, default: null },
    image: { type: [String], default: [] }, // array of image URLs (Cloudinary)
    category: { type: String, index: true, default: "uncategorized" },
    isPublic: { type: Boolean, default: true },
    metadata: { type: Object, default: {} },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// index to speed public listing queries
shopProductSchema.index({ isPublic: 1, createdAt: -1 });


const ShopProduct = mongoose.models.ShopProduct || mongoose.model("ShopProduct", shopProductSchema);
export default ShopProduct;
