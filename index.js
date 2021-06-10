const express = require("express");
const mongoose = require("mongoose");
const { MONGO_IP, MONGO_PORT, MONGO_USER, MONGO_PASSWORD } = require("./config/config");
const app = express();

const port = process.env.PORT || 3000;

try {
  mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  console.log("Successfully connected to the database");
} catch (e) {
  console.log("Some error occurred. Couldn't connect to the database");
}

app.get("/", (req, res) => {
  res.send("<h1>Hello this is Ashwin</h1>");
});

app.listen(port, (req, res) => {
  console.log(`Server is running on Port ${port}`);
});
