const { sign } = require("jsonwebtoken");
const { genSalt, hash } = require("bcryptjs");
const { jwtSecretKey } = require("../config/config.json");
/************************************************************************************************************
 *                               Common Function [ JwtToken- bcryptfun ]
 ************************************************************************************************************/

const jwtToken = async function (body) { // Create jwt token
  const token = sign(body, jwtSecretKey, { expiresIn: "24h" });
  return token;
};

const bcryptfun = async password => { // Password encription
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
};

module.exports = {
  jwtToken,
  bcryptfun,
};