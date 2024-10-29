import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minLenth: 8,
    maxLength: 20,
  },
  password: {
    type: String,
    required: true,
    minLenth: 5,
    maxLength: 12,
  },
});

const Login = new mongoose.model("Login", loginSchema);
export default Login;
