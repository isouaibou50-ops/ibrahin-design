import connectDB from "@/config/db";
import ShopProduct from "@/models/ShopProduct";
import ProductsClient from "./ProductsClient";

export const dynamic = "force-dynamic";

export default async function AllShopProductsPage() {
  await connectDB();

  // Initial batch for SEO and fast First Contentful Paint
  const initialProducts = await ShopProduct.find({ isPublic: true })
    .sort({ createdAt: -1 })
    .limit(12)
    .lean();

  const categories = await ShopProduct.distinct("category");

  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Luxury Page Header */}
        <header className="mb-16 border-b border-neutral-100 pb-10">
          <span className="text-[10px] tracking-[0.5em] text-[#C9A35A] uppercase font-bold block mb-4">
            The Collection
          </span>
          <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-neutral-900">
            All Shop <span className="italic font-light text-neutral-400">Creations</span>
          </h1>
        </header>

        <ProductsClient
          initialProducts={JSON.parse(JSON.stringify(initialProducts))}
          categories={categories}
        />
      </div>
    </main>
  );
}
