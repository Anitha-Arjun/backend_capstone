import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email_id: {
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
    mob_no: {
      type: Number,
      required: true,
      unique: true,
      minLength: 7,
      maxLength: 15,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//Creating index
userSchema.index({ email_id: 1 });

const User = new mongoose.model("User", userSchema);
export default User;
