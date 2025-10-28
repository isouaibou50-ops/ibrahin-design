import connectDB from "@/config/db";
import ShopProduct from "@/models/ShopProduct";
import ProductsClient from "./ProductsClient";

export const dynamic = "force-dynamic"; // ensures fresh data on production

export default async function AllShopProductsPage() {
  await connectDB();

  // ✅ Initial batch for SSR (SEO + instant load)
  const initialProducts = await ShopProduct.find({ isPublic: true })
    .sort({ createdAt: -1 })
    .limit(20)
    .lean();

  const categories = await ShopProduct.distinct("category");

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <section className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">
            All Shop Products
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Browse the latest handmade creations and unique pieces
          </p>
        </header>

        <ProductsClient
          initialProducts={JSON.parse(JSON.stringify(initialProducts))}
          categories={categories}
        />
      </section>
    </main>
  );
}
