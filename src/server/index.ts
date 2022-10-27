/* eslint-disable import/first */
import dotenv from "dotenv";

dotenv.config();
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";

const app = express();

app.use(cors());
app.use(morgan("dev") as unknown as string);
app.use(helmet());

app.use(express.json());

export default app;
