const mongoose = require("mongoose");
const { isEmail } = require("validator");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 100,
    required: true,
  },
  email: {
    type: String,
    maxlength: 100,
    unique: [true, "User with this email exists!"],
    validate: [isEmail, "Email is not valid"],
  },
  password: {
    type: String,
    minlength: 8,
  },
  role:{
    type: String,
    enum: ['admin', 'contributor'],
    required: true
  },
  verified:{
    type: Boolean,
    default: false
  }
});

UserSchema.pre("save", async function (next) {
  let salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const UserNews = new mongoose.Schema({
  email: {
    type: String,
    maxlength: 100,
    unique: [true, "User with this email exists!"],
    validate: [isEmail, "Email is not valid"],
  },
  verified:{
    type: Boolean,
    default: false
  }
})

const ItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imgSrc: {
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
  validated:{
    type: Boolean,
    default: false,
  },
  addedOn: {
    type: Date,
    default: Date.now,
  }
});

ItemSchema.index({ title: "text", description: "text", tag: "text" })

UserSchema.pre("save", async function (next){
  this.email = await sendEmail(this.email)
  next()
})

const User = mongoose.model("user", UserSchema);

const NewsLetter = mongoose.model("newsletter", UserNews);

const Item = mongoose.model("item", ItemSchema);

module.exports = {
  User,
  Item,
  NewsLetter
};
