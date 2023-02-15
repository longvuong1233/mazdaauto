const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/database");
const bodyParser = require("body-parser");
var methodOverride = require("method-override");
const passport = require("./middleware/passportConfig");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const route = require("./route/index")

const SQLiteStore = require("connect-sqlite3")(session);
require("dotenv").config();
const {
  homePage,
  carPage,
  createProduct,
  detailCarPage,
  adminPage,
  deleteCar,
  editCar,
  editSaveCar,
  createCar,
  saveNewCar,
  loginPage
} = require("./controller/viewController");
const { sendMail } = require("./controller/mailController");

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cookieParser());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(expressLayouts);
app.use(express.static("src"));
console.log(__dirname);

app.use(
  session({
    secret: "automazda",
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore(),
  })
);

app.use(passport.authenticate("session"));

app.use(methodOverride("_method"));
db.connect();
app.set("layout", "../layouts/layout");
app.set("src/img", "img");
app.set("src/js", "js");
app.set("src/video", "video");
app.set("src/css", "css");
app.set("view engine", "ejs");

route(app);

app.post(
  "/admin-page/login",
  passport.authenticate("local", {
    successRedirect: "/admin-page",
    failureRedirect: "/",
  })
);

//admin router
app.use((req, res, next) => {
  if (req.user != "admin") {
    res.redirect("/");
  } else {
    next();
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server start successfull at port ${PORT}`);
});
