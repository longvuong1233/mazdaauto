const carRouter = require("./user/car");
const adminRouter = require("./admin/admin");


function router(app) {
  app.use("/", carRouter);
  app.use("/admin-page", adminRouter)
}

module.exports = router;
