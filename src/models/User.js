import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    recipes: [{type: mongoose.Schema.Types.ObjectId, ref: "Recipe"}]
})

export const UserModel = mongoose.model("User", UserSchema);