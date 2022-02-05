const { verify } = require("jsonwebtoken");
const { userModel } = require("../module/user/model/userModel");
const { jwtSecretKey } = require("../config/config.json");

/************************************************************************************************************
 *                                         User [ Authentication ]
 ************************************************************************************************************/
//Token verify here..
const jwtVerify = async (req, res, next) => {
  if (
    req.headers.authorization == "null" ||
    req.headers.authorization == "" ||
    req.headers.authorization == "undefined" ||
    req.headers.authorization == null ||
    req.headers.authorization == undefined ||
    (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] !== "Bearer")
  ) {
    return sendRes(res, "Authorization token is required as Bearer", false, 401);
  }
  verify(req.headers.authorization.split(' ')[1], jwtSecretKey, function (err, decoded) {
    if (err) {
      return sendRes(res, "Unauthorized Access", false, 401);
    } else {
      userModel.findOne({ email: decoded.email }).then(result => { // To check user exist or not in db
        if (!result) {
          return sendRes(res, "This user is not exist here.!", false, 404)
        }
        if (result.isLogin == false) {
          return sendRes(res, "Session Expired.", false, 440);
        }
        req.userDetails = result;
        next();
      });
    }
  });
};

module.exports = { jwtVerify };

