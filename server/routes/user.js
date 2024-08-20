import express from 'express'
import { deleteUser, getAllUsers, loginUser, registerUser, testingEndpoint, updateUserProfile, viewUserProfile } from '../controllers/user.js';
import { authorize } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.get("/test", testingEndpoint);
userRouter.get("/all", getAllUsers);
userRouter.post('/register', registerUser);
userRouter.post("/login", loginUser);
userRouter.put('/update', authorize, updateUserProfile);
userRouter.get('/profile', authorize, viewUserProfile);
userRouter.delete('/delete', authorize, deleteUser);



export default userRouter