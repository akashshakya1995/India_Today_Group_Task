const userRoutes = require("express").Router();
const { signIn, signUp, getUser, updateUserDetails } = require("../controller/userHandler");
const { jwtVerify } = require('../../../helper/authHandler')

/************************************************************************************************************
 *                                             [ User Routes ]
 ************************************************************************************************************/

userRoutes.post("/signup", signUp);
userRoutes.post("/signin", signIn);
userRoutes.get("/getUser", jwtVerify, getUser);
userRoutes.patch("/updateDetails", jwtVerify, updateUserDetails)

module.exports = userRoutes;

