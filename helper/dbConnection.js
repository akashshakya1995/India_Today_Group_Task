const mongoose = require("mongoose");
const { dbConnectionString } = require("../config/config.json");

const dbConnect = async function () {
  try {
    console.log("Establishing Mongo DB Connection...");
    const x = await mongoose.connect(dbConnectionString, { useNewUrlParser: true });
    console.log("Mongo DB Connected :)");
    return false;
  } catch (error) {
    console.log("==== DB Connection Error ====", error.message);
    throw error;
  }
};

module.exports = { dbConnect };