export async function postToFacebook(product) {
  const PAGE_ID = process.env.FB_PAGE_ID;
  const ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;

  try {
    // Step 1: create main post (text)
    const postRes = await fetch(
      `https://graph.facebook.com/${PAGE_ID}/feed`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `
            🔥 New Product !

            🛍️ ${product.name}
            💰 Prix: ${product.offerPrice}€
            📝 ${product.description}

            👉 Buy: https://www.ibrahimdesign.co.za/all-shop-products/${product._id}
          `,
          access_token: ACCESS_TOKEN,
        }),
      }
    );

    const postData = await postRes.json();
    const postId = postData.id;

    // Step 2: attach multiple images to same post
    const uploadPromises = product.image.map(async (imgUrl) => {
      return fetch(
        `https://graph.facebook.com/${PAGE_ID}/photos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: imgUrl,
            published: false, // important → attaches to post
            attached_media: JSON.stringify([
              { media_fbid: postId },
            ]),
            access_token: ACCESS_TOKEN,
          }),
        }
      );
    });

    await Promise.all(uploadPromises);

    console.log("Facebook multi-image post done");
  } catch (error) {
    console.error("Facebook error:", error.message);
  }
}