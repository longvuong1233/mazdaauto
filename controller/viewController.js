const promotion = require("../data/promotion");
const car = require("../data/car");
const Car = require("../models/car");
const fs = require("fs");
const homePage = (req, res) => {
  console.log(req.user);
  res.render("home", { promotion, car });
};

const carPage = (req, res) => {
  res.render("car", { promotion, car });
};

const adminPage = (req, res) => {
  Car.find().then((car) => {
    res.render("admin", { car });
  });
};
const createProduct = (req, res) => {
  res.render("create-product");
};

const detailCarPage = (req, res) => {
  res.render("detail-car");
};

const loginPage = (req, res) => {
  res.render("login");
};
const deleteCar = (req, res, next) => {
  Car.delete({ _id: req.params.id })
    .then(() => {
      res.redirect("back");
    })
    .catch(next);
};

const editCar = (req, res, next) => {
  Car.findOne({ _id: req.params.id }).then((car) => {
    res.render("edit-car", { car });
  });
};

const editSaveCar = (req, res, next) => {
  var imgRich;
  Car.findOne({ _id: req.params.id }).then((car) => {
    imgRich = car.img;
  });
  //test

  const img = req.file.originalname;

  const { name, title, length, fuel, performance, price, filter } = req.body;

  Car.updateOne(
    { _id: req.params.id },
    {
      name,
      title,
      length,
      fuel,
      performance,
      price,
      filter,
      img,
    }
  )
    .then(() => {
      res.redirect("/admin-page");
    })
    .catch(next);
};

const createCar = (req, res) => {
  res.render("create-car");
};

const saveNewCar = (req, res) => {
  const { name, title, length, fuel, performance, price, filter } = req.body;
  const img = req.file.originalname;

  const car = new Car({
    name,
    title,
    length,
    fuel,
    performance,
    price,
    filter,
    img,
  });
  car
    .save()
    .then(() => res.redirect("/admin-page"))
    .catch((error) => {});
};
module.exports = {
  homePage,
  carPage,
  createProduct,
  detailCarPage,
  adminPage,
  loginPage,
  deleteCar,
  editCar,
  editSaveCar,
  createCar,
  saveNewCar,
};
