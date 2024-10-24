import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 6,
      maxLength: 18,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 15,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps }
);

const User = new mongoose.model("User", userSchema);
export default User;
