const promotion = require("../data/promotion");
const car = require("../data/car");

const homePage = (req, res) => {
  res.render("home", { promotion, car });
};

const carPage = (req, res) => {
  res.render("car", { promotion, car });
};

const adminPage = (req, res) => {
  res.render("admin");
};
const createProduct = (req, res) => {
  res.render("create-product");
};

const detailCarPage = (req, res) => {
  res.render("detail-car");
};

module.exports = {
  homePage,
  carPage,
  createProduct,
  detailCarPage,
  adminPage,
};
