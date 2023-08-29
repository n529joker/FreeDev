require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { User, Item } = require("./models/model");
const user_data_routes = require("./routes/user_data_Routes");
const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(user_data_routes)
app.set("view engine", "ejs");

const { PORT, DB_URL } = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(connect => {
  app.listen(PORT, () =>
  console.log(`Connected to http://localhost:${PORT} and live.`)
)
}).catch((err) => console.log(err))



