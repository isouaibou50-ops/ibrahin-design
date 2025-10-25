import { serve } from "inngest/next";
import { inngest, syncUserCreation, syncUserDeletion, syncUserUpdation } from "@/config/inngest";
import connectDB from "@/config/db";
import Order from "@/models/Order";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion,
    createUserOrder
  ],
});


// Inngest Function to create user's order in database
export const createUserOrder = inngest.createFunction(
  {
    id: 'create-user-order',
    batchEvents: {
      maxSize: 25,
      timeout: '5s'
    }
  },
  {event: 'order/created'},
  async ({events}) => {
    const orders = events.map((event) => {
      return {
        userId: event.data.userId,
        items: event.data.items,
        amount: event.data.amount,
        address: event.data.address,
        date: event.data.data
      }
    })

    await connectDB()
    await Order.insertMany(orders)

    return { success: true, processed: orders.length}
  }

)