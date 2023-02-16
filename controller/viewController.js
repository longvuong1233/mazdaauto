const promotion = require("../data/promotion");
const car = require("../data/car");
const Car = require("../models/car");
const cloudinary = require('cloudinary').v2;


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

const editSaveCar = async(req, res, next) => {
  let imgRich;
  await Car.findOne({ _id: req.params.id }).then((car) => {
     imgRich = car.img
  });
   
 let { name, title, length, fuel, performance, price, filter, img, detailInfo } = req.body;
  if(img) {
    cloudinary.config({
      cloud_name: "ddxxozy4t",
      api_key: "842729965617165",
      api_secret: "YTxKzPr0nJXuorHAj0r8Kyrkg9U"
    });
    
    await cloudinary.uploader.upload(img, (error, result)=>{
       img = result.secure_url;
    });
  } else {
    img = imgRich
  }
      
  await Car.updateOne(
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
      detailInfo
    }
  )
    .then(() => {
      res.redirect("/admin-page/");
    })
    .catch(next);
};

const createCar = (req, res) => {
  res.render("create-car");
};

const saveNewCar = async (req, res) => {
  let { name, title, length, fuel, performance, price, filter, img, detailInfo } = req.body;
  var imgResult;
cloudinary.config({
  cloud_name: "ddxxozy4t",
  api_key: "842729965617165",
  api_secret: "YTxKzPr0nJXuorHAj0r8Kyrkg9U"
});

await cloudinary.uploader.upload(img, (error, result)=>{
   img = result.secure_url;
});
  const car = await new Car({
    name,
    title,
    length,
    fuel,
    performance,
    price,
    filter,
    img,
    detailInfo
  });
  car
    .save()
    .then(() => res.redirect("/admin-page/"))
    .catch((error) => {console.log(error);});
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
