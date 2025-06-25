import mongoose, { Schema, Types } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import bcrypt from "bcrypt";

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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordisMatch(async function (password) {
  return await bcrypt.compare(password, this.password);
});

userSchema.plugin(mongooseAggregatePaginate);

export const User = mongoose.model("User", userSchema);
