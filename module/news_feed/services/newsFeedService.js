const multer = require("multer");

/********************************************************************************************************
 *                                        [ Helping Function ]
 ********************************************************************************************************/

// For upload video of news feed.
const storageProfile = multer.diskStorage({
  destination: "./uploadFile",
  filename: function (req, file, cb) {
    if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
      return cb(new Error('Video is not allowed with this extension.'))
    }
    let fileName = Date.now() + "-" + file.originalname;
    req.thumbnail_url = `http://localhost:${process.env.PORT}/getimage/${fileName}`; // Prepared video url
    return cb(null, fileName);
  },
  onError: function (err, next) {
    console.log(err);
    next(err);
  }
});
const uploadThumbnailURL = multer({ storage: storageProfile });

// For check query field validation.
const checkQueryField = async function (req, res, next) {
  try {
    if ((Object.keys(req.query).length > 0)) { // If the field is in the query but that field value is not assigned.
      Object.keys(req.query).forEach(el => {
        if (!req.query[el]) {
          throw new Error("Bad Request,field value should not be blank.")
        }
      })
    }
    // If field is in query but that field value is not in array and array length should not be zero
    if ((Object.keys(req.query).length > 0 && req.body.author_name && JSON.parse(req.query.author_name).length == 0) || (Object.keys(req.query).length > 0 && req.query.category && JSON.parse(req.query.category).length == 0)) {
      throw new Error("Bad Request,array length should not be zero.")
    }
    next()
  } catch (err) {
    return sendRes(res, err.message, false, 400);
  }
}
module.exports = {
  uploadThumbnailURL,
  checkQueryField
};