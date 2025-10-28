// app/admin-dashboard/page.jsx
import React from "react";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";



export const dynamic = "force-dynamic";

/**
 * Protected Admin Dashboard
 * - Redirects unauthenticated users to Clerk sign-in (custom layout)
 * - Keeps Clerk redirect after login
 */
export default async function DashboardPage() {
  const user = await currentUser();

  // 🔐 Check authentication
  if (!user) {
    redirect(`/sign-in?redirect_url=${encodeURIComponent("/dashboard")}`);
  }

  // ✅ Authenticated: render your dashboard
  return (
    <div className="min-h-screen">
      <h1>Welcome back {user.fullName} to your dashboard</h1>
     
    </div>
  );
}
