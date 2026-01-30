import connectDB from "@/config/db";
import User from "@/models/User";
import {
  clerkClient,
  getAuth,
  currentUser as getCurrentUser,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User not authenticated",
      });
    }

    await connectDB();

    const user = await User.findById(userId);

    // User not in DB → create
    if (!user) {
      const clerkUser = await getCurrentUser();

      if (!clerkUser) {
        return NextResponse.json({
          success: false,
          message: "Unable to fetch Clerk user",
        });
      }

      const userData = {
        _id: userId,
        email: clerkUser.primaryEmailAddress?.emailAddress,
        name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
        imageUrl: clerkUser.imageUrl,
      };

      const newUser = await User.create(userData);

      await clerkClient.users.updateUserMetadata(userId, {
        publicMetadata: {
          role: "user",
        },
      });


      return NextResponse.json({
        success: true,
        user: newUser,
      });
    }

    return NextResponse.json({
      success: true,
      user,
    });

  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
