const { newsFeedModel } = require("../model/newsFeedModel")


/************************************************************************************************************
 *                                  News_Feed API [ AddNewsFeed-GetNewsFeed ]
 ************************************************************************************************************/

// For add news feed
const addNewsFeed = async function (req, res) {
  try {
    const { author_name, headline, category } = req.body;
    const obj = { author_name, headline, category };
    if (req.thumbnail_url) {
      obj["thumbnail_url"] = req.thumbnail_url;
    }
    const newsFeedData = await newsFeedModel.create(obj);
    return sendRes(res, "Successfully added new news feed.", true, 201, newsFeedData);
  } catch (error) {
    return sendRes(res, error.message, false, 400);
  }
};

// For all get news feed
const getNewsFeed = async function (req, res) {
  try {
    var condition = {}
    if (req.query) { condition = createPipeline(req.query) } // If the field is in the query then the filter is created.
    const data = await newsFeedModel.find(condition).sort({ updatedAt: -1 });
    return sendRes(res, "Successfully get news feed.", true, 200, data);
  } catch (error) {
    return sendRes(res, error.message, false, 400);
  }
};


const createPipeline = function (query) {
  try {
    var condition = { $and: [] }
    if (query.author_name) {
      var auther = []
      JSON.parse(query.author_name).forEach(el => { auther.push({ author_name: el }) })
      condition.$and.push({ $or: auther })
    }
    if (query.category) {
      var category = []
      JSON.parse(query.category).forEach(el => { category.push({ category: el }) })
      condition.$and.push({ $or: category })
    }
    if (condition && condition.$and && condition.$and.length <= 0) { condition = {} }
    return condition;
  } catch (err) {
    throw new Error("Bad Request")
  }
}

module.exports = { addNewsFeed, getNewsFeed }