import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Error from "../../interfaces/Error";
import User from "../../database/models/UserModel";

const secret = process.env.SECRET;
const loginController = async (req, res, next) => {
  const loginErrorProtocol = () => {
    const loginError = new Error("Wrong credentials") as Error;
    loginError.status = 401;
    next(loginError);
  };

  const { username, password } = req.body;
  const userFounded = await User.findOne({ username });
  const passwordMatch = await bcrypt.compare(password, userFounded.password);

  if (!userFounded || !passwordMatch) {
    loginErrorProtocol();
  } else {
    const payloadUser = {
      name: userFounded.name,
      // eslint-disable-next-line no-underscore-dangle
      _id: userFounded._id,
    };
    const token = jwt.sign(payloadUser, secret);

    res.status(200).json({ token });
  }
};

const registerController = async (req, res) => {
  const { name, email, password } = req.body;
  const repeatedEmail = User.findOne(email);
  if (repeatedEmail) {
    res.status(200).json({ message: "The email it's already in use bruh" });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      email,
      password: hashedPassword,
    };

    const createdUser = new User(newUser);

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
