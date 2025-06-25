import mongoose, { Schema, Types } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const userSchema = new Schema(
  {
    username: {
      Types: Boolean,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      Types: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      Types: String,
      required: true,
      trim: true,
    },
    profile_photo: {
      Types: String,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(mongooseAggregatePaginate);

export const User = mongoose.model("User", userSchema);
