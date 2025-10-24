import connectDB from "@/config/db";
import User from "@/models/User";
import  { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { useId } from "react";


export async function GET(request) {
    try {
        const { userId } = getAuth();

        await connectDB()
        const user = await User.findById(useId)

        if (!user) {
            return NextResponse.json({ succes: false, message: "User Not Found"})
        }

        return NextResponse.json({succes: true, user })

    } catch (error) {
        return NextResponse.json({ succes: false, message: error.message})
    }
}