const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/database")
const bodyParser = require("body-parser");
var methodOverride = require("method-override");
const { homePage, carPage, createProduct, detailCarPage } = require("./controller/viewController");
const { sendMail } = require("./controller/mailController");

const PORT = process.env.PORT || 3001;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("src"));
app.use(expressLayouts);
app.use(methodOverride("_method"));
db.connect();
app.set("layout", "../layouts/layout");
app.set("src/img", "img");
app.set("src/js", "js");
app.set("src/video", "video");
app.set("src/css", "css");
app.set("view engine", "ejs");

app.get("/", homePage);
app.get("/add-product", createProduct);
app.get("/detail-car", detailCarPage);
app.post("/mail", sendMail);
app.get("/:name", carPage);

app.listen(PORT, () => {
  console.log(`✅Server start successfull at port ${PORT}`);
});
