import { UserModel } from "../models/user.js";

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