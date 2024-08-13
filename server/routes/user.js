import express from 'express'
import { testingEndpoint } from '../controllers/user.js';

const userRouter = express.Router();

userRouter.get("/test", testingEndpoint)

export default userRouter