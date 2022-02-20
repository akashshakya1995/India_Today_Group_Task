const { Router } = require("express");
const { user, news_feed } = require("../config/baseUrl");

const userRoutes = require("../module/user/routes/userRoutes");
const newsFeed=require("../module/news_feed/routes/newsFeedRoutes")

const basePath = "/INDIA_TODAY"; //  Local Side BasePath
const baseRouter = Router();
baseRouter.use(user, userRoutes);
baseRouter.use(news_feed, newsFeed);
module.exports = { baseRouter, basePath };
