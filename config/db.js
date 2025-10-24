import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: "ibrahimdesign",
    };

    // ✅ Don't use await + .then — just return the Promise
    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
      console.log("✅ Connected to MongoDB");
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;










// import mongoose from "mongoose";

// let cached = global.mongoose;

// if (!cached) {
//     cached = global.mongoose = { conn: null, promise: null}
// }


// async function connectDB() {
//     if (cached.conn) {
//         return cached.conn
//     }

//     if (!cached.promise) {
//         const opts = {
//             bufferCommands:false
//         }
//         cached.promise = (await mongoose.connect(`${process.env.MONGODB_URI}/ibrahimdesign`, opts)).then((mongoose) => {
//             return mongoose;
//         })
//     }
//     cached.conn = await cached.promise
//     return cached.conn
// }

// export default connectDB