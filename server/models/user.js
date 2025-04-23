import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resume: { type: String },
  image: { type: String, required: true },
});

//create user model
const userModel = mongoose.models.user || mongoose.model("user",userSchema)


export default userModel
