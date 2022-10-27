import Debug from "debug";

const debug = Debug("tagit-backend-app:serverStart");

const startServer = (app, port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(`Server started on port ${port}`);
      resolve(server);
    });

    server.on("error", (err) => {
      debug(`Error starting server on port ${port}`);
      reject(err);
    });
  });

export default startServer;
