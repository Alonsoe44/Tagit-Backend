/* eslint-disable import/first */
import dotenv from "dotenv";

dotenv.config();
import Debug from "debug";
import startServer from "./server/startServer";
import app from "./server";
import startDatabase from "./database";

const debug = Debug("tagit-backend-app:root");

const serverPort = process.env.PORT ?? 3000;
const credentials = process.env.LOGIN_CREDENTIALS;

(async () => {
  try {
    await startDatabase(credentials);
    await startServer(app, +serverPort);
  } catch (e) {
    debug(`Error starting server: ${e}`);
  }
})();
