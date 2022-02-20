const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "other"], default: "male" },
    langauge: { type: String, enum: ["hindi", "english"], default: "hindi" },
    maritalStatus: { type: String, enum: ["yes", "no"], required: true, default: "no" },
    dateOfBirth: { type: String, required: true },
    timeOfBirth: { type: String, required: true },
    profileImage: String,
    isLogin: { type: Boolean, default: false },
    createdAt: Number,
    updatedAt: Number
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);
module.exports = { userModel };
