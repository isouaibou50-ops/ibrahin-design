// app/page.jsx
"use client";

import React from "react";
import HeaderSlider from "@/components/HeaderSlider";
import Banner from "@/components/Banner";
import NewsLetter from "@/components/NewsLetter";
import FeaturedProduct from "@/components/FeaturedProduct";
import ShopProductsPreview from "@/components/ShopProductsPreview";
import { AboutSection } from "@/components/IbTailoring/about-section";
import ClientGallery from "@/components/ClientGallery";

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeaderSlider />
      <AboutSection />
      <ClientGallery />
      <ShopProductsPreview />
      {/* If you want the older HomeProducts section uncomment */}
      {/* <HomeProducts /> */}
      <FeaturedProduct />
      <Banner />
      {/* <NewsLetter /> */}
    </div>
  );
};

export default Home;
