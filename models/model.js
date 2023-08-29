const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    unique: [true, "User with this username exists!"],
    maxlength: [50, "Username is too long"],
    type: String,
  },
  password: {
    type: String,
    minlength: 8,
  },
});

const UserNews = new mongoose.Schema({
  email: {
    type: String,
    maxlength: 100,
    unique: [true, "User with this email exists!"],
    validate: [isEmail, "Email is not valid"],
  }
})

const ItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    unique: true,
  },
  imageUrl: {
    type: String,
    maxlength: 300,
    required: false,
    unique: false,
  },
  tag: {
    type: String,
    maxlength: 300,
  },
  link: {
    type: String,
    unique: true,
    maxlength: 100,
  },
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false,
  },
  addedOn: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next) {
  let salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


const User = mongoose.model("user", UserSchema);

const Item = mongoose.model("item", ItemSchema);

module.exports = {
  User,
  Item,
};
