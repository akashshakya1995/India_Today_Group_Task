const { userModel } = require("../model/userModel");
const { jwtToken } = require("../../../helper/comFunction");
const { bcryptfun } = require("../../../helper/comFunction")
const { checkUserVerified, updateProfileImage } = require("../service/userService");

/************************************************************************************************************
 *                                  User API [ CreateUserProfile-GetUser ]
 ************************************************************************************************************/

const createUser = async function (req, res) { // For create user profile.(User details should be in form data)
  try {
    const updateObj = {
      userName: req.formData.userName, email: req.formData.email, phoneNumber: "+" + req.formData.phoneNumber, gender: req.formData.gender,
      langauge: req.formData.langauge, maritalStatus: req.formData.maritalStatus, dateOfBirth: req.formData.dateOfBirth, timeOfBirth: req.formData.timeOfBirth
    }
    updateObj["password"] = await bcryptfun(req.formData.password, res) // Password encryption
    if (req.formData && req.formData.profileImage) {
      updateObj["profileImage"] = await updateProfileImage(req, res) // Upload profile image
    }
    const userSignup = await userModel.updateOne({ email: req.formData.email }, { $set: updateObj }, { upsert: true }); // New or user updated 
    return sendRes(res, "Successfully created user profile.", true, 201, userSignup);
  } catch (error) {
    return sendRes(res, error.message, false, 406);
  }
};

// For login user
const signIn = async function (req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return sendRes(res, "Please provide required login details as a email and password", false, 400);
    }
    const result = await checkUserVerified(email, password); // Verified user login details
    const token = await jwtToken({ email: result.email }); // Create token for user
    await userModel.updateOne({ email: result.email }, { $set: { isLogin: true } }, { upsert: true });  // Maintain user login status
    return sendRes(res, "Successfully signin.", true, 303, token);
  } catch (error) {
    return sendRes(res, error.message, false, 404);
  }
};

// For get user details with JWT.
const getUser = async function (req, res) {
  try {
    const result = await userModel.findOne({ email: req.userDetails.email })  // To get authorized user data 
    return sendRes(res, "Successfully get user data.", true, 200, result);
  } catch (error) {
    return sendRes(res, error.message, false, 404);
  }
}


module.exports = {
  createUser,
  signIn,
  getUser,
};
