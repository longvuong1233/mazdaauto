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

const adminPage = async (req, res) => {
  try {
    const car = await Car.find();
    return res.render("admin", { car });
  } catch (error) {
    console.error('Error while finding cars:', error.message);
    throw error;
  }
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
const deleteCar = async (req, res, next) => {
  try {
    await Car.delete({ _id: req.params.id}).exec();
    res.redirect("back")
  } catch (error) {
    next(err);
  }
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
  if(img) {
    cloudinary.config({
  cloud_name: "ddxxozy4t",
  api_key: "842729965617165",
  api_secret: "YTxKzPr0nJXuorHAj0r8Kyrkg9U"
});

await cloudinary.uploader.upload(img, (error, result)=>{
   img = result.secure_url;
});
  }

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
  await car
    .save()
    .then(() =>  res.redirect("/"))
    .catch((error) => {console.log(error);});
};

  
const listSingleCar = async(req,res) => { 
  const carImg = await  Car.findOne({_id: req.params.id})
  const imgDetailInfo = carImg.detailInfo
  const imgLineUp = carImg.img
  let resultRepArr;
  let resultNotDetailImg = []
  if(imgDetailInfo) {
     let regex = /src="(\S+)"/gm
     let result = imgDetailInfo.match(regex) 
     resultRepArr = result.map(str => str.replace(/src="|"$/g, ''));
     if(imgLineUp) {
      resultRepArr.push(imgLineUp)  
     }
     return resultRepArr;
  } else {
     resultNotDetailImg.push(imgLineUp)
     return resultNotDetailImg;
  }
 
   
}

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
  listSingleCar
};
