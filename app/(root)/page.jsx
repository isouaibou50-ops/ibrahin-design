// app/page.jsx
"use client";

import React from "react";
import HeaderSlider from "@/components/HeaderSlider";
import Banner from "@/components/Banner";
import NewsLetter from "@/components/NewsLetter";
import FeaturedProduct from "@/components/FeaturedProduct";
import ShopProductsPreview from "@/components/ShopProductsPreview";

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeaderSlider />
      <section className="relative mx-auto  flex h-screen w-full max-w-7xl flex-col items-center justify-center overflow-hidden rounded-3xl">
        <div className="bg-white">
          <div className="left">
            <p>About company</p>
            <h3>Our Story</h3>
            <p>In the Tailoring and alterations landscape, we have noticed that For too long, standard sizes have crushed self-confidence. This has squeezed people into flawed templates that never truly fit. At King W Tailors, we believe everyone has the right to look and feel incredible.</p>
            <p>We over a decade of knowledge and experience. Our staff can help you find the right fabrics and styles to enhance your physique. We provide Professional Alterations, Reweaving, and Custom Clothing for men and women.</p>
          </div>
        </div>
      </section>
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
