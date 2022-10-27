/* eslint-disable import/first */
import dotenv from "dotenv";

dotenv.config();
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import { internalServerError, notFoundError } from "./middlewares/errors";

const app = express();

app.use(cors());
app.use(morgan("dev") as unknown as string);
app.use(helmet());

app.use(express.json());

app.use(notFoundError);
app.use(internalServerError);

export default app;
