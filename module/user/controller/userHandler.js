const formidable = require('formidable');
const { userModel } = require("../model/userModel");
const { jwtToken } = require("../../../helper/comFunction");
const { bcryptfun } = require("../../../helper/comFunction")
const { checkUserExist, checkUserVerified, uploadProfileImage, updateProfileImage } = require("../service/userService");

/************************************************************************************************************
 *                                   User API [ SignIn-UpdateUserDetails ]
 ************************************************************************************************************/
const signUp = async function (req, res) { // For signup user.(Signup details should be in form data)
  try {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      const { firstName, lastName, email, password } = fields;
      if (err) { return sendRes(res, "Error in file!", false, 501) }
      if (!email || !password) {
        return sendRes(res, "Please provide required signup details as a email and password", false, 400);
      }
      await checkUserExist(email, res); // Check user exist or not
      const obj = { firstName, lastName, email };
      obj["password"] = await bcryptfun(password, res) // Password encryption
      if (files.profileImage) {
        obj["profileImage"] = await uploadProfileImage(res, files) // Upload profile image
      }
      const userSignup = await userModel.create(obj) // New user created 
      return sendRes(res, "Successfully signUp.", true, 201, userSignup);
    })
  } catch (error) {
    return sendRes(res, error.message, false, 406);
  }
};

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

const getUser = async function (req, res) {
  try {
    const result = await userModel.findOne({ email: req.userDetails.email })  // To get authorized user data 
    return sendRes(res, "Successfully get user data.", true, 200, result);
  } catch (error) {
    return sendRes(res, error.message, false, 404);
  }
}

// For update user details.(Update details should be in form data)
const updateUserDetails = async function (req, res) {
  try {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      const { firstName, lastName, email, password } = fields;
      const updateQuery = { firstName, lastName };
      if (email) {
        await checkUserExist(email, res) // Check user exist or not
        updateQuery["email"] = email
      }
      if (password) {
        updateQuery["password"] = await bcryptfun(password, res) // Password encryption
        updateQuery["isLogin"] = false
      }
      if (files.profileImage) {
        updateQuery["profileImage"] = await updateProfileImage(req, res, files) // Update profile image 
      }
      await userModel.updateOne({ email: req.userDetails.email }, { $set: updateQuery }, { upsert: true }); // Update user details 
      return sendRes(res, "Successfully updated user data.", true, 200);
    })
  } catch (error) {
    return sendRes(res, error.message, false, 304);
  }
};
module.exports = {
  signUp,
  signIn,
  getUser,
  updateUserDetails
};
