const feedRoutes = require("express").Router()
const { addNewsFeed, getNewsFeed } = require("../controller/newsFeedHandler")
const { uploadThumbnailURL, checkQueryField } = require("../services/newsFeedService")


/************************************************************************************************************
 *                                           [ News_Feed Routes ]
 ************************************************************************************************************/

feedRoutes.post("/addNewsFeed", uploadThumbnailURL.single('thumbnail_url'), addNewsFeed);
feedRoutes.get("/getNewsFeed", checkQueryField, getNewsFeed);

module.exports = feedRoutes;