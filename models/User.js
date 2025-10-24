import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id : { type: String, required: true},
    name: { type: String, required: true},
    email: {type : String, required},
    imageUrl: {type: String, require},
    cartItems: { type: Object, default: {}}
}, { minimize: false})

const User = model.models.user || mongoose.model('user', userSchema);

export default User;