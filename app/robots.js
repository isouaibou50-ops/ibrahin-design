// app/robots.js

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/services"],
      disallow: ["/api/", "/admin/", "/sign-in", "/sign-up"],
    },
    sitemap: "https://ibrahimdesign.co.za/sitemap.xml",
    host: "https://ibrahimdesign.co.za",
  };
}
