import express from "express";
import { createUserNote, getUserData } from "../controllers/user";

const userRouter = express.Router();

userRouter.get("/:id", getUserData);
userRouter.post("/:id", createUserNote);

export default userRouter;
