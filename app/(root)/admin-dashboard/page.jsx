// app/admin-dashboard/page.jsx
import React from "react";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import AdminDashboardClient from "@/components/AdminDashboardClient";

export const dynamic = "force-dynamic";

/**
 * Protected Admin Dashboard
 * - Redirects unauthenticated users to Clerk sign-in (custom layout)
 * - Keeps Clerk redirect after login
 */
export default async function AdminDashboardPage({ searchParams }) {
  const user = await currentUser();

  // 🔐 Check authentication
  if (!user) {
    redirect(`/sign-in?redirect_url=${encodeURIComponent("/admin-dashboard")}`);
  }

  // ✅ Authenticated: render your dashboard
  return <AdminDashboardClient initialSearchParams={searchParams} />;
}
