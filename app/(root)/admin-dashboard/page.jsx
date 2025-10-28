import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import authRole from "@/lib/authRole";
import AdminDashboardClient from "@/components/AdminDashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const user = await currentUser();
  if (!user) {
    redirect(`/sign-in?redirect_url=${encodeURIComponent("/admin-dashboard")}`);
  }

  const { role } = await authRole(user.id);

  console.log("🧠 Logged in role:", role);

  // ✅ Only allow admin, seller, staff (no redirect loop)
  if (!["admin", "seller", "staff"].includes(role)) {
    redirect("/dashboard");
  }

  return <AdminDashboardClient role={role} />;
}
