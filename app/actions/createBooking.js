"use server";


import { Booking } from "@/models/Booking";
import { bookingSchema } from "@/lib/validation";
import connectDB from "@/config/db";


export async function createBooking(formData) {
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    datetime: formData.get("datetime"),
    message: formData.get("message"),
  };

  const parsed = bookingSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message };
  }

  await connectDB();
  await Booking.create(parsed.data);

  return { success: true };
}