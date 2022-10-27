import mongoose from "mongoose";
import Debug from "debug";

const debug = Debug("tagit-backend-app:database");

const startDatabase = (connectionString: string) =>
  new Promise((resolve, reject) => {
    mongoose.connect(connectionString, (error) => {
      if (error) {
        debug(`Oh no the database couldn't start: ${error}`);
        reject();
      }
      debug(`Database connected`);
      resolve("Perfect");
    });
  });

export default startDatabase;
