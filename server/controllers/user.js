import { UserModel } from "../models/user.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config'
import { imageUpload, imageUpload2 } from "../utils/imageUpload.js";
import { cleanTemp } from "../utils/cleanTemp.js";


export const testingEndpoint = (req, res) => {
  res.send('testing route....')
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    console.log(users);
    if (users.length === 0) {
      res.status(204).json(users)
    }
    else res.status(200).json(users);

  } catch (error){
    console.log(error);
    res.status(500).json({ error: "Server failed" });
  }
}

export const registerUser = async (req, res) => { 
  const { email, username, password, firstName, lastName, birthdate, bio, avatar } = req.body;

  try { 
    console.log('Request received :>> ', req.body);
    //Check if the email or username already exists 
    const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(400).json({ error: 'Email or username already in use' });
    }

    //Hash the pasword
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let avatarObject = null;
    if (avatar) {
      try {
        avatarObject = await imageUpload2(avatar, "mern_project/users");
      } catch (uploadError) {
        console.log('Error uploading avatar:', uploadError);
        // You can choose to continue without the avatar, or return an error
        // return res.status(400).json({ error: 'Error uploading avatar' });
      }
    }
    //Create new user
    const newUser = new UserModel({
      email,
      username,
      password: hashedPassword,
      firstName,
      lastName,
      birthdate,
      bio,
      avatar: avatarObject
    })
    
    //Save the new user to database
    const savedUser = await newUser.save();

    // Generate JWT
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    savedUser.token = token;
    await savedUser.save();

    //Send response
    res.status(201).json({
      message: 'User registered successfully!',
      token,
      user: { id: savedUser._id, username: savedUser.username, email: savedUser.email }
    });

  } catch (error) {
    console.log('Error during registration', error);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
}


export const loginUser = async (req, res) => {
  const { email, username, password } = req.body;
  

  try {
    // Find user
    const user = await UserModel.findOne({ $or: [{ username }, { email }] });
    console.log(user);

    if (!user) {
      return res.status(401).json({error: 'Invalid credentials'})
    }

    console.log('Input passwords:', password, user.password);
    // Password verification
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match: ', isMatch);
    console.log('plain text password: ', password);
    console.log('hashed password: ', user.password);

    if (!isMatch) {
      return res.status(401).json({error: 'Invalid password'})
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    // Send response
    res.status(200).json({ token, user: { _id: user._id, username: user.username, email: user.email, avatar: user.avatar } });

  } catch (error) {
    console.log('Login error: ', error);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
}


export const updateUserProfile = async (req, res) => {
  // TODO: change the harcoded lines 
  // TODO: change the date from date form into a string 
  console.log(req.file)
  console.log(req.body)
  const userID = req.user.id; // Get the user ID from the auth middleware
  const { firstName, lastName, bio, birthdate } = req.body;

  try {
    let avatarObject = undefined;
    if (req.file) {
      avatarObject = await imageUpload(req.file, "mern_project/users")
      cleanTemp(req.file);
    }
    console.log(birthdate);
    console.log(typeof birthdate);
     // Find the user and update their profile
    const updatedUser = await UserModel.findByIdAndUpdate(
      userID,
      { firstName, lastName, bio, avatar: avatarObject, birthdate: birthdate ? new Date(birthdate) : undefined},
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile updated successfully!',
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        username: updatedUser.username,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        birthdate: updatedUser.birthdate,
        bio: updatedUser.bio,
        avatar: updatedUser.avatar,
      }
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
};


export const viewUserProfile = async (req, res) => {
  try {
    // The user ID is extracted from the token and attached to the req object by the auth middleware
    const userId = req.user.id;

    // Find the user by ID
    const user = await UserModel.findById(userId).select('-password'); // Exclude the password field

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Respond with the user's profile data
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find and delete the user
    const deletedUser = await UserModel.findByIdAndDelete(userId);
  //TODO: delete the trips aswell but leave the comments and the reviews 
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
};




