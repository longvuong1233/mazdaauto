const express = require("express");
const router = express.Router();
// const authloginController = require("../app/controllers/AuthLoginController");
// const authRequire = require("../app/middelwares/AuthMiddleware");
const viewController = require("../../controller/viewController")
const mailController = require("../../controller/mailController");
//List route of car
router.get("/", viewController.homePage);
router.get("/car/:name", viewController.carPage)
router.get("/detail-car", viewController.detailCarPage)

//Send mail
router.post("/mail", mailController.sendMail)



module.exports = router;
