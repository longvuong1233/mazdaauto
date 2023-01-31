const promotion = require("../data/promotion");
const car = require("../data/car");
const homeController = (req, res) => {
  res.render("home", { promotion, car });
};

module.exports = {
  homeController,
};
