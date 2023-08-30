const { User } = require("../models/model");
const mongoose = require("mongoose");


module.exports.signup_get = (req, res) => {
  
};

module.exports.signup_post = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    let user = await User.create({ email, password, role });
    res.status(201).json({ user: user._id });
  } catch (err) {
    console.error(err.message);
    res.status(400).send("something went wrong");
  }
};

module.exports.login_get = (req, res) => {
  res.render("signup.ejs");
};

module.exports.login_post = (req, res) => {
  res.render("signup.ejs");
};
