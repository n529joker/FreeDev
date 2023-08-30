const { Item } = require("../models/model");
const axios = require("axios");
const getData = require("../utils/getData");

module.exports.data_get = async (req, res) => {
  let Q = req.query.q;
  let page = parseInt(req.query.page) || 1;
  if (page > 9) {
    res.status(404).send("Page not found");
  } else {
    let end = page * 50;
    let start = (page - 1) * 50;
    let data;
    if (Q) {
      data = await Item.find({ $text: { $search: Q }, validated: true }).sort({
        addedOn: -1,
      });
    } else {
      data = await Item.find({})
        .sort({ addedOn: -1 })
        .where({ validated: true })
        .skip(start)
        .limit(end);
    }
    res.status(200).json(data);
  }
};
