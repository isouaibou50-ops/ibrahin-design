// components/GoogleAdsScript.jsx
"use client";

import Script from "next/script";

export default function GoogleAdsScript() {
  // Replace AW-11111111111 with your actual Google Ads Conversion ID
  const GA_CONVERSION_ID = "AW-11111111111"; 

  return (
    <>
      <Script
        src={`https://googletagmanager.com{GA_CONVERSION_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_CONVERSION_ID}');
        `}
      </Script>
    </>
  );
}
