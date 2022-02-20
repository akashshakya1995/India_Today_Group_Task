const formidable = require('formidable');
const bcrypt = require("bcryptjs");
const path = require('path')
const moment = require('moment')
const fs = require('fs');
const { validate } = require("email-validator");
const { userModel } = require("../model/userModel");

/********************************************************************************************************
 *                                        [ Helping Function ]
 ********************************************************************************************************/

// For check required fields of user profile.
const checkRequireField = async function (req, res, next) {
  const form = new formidable.IncomingForm()
  form.parse(req, async (err, fields, files) => {
    if (err) { return sendRes(res, "Error in file!", false, 501) }
    const { userName, email, password, phoneNumber, maritalStatus, dateOfBirth, timeOfBirth } = fields;
    if (!userName || !email || !password || !phoneNumber || !maritalStatus || !dateOfBirth || !timeOfBirth) {
      const ReqObjArray = ["userName", "email", "password", "phoneNumber", "maritalStatus", "dateOfBirth", "timeOfBirth"]
      const reqFields = ReqObjArray.filter(el => { if (!fields[el]) { return el; } })
      return sendRes(res, `Please provide required field as a ${reqFields.join(",")}`, false, 400);
    } else {
      req.formData = fields
      req.formData["profileImage"] = (files && files.profileImage) || false
      next()
    }
  })
}

// For check validation of user profile.
const checkFieldValidation = async function (req, res, next) {
  if (!validate(req.formData.email)) {
    return sendRes(res, "Please provide valid email.", false, 406);
  }
  if (req.formData.password.length < 8) {
    return sendRes(res, "Password length should be minimum 8 character.", false, 406);
  }
  if (/^((\\+91-?)|0)?[0-9]{12}$/.test(req.formData.phoneNumber) == false) { // Note-do not use (+) sign with country code.
    return sendRes(res, "Phone No. is not valid, Please enter 12 digit phone no. with country code.", false, 406);
  }
  if (!moment(req.formData.dateOfBirth, "YYYY-MM-DD", true).isValid()) { // Check format of date of birth field.
    return sendRes(res, "Please provide valid date of birth with this format 'YYYY-MM-DD'", false, 406)
  }
  if (moment().subtract(1, "days").format("YYYY-MM-DD") < moment(req.formData.dateOfBirth).format("YYYY-MM-DD")) { // Note-Date of birth should not be equal to or greater than today.
    return sendRes(res, "Please provide valid date,should not be greater.", false, 406)
  }
  if (!moment(req.formData.timeOfBirth, "HH:mm", true).isValid()) { // Check format of time of birth.
    return sendRes(res, "Please provide valid time with this format 'HH:mm'", false, 406)
  }
  await checkUserExist(req)
  next()
}

// For check user exist or not on create profile time.
const checkUserExist = async function (req) {
  try {
    const result = await userModel.findOne({ $or: [{ email: req.formData.email }, { userName: req.formData.userName }] });
    if (result) {
      req.userDetails = result
    }
  } catch (err) {
    throw new Error(err)
  }
};

// For check user verify or not on login time..
const checkUserVerified = async function (email, password) {
  try {
    const result = await userModel.findOne({ email: email });
    if (!result) {
      throw new Error("This user is not exist here.");
    }
    const verifyPass = await bcrypt.compare(password, result.password); // Password matching
    if (!verifyPass) {
      throw new Error("Invalid credential.");
    }
    return result;
  } catch (err) {
    throw new Error(err)
  }
};

// For upload profile image of user..
const uploadProfileImage = async function (files, res) {
  return new Promise(async (resolve, reject) => {
    var file_name = path.basename(files.profileImage.originalFilename); // Get file name
    file_name = Math.floor(1000 + Math.random() * 9000) + file_name     // Get random number for user profile image
    const file_ext = path.extname(files.profileImage.originalFilename); // Get file extension
    const allowedImageTypes = [".jpg", ".jpeg", ".png"];                // Check file valid or not
    if (!allowedImageTypes.includes(file_ext)) {
      return sendRes(res, "Image is not allowed with this extension.", false, 406);
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
const updateProfileImage = async function (req, res) {
  return new Promise(async (resolve, reject) => {
    const newPath = path.join('uploadFile'); // Create local dir..
    if (!fs.existsSync(newPath)) {
      fs.mkdirSync(newPath);
    }
    fs.stat(newPath + "/" + (req.userDetails && req.userDetails.profileImage) || "", async function (err, stat) { // Check file exist or not
      if (err && err.code == 'ENOENT') {
        resolve(await uploadProfileImage(req.formData, res)) // Now create new profile image of user 
      } else {
        fs.unlink(newPath + "/" + req.userDetails.profileImage, async function (err, data) { // Delete profile image of user first
          if (err) {
            return sendRes(res, err, false, 501);
          } else {
            resolve(await uploadProfileImage(req.formData, res)) // Now update new profile image of user
          }
        });
      }
    })
  })
}

module.exports = {
  checkRequireField,
  checkFieldValidation,
  checkUserVerified,
  checkUserExist,
  uploadProfileImage,
  updateProfileImage
};
