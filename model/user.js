import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role:{
    type:String,
    enum:['user','admin'],
    default:'user'
  }
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  // next();mongoose 8 and older one is used nex()
});

userSchema.methods.comparePassword = async function (passwordInput) {
  return await bcrypt.compare(passwordInput, this.password);
};

export const User = mongoose.model("User", userSchema);
//table user should be put the data from controllers
