const promotion = require("../data/promotion");
const car = require("../data/car");

const homePage = (req, res) => {
  res.render("home", { promotion, car });
};

const carPage = (req, res) => {
  console.log(req.params);
  res.render("car", { promotion, car });
};

module.exports = {
  homePage,
  carPage,
};
