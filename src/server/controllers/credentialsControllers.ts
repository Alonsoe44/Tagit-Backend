/* eslint-disable import/first */
import Dotenv from "dotenv";

Dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorInterface from "../../interfaces/Error";
import User from "../../database/models/UserModel";

const secret = process.env.SECRET;

const loginController = async (req, res, next) => {
  const loginErrorProtocol = () => {
    const loginError = new Error("Wrong credentials") as ErrorInterface;
    loginError.status = 401;
    next(loginError);
  };

  const credentials = req.body;

  if ("email" in credentials && "password" in credentials) {
    const { email, password } = credentials;

    const userFounded = await User.findOne({ email });
    const passwordMatch = await bcrypt.compare(
      password,
      userFounded ? userFounded.password : "noPassword"
    );

    if (!userFounded || !passwordMatch) {
      loginErrorProtocol();
    } else {
      const payloadUser = {
        name: userFounded.name,
        // eslint-disable-next-line no-underscore-dangle
        _id: userFounded._id,
      };
      const token = await jwt.sign(payloadUser, secret);

      res.status(200).json({ token });
    }
  } else {
    const requestError = new Error(
      "You must have the email and password properties in the request"
    ) as ErrorInterface;
    requestError.status = 400;
    next(requestError);
  }
};

const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  const repeatedEmail = await User.findOne({ email });

  if (repeatedEmail) {
    res.status(200).json({ message: "The email it's already in use bruh" });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      email,
      password: hashedPassword,
    };

    const createdUser = await User.create(newUser);

    const payloadUserData = {
      name,
      // eslint-disable-next-line no-underscore-dangle
      _id: createdUser._id,
    };

    const token = await jwt.sign(payloadUserData, secret);
    res.json({ token });
  }
};

export { loginController, registerController };
