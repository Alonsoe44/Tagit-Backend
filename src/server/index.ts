/* eslint-disable import/first */
import Dotenv from "dotenv";

Dotenv.config();
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import { internalServerError, notFoundError } from "./middlewares/errors";
import usersRouter from "./routers/usersRouter";
import userRouter from "./routers/userRouter";

const app = express();

app.use(cors());
app.use(morgan("dev") as unknown as string);
app.use(helmet());

app.use(express.json());

app.use("/user", userRouter);
app.use("/users", usersRouter);

app.use(notFoundError);
app.use(internalServerError);

export default app;
