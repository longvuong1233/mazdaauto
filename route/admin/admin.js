const express = require("express");
const router = express.Router();
// const authloginController = require("../app/controllers/AuthLoginController");
// const authRequire = require("../app/middelwares/AuthMiddleware");
const viewController = require("../../controller/viewController")
const mailController = require("../../controller/mailController");
//List route of admin
router.get("/login", viewController.loginPage)
router.get("/", viewController.adminPage);
router.delete("/delete/:id", viewController.deleteCar)
router.get("/edit/:id", viewController.editCar)
router.put("/save/info/:id", viewController.editSaveCar)
router.get("/create/car", viewController.createCar)
router.post("/save/newCar", viewController.saveNewCar)


//Send mail
router.post("/mail", mailController.sendMail)



module.exports = router;
