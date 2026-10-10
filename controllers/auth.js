import jwt from "jsonwebtoken"; //makes verification.
import { User } from "../model/user.js"; //data needed.
export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  //does token empty or not
  if (!token) return res.status(401).json({ message: "No token provided" });
  //verifying the token
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decode:", decode);
    req.user= await User.findById(decode.user_id).select("-password");
    console.log(`user info: ${req.user}`)
    next();
  } catch (error) {
    res.status(401).json("Invalid token or expired token");
  }
};
