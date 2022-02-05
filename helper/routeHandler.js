const { Router } = require("express");
const { user } = require("../config/baseUrl");

const userRoutes = require("../module/user/routes/userRoutes");

const basePath = "/SIMFORMtest"; //  Local Side BasePath
const baseRouter = Router();
baseRouter.use(user, userRoutes);
module.exports = { baseRouter, basePath };
