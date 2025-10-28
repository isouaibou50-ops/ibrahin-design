/**
 * scripts/migrate-products-to-shopproduct.js
 *
 * Self-contained migration script using the MongoDB driver.
 * Run from project root.
 *
 * Usage:
 *   Dry run (preview): node ./scripts/migrate-products-to-shopproduct.js --dry --limit=10
 *   Real run:          node ./scripts/migrate-products-to-shopproduct.js --limit=500
 */

import dotenv from "dotenv";
dotenv.config();

import { MongoClient } from "mongodb";
import slugify from "slugify";

const argv = Object.fromEntries(
  process.argv.slice(2).map(arg => {
    const [k, v] = arg.split("=");
    return [k.replace(/^--/, ""), v ?? true];
  })
);

const DRY = argv.dry === "true" || argv.dry === true;
const LIMIT = argv.limit ? Number(argv.limit) : null;
const BATCH = argv.batch ? Number(argv.batch) : 500;

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI environment variable. Set it in your .env file.");
  process.exit(1);
}

function makeSlug(name, idSuffix) {
  const base = slugify(name || "product", { lower: true, strict: true }).slice(0, 180);
  return `${base}-${idSuffix}`;
}

async function run() {
  const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const db = client.db(); // default DB from URI
  console.log("Connected to DB:", db.databaseName);

  // Adjust collection name if your legacy collection is singular 'product' instead of 'products'
  const legacyCollName = "product"; // try "product" first (change to "products" if needed)
  const shopCollName = "ShopProduct"; // target collection

  // Verify collections present
  const collections = await db.listCollections().toArray();
  const collNames = collections.map(c => c.name);
  if (!collNames.includes(legacyCollName) && collNames.includes("products")) {
    console.log(`Note: legacy collection "${legacyCollName}" not found; switching to "products".`);
    // fallback to plural
    legacyCollName = "product";
  }

  const legacyColl = db.collection(legacyCollName);
  const shopColl = db.collection(shopCollName);

  const legacyCount = await legacyColl.countDocuments();
  console.log("Legacy products count:", legacyCount);

  const limit = LIMIT ? Math.min(LIMIT, legacyCount) : legacyCount;
  const cursor = legacyColl.find({}).sort({ _id: 1 }).limit(limit);

  let processed = 0;
  let migrated = 0;
  let skipped = 0;

  while (await cursor.hasNext()) {
    const doc = await cursor.next();
    processed++;

    try {
      const legacyId = String(doc._id);
      const name = doc.name || "Untitled Product";
      const idSuffix = legacyId.slice(-6);
      const slug = makeSlug(name, idSuffix);

      const shopDoc = {
        userId: doc.userId ?? null,
        name,
        slug,
        description: doc.description ?? "",
        price: typeof doc.price === "number" ? doc.price : 0,
        offerPrice: typeof doc.offerPrice === "number" ? doc.offerPrice : null,
        image: Array.isArray(doc.image) ? doc.image : doc.image ? [doc.image] : [],
        category: doc.category ?? "uncategorized",
        isPublic: doc.isPublic === undefined ? true : !!doc.isPublic,
        metadata: { legacyId },
        createdAt: doc.createdAt ? new Date(doc.createdAt) : doc.date ? new Date(doc.date) : new Date(),
        updatedAt: doc.updatedAt ? new Date(doc.updatedAt) : doc.date ? new Date(doc.date) : new Date(),
      };

      if (DRY) {
        console.log(`[DRY] Upsert slug=${slug} legacyId=${legacyId} images=${shopDoc.image.length}`);
      } else {
        // Upsert by metadata.legacyId to avoid slug collisions and ensure idempotency
        const filter = { "metadata.legacyId": legacyId };
        const update = { $setOnInsert: shopDoc };
        const res = await shopColl.updateOne(filter, update, { upsert: true });

        if (res.upsertedCount && res.upsertedCount > 0) {
          migrated++;
          console.log(`[MIGRATED] legacyId=${legacyId} slug=${slug}`);
        } else {
          skipped++;
          if ((processed % 100) === 0) {
            console.log(`[SKIPPED] legacyId=${legacyId} (already migrated)`);
          }
        }
      }
    } catch (err) {
      console.error(`[ERROR] processing legacy _id=${doc._id}:`, err.message || err);
    }

    if (processed % BATCH === 0) {
      console.log(`Processed ${processed}/${limit} (migrated ${migrated}, skipped ${skipped})`);
      await new Promise(r => setTimeout(r, 200));
    }
  }

  console.log("Finished migration run.");
  console.log(`Processed: ${processed}, Migrated: ${migrated}, Skipped: ${skipped}`);

  await client.close();
  process.exit(0);
}

run().catch(err => {
  console.error("Migration failed:", err);
  process.exit(1);
});
