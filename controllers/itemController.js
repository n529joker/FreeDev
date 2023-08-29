const getData = require("../utils/getData");

module.exports.data_get = async (req, res) => {
  const data =  await getData();
  res.status(200).send(data);
};

