import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id : { type: String, required: true},
    name: { type: String, required: true},
    email: {type : String, required: true},
    imageUrl: {type: String, require: true},
    cartItems: { type: Object, default: {}}
}, { minimize: false})

const User = model.models.user || mongoose.model('user', userSchema);

export default User;