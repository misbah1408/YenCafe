import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    campusId: {
      type: Number,
      required: true,
      unique:true,
      index:true
    },
    email: {
      type: String,
      required: true,
      unique:true
    },
    password: {
      type: String,
      required: [true, "Password required"],
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

export default userSchema;
