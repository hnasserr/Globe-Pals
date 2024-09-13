import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  firstName: String,
  lastName: String,
  birthdate: Date,
  bio: { type: String, default: '' },
  avatar: { 
    url: { type: String, default: 'https://res.cloudinary.com/cozoprojects/image/upload/v1724841498/icons8-user-default-64_nkanlm.png' },
    public_id: {type: String }
  }
}, { timestamps: true })


export const UserModel = mongoose.model("User", userSchema);