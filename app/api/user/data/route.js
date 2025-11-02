import connectDB from "@/config/db";
import User from "@/models/User";
import { clerkClient, getAuth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // ✅ Pass the request to getAuth so Clerk can extract the user
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User not authenticated",
      });
    }

    // ✅ Connect to MongoDB
    await connectDB();

    // ✅ Use userId (not useId!)
    const user = await User.findById(userId);

    if (!user) {
      const currentUser = await currentUser();
      const userData = {
        _id: userId,
        email: currentUser.primaryEmailAddress?.emailAddress,
        name: `${currentUser.firstName || ""} ${currentUser.lastName || ""}`.trim(),
        imageUrl: currentUser.imageUrl,
      };
      const newUser = await User.create(userData);

      // Set public metadata
      if (newUser) {
        await clerkClient.users.updateUserMetadata(id, {
          publicMetadata: {
            role: "user",
          },
        });
      }
      
      return NextResponse.json({
        success: true,
        newUser,
      });
    }

    // ✅ Return user data
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



// import connectDB from "@/config/db";
// import User from "@/models/User";
// import  { getAuth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";



// export async function GET(request) {
//     try {
//         const { userId } = getAuth(request);

//         await connectDB()
//         const user = await User.findById(userId)

//         if (!user) {
//             return NextResponse.json({ succes: false, message: "User Not Found"})
//         }

//         return NextResponse.json({succes: true, user })

//     } catch (error) {
//         return NextResponse.json({ succes: false, message: error.message})
//     }
// }