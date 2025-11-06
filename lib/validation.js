import { z } from "zod";

// Using z.email() instead of deprecated z.string().email()
export const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Invalid email address"),
  datetime: z.string().min(1, "Please select date and time"),
  message: z.string().optional(),
});
