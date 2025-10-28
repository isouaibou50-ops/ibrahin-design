import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import authRole from "@/lib/authRole";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const { role } = await authRole(user.id);

  if (["admin", "seller", "staff"].includes(role)) {
    redirect("/admin-dashboard");
  }

  return (
    <div className="p-6">
      <h1>User Dashboard</h1>
    </div>
  );
}
