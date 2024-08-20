import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  firstName: String,
  lastName: String,
  birthdate: Date,
  bio: { type: String, default: '' },
  image: { type: String, default: '' }
}, { timestamps: true })


export const UserModel = mongoose.model("User", userSchema);