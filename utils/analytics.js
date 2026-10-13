// utils/analytics.js

export function trackWhatsAppConversion(serviceTitle = "General Inquiry") {
  // Check if Google Ads global tracking script is loaded in the window object
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    
    // 1. Send generic event data for Google Analytics (GA4)
    window.gtag("event", "whatsapp_click", {
      event_category: "Engagement",
      event_label: serviceTitle,
    });

    // 2. Send the precise conversion trigger to your Google Ads campaign
    // Replace 'AW-111111111/Xxxxxxxxxxxxxxx' with your actual Google Ads Conversion ID & Label
    window.gtag("event", "conversion", {
      send_to: "AW-17657264064", 
      value: 1.0,
      currency: "ZAR",
    });
    
    console.log(`[Analytics] Successfully tracked WhatsApp conversion for: ${serviceTitle}`);
  } else {
    console.warn("[Analytics] Google Tag (gtag.js) not found on window object.");
  }
}
