import { clerkClient } from "@clerk/nextjs/server";

export default async function authRole(userId) {
  if (!userId) {
    return {
      role: "guest",
      canRead: true,
      canCreate: false,
      canUpdate: false,
      canDelete: false,
    };
  }

  try {
    const client = await clerkClient()
    const user = await client.users.getUser(userId)
    
    // const user = await clerkClient.users.getUser(userId);
    const role = (user?.publicMetadata?.role || "guest").toLowerCase();

    const canCreate = ["seller", "staff", "admin"].includes(role);
    const canUpdate = ["seller", "staff", "admin"].includes(role);
    const canDelete = role === "admin";
    const canRead = true;

    return { role, canRead, canCreate, canUpdate, canDelete };
  } catch (err) {
    console.error("authRole error:", err);
    return {
      role: "guest",
      canRead: true,
      canCreate: false,
      canUpdate: false,
      canDelete: false,
    };
  }
}
