const express = require("express");
const mongoose = require("mongoose");
const { MONGO_IP, MONGO_PORT, MONGO_USER, MONGO_PASSWORD } = require("./config/config");
const app = express();

const port = process.env.PORT || 3000;
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

// // if for some reason db container was not up and running we keep trying until the db is ready so that we can connect to it
// const connect = () => {
//   try {
//     mongoose.connect(mongoURL,
//       { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
//     console.log("Successfully connected to the database");
//   } catch (e) {
//     console.log("Some error occurred. Couldn't connect to the database");
//     setTimeout(connect, 5000);
//   }
// }

try {
  mongoose.connect(mongoURL,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
  console.log("Successfully connected to the database");
} catch (e) {
  console.log("Some error occurred. Couldn't connect to the database");
  setTimeout(connect, 5000);
}

app.get("/", (req, res) => {
  res.send("<h1>Hello this is Ashwin</h1>");
});

app.listen(port, (req, res) => {
  console.log(`Server is running on Port ${port}`);
});
