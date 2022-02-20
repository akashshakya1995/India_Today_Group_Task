const userRoutes = require("express").Router();
const { createUser, signIn, getUser } = require("../controller/userHandler");
const { jwtVerify } = require('../../../helper/authHandler')
const { checkRequireField, checkFieldValidation } = require("../service/userService")

/************************************************************************************************************
 *                                             [ User Routes ]
 ************************************************************************************************************/

userRoutes.patch("/createUser", checkRequireField, checkFieldValidation, createUser);
userRoutes.post("/signin", signIn);
userRoutes.get("/getUser", jwtVerify, getUser);

module.exports = userRoutes;

