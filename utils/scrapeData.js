require('dotenv').config()

const cron = require("node-cron");
const { Item } = require("../models/model");
const axios = require("axios");
const getData = require("../utils/getData");

const URLS = process.env.URLS

const storeData = async () => {

  let scrapedData = [];
  try {
    for (let url of URLS) {
      let res = await axios.get(url);
      let resData = await res.data;
      let items = await getData(resData);
      scrapedData.push(items)
    }
  } catch (error) {
    console.log(error);
  }
};

//schedule a cron Job that executes after every three minutes
cron.schedule("*/3 * * * *", () => {
  console.log("running a task every three minutes");
  setTimeout(storeData, 6000);
})




