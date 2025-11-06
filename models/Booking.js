import { Schema, model, models } from "mongoose";

const BookingSchema = new Schema({
  name: String,
  email: String,
  date: String,
  time: String,
  message: String,
}, { timestamps: true });

export const Booking = models.Booking || model("Booking", BookingSchema);




// import { Schema, model, models } from "mongoose";

// const BookingSchema = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   date: { type: String, required: true },
//   message: { type: String },
// }, { timestamps: true });

// export const Booking = models.Booking || model("Booking", BookingSchema);
