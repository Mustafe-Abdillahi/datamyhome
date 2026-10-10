import { User } from "../model/user.js";
import { generateToken } from "../utils/generateToken.js";

export const getUser = async (req, res, next) => {
  const user = await User.find();
  if (!user) return res.status(400).json(`user not found`);
  res.status(201).json(user);
};

export const createUser = async (req, res, next) => {
  let { name, email, password, role } = req.body;
  try {
    email = email.toLowerCase();
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already exists" });
    }
    const newUser = await User.create({ name, email, password, role });
    const token = generateToken(newUser._id);

    return res.status(201).json(token);
  } catch (error) {
    next(error)
  }
};

export const loginUser = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    email = email.toLowerCase();
    const user = await User.findOne({ email });
    const isPasswordCorrect = await user.comparePassword(password);
    if (!user) return res.status(400).send(`user does not found`);
    if (!isPasswordCorrect) {
      return res.status(400).send("Incorrect password");
    }
    const token = generateToken(user._id);
    res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
