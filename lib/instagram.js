export async function postToInstagram(product) {
  const IG_USER_ID = process.env.IG_USER_ID;
  const ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;

  try {
    // STEP 1: create media container
    const containerRes = await fetch(
      `https://graph.facebook.com/v19.0/${IG_USER_ID}/media`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_url: product.image[0],
          caption: `
            🔥 New Product

            🛍️ ${product.name}
            💰 ${product.offerPrice}€

            📝 ${product.description}

            👉 https://www.ibrahimdesign.co.za/all-shop-products/${product._id}
          `,
          access_token: ACCESS_TOKEN,
        }),
      }
    );

    const containerData = await containerRes.json();
    const creationId = containerData.id;

    if (!creationId) throw new Error("Failed to create media container");

    // STEP 2: publish it
    const publishRes = await fetch(
      `https://graph.facebook.com/v19.0/${IG_USER_ID}/media_publish`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          creation_id: creationId,
          access_token: ACCESS_TOKEN,
        }),
      }
    );

    const publishData = await publishRes.json();

    console.log("Instagram post success:", publishData);
  } catch (err) {
    console.error("Instagram error:", err.message);
  }
}