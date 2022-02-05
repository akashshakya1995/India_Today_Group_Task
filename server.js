require('dotenv').config()
const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const { dbConnect } = require("./helper/dbConnection");
const sendRes=require('./helper/responseHandler')
const port = process.env.PORT || 8080; 
dbConnect().then(_ => { // Connection establishing of DB with dev or prod url.
  server.listen(port, _ => console.log(`Server is Running at http://127:0.0.1:${port}`));
})