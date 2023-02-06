const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const { homePage, carPage } = require("./controller/viewController");
const { sendMail } = require("./controller/mailController");

const PORT = process.env.PORT || 3001;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("src"));
app.use(expressLayouts);
app.set("layout", "../layouts/layout");
app.set("src/img", "img");
app.set("src/js", "js");
app.set("src/video", "video");
app.set("src/css", "css");
app.set("view engine", "ejs");

app.get("/", homePage);
app.post("/mail", sendMail);
app.get("/:name", carPage);

app.listen(PORT, () => {
  console.log(`✅Server start successfull at port ${PORT}`);
});
