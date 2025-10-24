import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";

// Create the Inngest client
export const inngest = new Inngest({ id: "ibrahimdesign-app" });

// -------------------
// 🧩 CREATE USER
// -------------------
export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event, step }) => {
    try {
      const { id, first_name, last_name, email_addresses, image_url } = event.data;
      const userData = {
        _id: id,
        email: email_addresses?.[0]?.email_address,
        name: `${first_name || ""} ${last_name || ""}`.trim(),
        imageUrl: image_url,
      };

      await step.run("connect-db", async () => connectDB());
      const newUser = await step.run("create-user", async () => User.create(userData));

      console.log("✅ User created:", newUser._id);
      return { success: true, message: "User created", id: newUser._id };
    } catch (error) {
      console.error("❌ Error in syncUserCreation:", error);
      return { success: false, error: error.message };
    }
  }
);

// -------------------
// 🧩 UPDATE USER
// -------------------
export const syncUserUpdation = inngest.createFunction(
  { id: "update-user-with-clerk" },
  { event: "clerk/user.updated" },
  async ({ event, step }) => {
    try {
      const { id, first_name, last_name, email_addresses, image_url } = event.data;
      const userData = {
        email: email_addresses?.[0]?.email_address,
        name: `${first_name || ""} ${last_name || ""}`.trim(),
        imageUrl: image_url,
      };

      await step.run("connect-db", async () => connectDB());
      const updatedUser = await step.run("update-user", async () =>
        User.findByIdAndUpdate(id, userData, { new: true })
      );

      console.log("🔄 User updated:", id);
      return { success: true, message: "User updated", id };
    } catch (error) {
      console.error("❌ Error in syncUserUpdation:", error);
      return { success: false, error: error.message };
    }
  }
);

// -------------------
// 🧩 DELETE USER
// -------------------
export const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event, step }) => {
    try {
      const { id } = event.data;

      await step.run("connect-db", async () => connectDB());
      await step.run("delete-user", async () => User.findByIdAndDelete(id));

      console.log("🗑️ User deleted:", id);
      return { success: true, message: "User deleted", id };
    } catch (error) {
      console.error("❌ Error in syncUserDeletion:", error);
      return { success: false, error: error.message };
    }
  }
);






// import { Inngest } from "inngest";
// import connectDB from "./db";
// import User from "@/models/User";

// // Create a client to send and receive events
// export const inngest = new Inngest({ id: "ibrahimdesign-app" });

// // Inngest function to save data to adatabase
// export const syncUserCreation = inngest.createFunction(
//     {
//         id: 'sync-user-from-clerk'
//     },
//     { event: 'clerk/user.created'},
//     async ({event}) => {
//         const { id, first_name, last_name, email_addresses, image_url } = event.data;
//         const userData = {
//             _id: id,
//             email: email_addresses[0].email_address,
//             name: first_name + ' ' + last_name,
//             imageUrl: image_url
//         }
//         await connectDB();
//         await User.create(userData)
//     }
// )

// // Inngest function to update data to adatabase
// export const syncUserUpdation = inngest.createFunction(
//     {
//         id: 'update-user-with-clerk'
//     },
//     { event: 'clerk/user.updated'},
//     async ({event}) => {
//         const { id, first_name, last_name, email_addresses, image_url } = event.data;
//         const userData = {
//             _id: id,
//             email: email_addresses[0].email_address,
//             name: first_name + ' ' + last_name,
//             imageUrl: image_url
//         }
//         await connectDB();
//         await User.findByIdAndUpdate(id, userData)
//     }
// )

// // Inngest function to delete data to adatabase
// export const syncUserDeletion = inngest.createFunction(
//     {
//         id: 'delete-user-with-clerk'
//     },
//     { event: 'clerk/user.deleted'},
//     async ({event}) => {
//         const { id } = event.data;
        
//         await connectDB();
//         await User.findByIdAndDelete(id)
//     }
// )