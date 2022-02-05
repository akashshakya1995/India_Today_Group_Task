const bcrypt = require("bcryptjs");
const fs = require('fs');
const path = require('path')
const { bcryptfun } = require("../../../helper/comFunction");
const { userModel } = require("../model/userModel");

/********************************************************************************************************
 *                                        [ Helping Function ]
 ********************************************************************************************************/

// For check user exist or not on signUp time..
const checkUserExist = async function (email, res) {
  return new Promise(async (resolve, reject) => {
    const result = await userModel.findOne({ email });
    if (result) {
      return sendRes(res, "User already exist here from this email.", false, 302);
    } else {
      resolve()
    }
  })
};
// For check user verify or not on login time..
const checkUserVerified = async function (email, password) {
  const result = await userModel.findOne({ email });
  if (!result) {
    throw new Error("This user is not exist here.");
  }
  const verifyPass = await bcrypt.compare(password, result.password); // Password matching
  if (!verifyPass) {
    throw new Error("Invalid credential.");
  }
  return result;
};
// For upload profile image of user..
const uploadProfileImage = async function (res, files) {
  return new Promise(async (resolve, reject) => {
    var file_name = path.basename(files.profileImage.originalFilename); // Get file name
    file_name = Math.floor(1000 + Math.random() * 9000) + file_name     // Get random number for user profile image
    const file_ext = path.extname(files.profileImage.originalFilename); // Get file extension
    const allowedImageTypes = [".jpg", ".jpeg", ".png"];                // Check file valid or not
    if (!allowedImageTypes.includes(file_ext)) {
      return sendRes(res, "Image not allowed with this extension.", false, 406);
    }
    const newPath = path.join('uploadFile'); // Create local dir..
    if (!fs.existsSync(newPath)) {
      fs.mkdirSync(newPath);
    }
    fs.readFile(files.profileImage.filepath, async function (err, data) { // Read profile image form data
      if (err) {
        return sendRes(res, err, false, 400);
      }
      fs.writeFile(newPath + "/" + file_name, data, function (err, data) {  // Write profile image in local dir
        if (err) {
          return sendRes(res, err, false, 400);
        } else {
          resolve(file_name)
        }
      })
    })
  })
}
// For update profile image of user..
const updateProfileImage = async function (req, res, files) {
  return new Promise(async (resolve, reject) => {
    const newPath = path.join('uploadFile');
    fs.unlink(newPath + "/" + req.userDetails.profileImage, async function (err, data) { // Delete profile image of user first
      if (err) {
        return sendRes(res, err, false, 501);
      } else {
        resolve(await uploadProfileImage(res, files)) // Now update new profile image of user
      }
    });
  })

}

module.exports = {
  checkUserVerified,
  checkUserExist,
  uploadProfileImage,
  updateProfileImage
};
