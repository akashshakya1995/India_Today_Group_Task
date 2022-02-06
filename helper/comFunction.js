const { sign } = require("jsonwebtoken");
const { genSalt, hash } = require("bcryptjs");
const { jwtSecretKey } = require("../config/config.json");
const { resolve } = require("path/posix");
/************************************************************************************************************
 *                               Common Function [ JwtToken- bcryptfun ]
 ************************************************************************************************************/

const jwtToken = async function (body) { // Create jwt token
  const token = sign(body, jwtSecretKey, { expiresIn: "24h" });
  return token;
};

const bcryptfun = async (password, res) => { // Password encription
  return new Promise(async (resolve, reject) => {
    if (password.length < 5) {
      return sendRes(res, "Password length should be minimum 5 character.", false, 406);
    } else {
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);
      resolve(hashedPassword)
    }
  })

};

module.exports = {
  jwtToken,
  bcryptfun,
};