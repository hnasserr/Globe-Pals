import express from 'express'
import { getAllUsers, testingEndpoint } from '../controllers/user.js';

const userRouter = express.Router();

userRouter.get("/test", testingEndpoint);
userRouter.get("/all", getAllUsers);

export default userRouter