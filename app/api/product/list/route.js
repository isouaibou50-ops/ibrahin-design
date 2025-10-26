import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import Product from "@/models/Product";
import connectDB from "@/config/db";

export async function GET() {
  try {
    await connectDB();

    const user = await currentUser(); // returns null if not logged in

    let products;

    if (user) {
      // Authenticated user — show all
      products = await Product.find({});
    } else {
      // Unauthenticated user — show limited
      products = await Product.find({ isPublic: true });
    }

    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
