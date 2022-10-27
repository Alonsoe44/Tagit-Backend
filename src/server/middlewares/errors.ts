import Debug from "debug";

const debug = Debug("tagit-backend-app:errors");

const notFoundError = (_req, res) => {
  res
    .status(404)
    .json({
      error: true,
      message: "Error 404, there's no endpoint here buddy",
    });
};

// eslint-disable-next-line no-unused-vars
const internalServerError = (err, _req, res, _next) => {
  debug(`Error: ${err.message}`);
  const errorCode = err.status ?? 500;
  const errorMessage = err.message ?? "Internal server error";
  res.status(errorCode).json({ error: true, message: errorMessage });
};

export { notFoundError, internalServerError };
