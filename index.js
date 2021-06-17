const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const redis = require("redis");
const { MONGO_IP, MONGO_PORT, MONGO_USER, MONGO_PASSWORD, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require("./config/config");

let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
  host:REDIS_URL,
  port: REDIS_PORT
});


const postsRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
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

app.enable("trust proxy");
app.use(session({
  store: new RedisStore({client: redisClient}),
  secret:SESSION_SECRET,
  cookie:{
    secure: false,
    resave: false,
    saveUninitialized:false,
    httpOnly:true,
    maxAge: 6000000
  }
}));

app.use(express.json());
app.get("/", (req, res) => {
  res.send("<h1>Hello this is Ashwin</h1>");
});

app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/users', userRouter);

app.listen(port, (req, res) => {
  console.log(`Server is running on Port ${port}`);
});
