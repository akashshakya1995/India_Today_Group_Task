const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    profileImage: String,
    isLogin: { type: Boolean, default: false },
    createdAt: Number,
    updatedAt: Number
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);
module.exports = { userModel };
